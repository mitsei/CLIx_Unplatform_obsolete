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
            this.questions.push(new QuestionBank.Question(1 /* RolePlay */, "Imagine you are a teacher. Introduce yourself and tell your partner what you do. ", "U1L2AxQT1.mp3", [
                "Where do you work? <br>What do you do each day in your workplace? "
            ], [
                "U1L2AxMT1.mp3"
            ]));
            this.questions.push(new QuestionBank.Question(1 /* RolePlay */, "Imagine you are a nurse. Introduce yourself and tell your partner what you do. ", "U1L2AxQT2.mp3", [
                "Where do you work? <br>What do you do each day in your workplace? "
            ], [
                "U1L2AxMT2.mp3"
            ]),new QuestionBank.Question(1 /* RolePlay */, "Imagine you are an actor. Introduce yourself and tell your partner what you do. ", "U1L2AxQT3.mp3", [
                "Where do you work? <br>What do you do each day in your workplace? "
            ]),new QuestionBank.Question(1 /* RolePlay */, "Imagine you are a sportsman/sportswoman. Introduce yourself and tell your partner what you do. ", "U1L2AxQT4.mp3", [
                "Where do you work? <br>What do you do each day in your workplace? "
            ]),new QuestionBank.Question(1 /* RolePlay */, "Imagine you are a farmer. Introduce yourself and tell your partner what you do. ", "U1L2AxQT5.mp3", [
                "Where do you work? <br>What do you do each day in your workplace? "
            ]),new QuestionBank.Question(1 /* RolePlay */, "Imagine you are a farmer. Introduce yourself and tell your partner what you do. ", "U1L2AxQT6.mp3", [
                "Where do you work? <br>What do you do each day in your workplace? "
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