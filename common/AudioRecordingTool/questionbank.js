var QuestionBank;
(function (QuestionBank) {
    var Audio = (function () {
        function Audio(audioElement) {
            this.isRecording = false;
            var ContextClass = window.AudioContext || window.webkitAudioContext;
            this.context = new ContextClass();
            this.navigator = window.navigator;
            this.audioElement = audioElement;
        }
        Audio.prototype.setStream = function (stream) {
            console.log('audio.onStream');
            this.audioStream = stream;
            var streamSource = this.context.createMediaStreamSource(stream);
            this.recorder = new Recorder(streamSource, { workerPath: "libs/recorderWorker.js" });
            var event = new Event('audio_ready');
            document.dispatchEvent(event);
        };
        Audio.prototype.getTime = function () {
            return this.context.currentTime;
        };
        Audio.prototype.record = function () {
            console.log("audio.record");
            this.recorder.clear();
            this.recorder.record();
            this.isRecording = true;
        };
        Audio.prototype.stopRecording = function () {
            var _this = this;
            console.log('audio.stopRecording');
            this.recorder.stop();
            this.isRecording = false;
            this.recorder.exportWAV(function (blob) {
                _this.load(blob);
            });
        };
        Audio.prototype.load = function (blob) {
            this.audioBlob = blob;
            this.audioElement.src = URL.createObjectURL(blob);
        };
        Audio.prototype.play = function () {
            console.log('audio.play');
            this.audioElement.play();
        };
        Audio.prototype.clear = function () {
            if (this.recorder) {
                this.recorder.clear();
            }
            this.audioBlob = null;
            this.audioElement.src = "";
        };
        return Audio;
    })();
    QuestionBank.Audio = Audio;
})(QuestionBank || (QuestionBank = {}));
var QuestionBank;
(function (QuestionBank) {
    var QBApp = (function () {
        function QBApp(element) {
            this.element = element;
            this.questions = [];
            //temp
            this.questions.push(new QuestionBank.Question(1 /* RolePlay */, "It's the first day of school after the summer vacations. A new student has joined the class.", "U1L1AxQT1.mp3", [
                "Student A: Talk to the new student to make him/her feel comfortable.",
                "Student B: Talk about yourself and ask a few questions about the new school."
            ], [
                "U1L1AxMT1.mp3",
                "U1L1AxMT1.mp3"
            ]), new QuestionBank.Question(1 /* RolePlay */, "There is a local fair in the village. A new visitor to the village loses his way in this fair. " + "He looks lost and confused. Someone who lives in the village decides to help him.", "U1L1AxQT2.mp3", [
                "Student A: You are a visitor looking for your relative, Sewak Ram who is a carpenter and lives in Model colony." + "<br>Name: Ajay" + "<br>Age: 25" + "<br>Job: Painter",
                "Student B: You are from the village." + "<br>Name: Kishore" + "<br>Age: 30" + "<br>Job: Shopkeeper"
            ], [
                "U1L1AxMT2.mp3",
                "U1L1AxMT2.mp3"
            ]));
            this.curQ = this.questions[0];
        }
        QBApp.prototype.init = function () {
            var _this = this;
            this.responses = [];
            this.displayQ(this.curQ);
            this.audio = new QuestionBank.Audio($("#recordedAudio")[0]);
            this.initMedia(function () {
            });
            this.textAudio = $('#textAudio')[0];
            console.log('init');
            $('#cPrevBtn').on('click', function () {
                console.log('cPrevBtn click');
                _this.prevQ();
            });
            $('#cNextBtn').on('click', function () {
                _this.nextQ();
            });
            $('#answerBtn').on('click', function () {
                _this.answerQ();
            });
            $('#questionSoundBtn').on('click', function () {
                _this.textAudio.src = 'audio/' + _this.curQ.audio;
                _this.textAudio.play();
            });
            $('#toggleRecordBtn').on('click', function () {
                if (!_this.audio.isRecording) {
                    _this.startRecording();
                }
                else {
                    _this.stopRecording();
                }
            });
            $('#stopRecordBtn').on('click', function () {
                _this.stopRecording();
            });
            $('#submitResponseBtn').on('click', function () {
                _this.submitResponse();
            });
        };
        QBApp.prototype.initMedia = function (callback) {
            var _this = this;
            console.log("initMedia");
            navigator.getMedia = (navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia);
            navigator.getMedia({
                audio: true
            }, function (stream) {
                _this.audio.setStream(stream);
                document.addEventListener('audio_ready', function () {
                    console.log('audio_ready');
                });
                callback();
            }, function (error) {
                console.log("Microphone not accessible: " + error.message);
            });
        };
        QBApp.prototype.startRecording = function () {
            var _this = this;
            this.audio.clear();
            this.audio.record();
            $('#toggleRecordBtn').addClass("active");
            var time = 0;
            this.audioTimer = setInterval(function () {
                time += 1;
                $("#audioTimer").text(time.toString());
                if (time >= 20) {
                    _this.stopRecording();
                }
            }, 1000);
        };
        QBApp.prototype.stopRecording = function () {
            var _this = this;
            clearInterval(this.audioTimer);
            $('#recordedAudio').one('durationchange', function (e) {
                $('#recordedAudio').removeClass("hidden");
                var qIndex = _this.questions.indexOf(_this.curQ);
                var filename = "response_" + qIndex + ".wav";
                _this.responses[qIndex] = _this.audio.audioBlob;
            });
            $('#toggleRecordBtn').removeClass("active");
            this.audio.stopRecording();
        };
        QBApp.prototype.nextQ = function () {
            console.log('nextQ');
            var curIndex = this.questions.indexOf(this.curQ);
            this.curQ = this.questions[(curIndex + 1) % this.questions.length];
            this.displayQ(this.curQ);
        };
        QBApp.prototype.prevQ = function () {
            var curIndex = this.questions.indexOf(this.curQ);
            this.curQ = this.questions[(curIndex - 1 + this.questions.length) % this.questions.length];
            this.displayQ(this.curQ);
        };
        QBApp.prototype.displayQ = function (q) {
            $('#recordedAudio').addClass("hidden");
            $('#instructions3').addClass('hidden');
            $('#answerBtn').removeClass('hidden');
            switch (q.type) {
                case 0 /* Discussion */:
                    $('#roles').addClass('hidden');
                    $('#instructions2b').addClass('hidden');
                    $('#sampleResponses').removeClass('hidden');
                    $('#instructions2a').removeClass('hidden');
                    break;
                case 1 /* RolePlay */:
                    $('#sampleResponses').addClass('hidden');
                    $('#instructions2a').addClass('hidden');
                    $('#roles').removeClass('hidden');
                    $('#instructions2b').removeClass('hidden');
                    break;
            }
            $('#questionText').text(q.text);
        };
        QBApp.prototype.answerQ = function () {
            var _this = this;
            this.hideNav();
            $('#answerBtn').addClass('hidden');
            $('#responses').removeClass('hidden');
            $('#response').removeClass('hidden');
            for (var i = 0; i < this.curQ.sampleResponses.length; i++) {
                var response = this.curQ.sampleResponses[i];
                var soundBtn = $('<button id="playResponse' + i + '" class="icon"><i class="fa fa-volume-up"></i></button>');
                var responseAudio = this.curQ.responseAudio[i];
                soundBtn.attr('data', responseAudio);
                soundBtn.on('click', function (e) {
                    var filename = $(e.target.parentNode).attr('data');
                    _this.textAudio.src = 'audio/' + filename;
                    _this.textAudio.play();
                });
                switch (this.curQ.type) {
                    case 0 /* Discussion */:
                        var responseEl = $("<tr/>").append($("<td/>").html(response).append(soundBtn));
                        $('#sampleResponses').append(responseEl);
                        break;
                    case 1 /* RolePlay */:
                        var roleEl = $("<div/>").html(response).append(soundBtn);
                        $('#roles').append(roleEl);
                        break;
                }
            }
        };
        QBApp.prototype.submitResponse = function () {
            $('#instructions2a').addClass('hidden');
            $('#instructions2b').addClass('hidden');
            $('#responses').addClass('hidden');
            $('#instructions3').removeClass('hidden');
            this.showNav();
        };
        QBApp.prototype.hideNav = function () {
            $('#cPrevBtn').addClass('hidden');
            $('#cNextBtn').addClass('hidden');
        };
        QBApp.prototype.showNav = function () {
            $('#cPrevBtn').removeClass('hidden');
            $('#cNextBtn').removeClass('hidden');
        };
        return QBApp;
    })();
    window.onload = function () {
        console.log('onload');
        var el = $('#content')[0];
        var app = new QBApp(el);
        app.init();
    };
})(QuestionBank || (QuestionBank = {}));
var QuestionBank;
(function (QuestionBank) {
    (function (QuestionType) {
        QuestionType[QuestionType["Discussion"] = 0] = "Discussion";
        QuestionType[QuestionType["RolePlay"] = 1] = "RolePlay";
    })(QuestionBank.QuestionType || (QuestionBank.QuestionType = {}));
    var QuestionType = QuestionBank.QuestionType;
    ;
    var Question = (function () {
        function Question(type, text, audio, sampleResponses, responseAudio) {
            if (text === void 0) { text = ""; }
            if (audio === void 0) { audio = ""; }
            if (sampleResponses === void 0) { sampleResponses = []; }
            if (responseAudio === void 0) { responseAudio = []; }
            this.type = type;
            this.text = text;
            this.sampleResponses = sampleResponses;
            this.audio = audio;
            this.responseAudio = responseAudio;
        }
        return Question;
    })();
    QuestionBank.Question = Question;
})(QuestionBank || (QuestionBank = {}));
//# sourceMappingURL=questionbank.js.map