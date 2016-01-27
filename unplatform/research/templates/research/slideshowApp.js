///<reference path="libs/jquery.d.ts" />
///<reference path="libs/jqueryui.d.ts" />
window.onload = function () {
    var el = document.getElementById("content");
    var slideApp = new Slideshow.SlideshowApp(el);
};
var Slideshow;
(function (Slideshow) {
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
    Slideshow.Audio = Audio;
})(Slideshow || (Slideshow = {}));
var Slideshow;
(function (Slideshow) {
    var PlaybackEvent = (function () {
        function PlaybackEvent() {
        }
        PlaybackEvent.START = "playback_start";
        PlaybackEvent.PAUSE = "playback_pause";
        PlaybackEvent.FINISH = "playback_finish";
        return PlaybackEvent;
    })();
    Slideshow.PlaybackEvent = PlaybackEvent;
    var Playback = (function () {
        function Playback(show, display, text, audio) {
            this.playing = false;
            this.show = show;
            this.display = display;
            this.text = text;
            this.audio = audio;
            this.curSlide = -1;
        }
        Playback.prototype.start = function () {
            this.nextSlide();
            this.playing = true;
            var event = new Event(PlaybackEvent.START);
            document.dispatchEvent(event);
        };
        Playback.prototype.pause = function () {
            clearTimeout(this.timerID);
            this.curSlide--;
            this.playing = false;
            var event = new Event(PlaybackEvent.PAUSE);
            document.dispatchEvent(event);
        };
        Playback.prototype.stop = function () {
            clearTimeout(this.timerID);
            this.curSlide = -1;
            this.playing = false;
            var event = new Event(PlaybackEvent.FINISH);
            document.dispatchEvent(event);
        };
        Playback.prototype.nextSlide = function () {
            var _this = this;
            console.log("nextSlide");
            if (this.curSlide >= this.show.getLength() - 1) {
                this.stop();
                return;
            }
            this.curSlide++;
            var slide = this.show.getSlideAt(this.curSlide);
            this.display.src = slide.image;
            this.text.innerText = slide.text ? slide.text : "";
            if (this.audio) {
                this.audio.load(slide.audio);
                this.audio.play();
            }
            this.timerID = window.setTimeout(function () {
                _this.nextSlide();
            }, slide.duration * 1000);
        };
        return Playback;
    })();
    Slideshow.Playback = Playback;
})(Slideshow || (Slideshow = {}));
var Slideshow;
(function (Slideshow) {
    var SlideControl = (function () {
        function SlideControl() {
            this.createDom();
        }
        SlideControl.prototype.createDom = function () {
            this.element = $("<div/>").addClass("slideControl");
            this.order = $("<div/>").addClass("orderCol");
            this.element.append(this.order);
            this.editBtn = $("<button></button>").addClass("iconBtn slideControl-editBtn").append($("<img src='http://web.mit.edu/coling/www/clix/slideshow/icons/pencil.icon.png'/>"));
            this.element.append(this.editBtn);
            this.lockBtn = $("<button></button>").addClass("iconBtn slideControl-lockBtn").addClass("lockToggleBtn").append('<i class="fa fa-unlock-alt" > </i>');
            this.element.append(this.lockBtn);
            this.image = $("<img/>").addClass("slideControl-img");
            var imgHolder = $("<div></div>").addClass("ctrlImgHolder");
            imgHolder.append(this.image);
            this.element.append(imgHolder);
            this.dragHandle = $("<div/>").addClass("slide-drag-handle").append($("<img src='http://web.mit.edu/coling/www/clix/slideshow/icons/move.icon.png'/>"));
            this.deleteBtn = $("<button></button>").addClass("iconBtn slideControl-delBtn").append($("<img src='http://web.mit.edu/coling/www/clix/slideshow/icons/trash.icon.png'/>"));
            this.duplicateBtn = $("<button></button>").addClass("iconBtn slideControl-dupBtn").append($("<img src='http://web.mit.edu/coling/www/clix/slideshow/icons/duplicate.icon.png'/>"));
            this.element.append(this.deleteBtn);
            this.element.append(this.duplicateBtn);
            this.element.append(this.dragHandle);
            this.deleteModal = $("<div title='Delete this slide?'></div>").addClass("deleteModal").append("<div>Delete this slide?</div>");
            this.deleteConfirmBtn = $("<button>Delete</button>").addClass("textBtn");
            this.deleteCancelBtn = $("<button>Cancel</button>").addClass("textBtn");
            this.deleteModal.append(this.deleteConfirmBtn);
            this.deleteModal.append(this.deleteCancelBtn);
            this.element.append(this.deleteModal);
            this.deleteModal.addClass("hidden");
        };
        SlideControl.prototype.setImageSrc = function (src) {
            if (src && src != "undefined" && src != "") {
                this.image.attr("src", src);
            }
            else {
                this.image.removeAttr("src");
            }
            return src;
        };
        SlideControl.prototype.setOrder = function (order) {
            this.order.text(order.toString());
        };
        SlideControl.prototype.getImageSrc = function () {
            return this.image.attr("src");
        };
        SlideControl.prototype.getElement = function () {
            return this.element[0];
        };
        return SlideControl;
    })();
    Slideshow.SlideControl = SlideControl;
})(Slideshow || (Slideshow = {}));
var Slideshow;
(function (Slideshow) {
    var SlideEditor = (function () {
        function SlideEditor() {
            this.createDom();
        }
        SlideEditor.prototype.createDom = function () {
            this.element = $("<div/>").addClass("slideEditor");
            this.titleInput = $("<input type='text'/>").val("# characters limit");
            var titleDiv = $("<div></div>").text("Title: ").append(this.titleInput);
            this.element.append(titleDiv);
            var imgUploadBtn = $("<button><i class='fa fa-upload'/></button>");
            var imgDiv = $("<div/>");
            this.saveBtn = $("<button>Save Slide</button>").addClass("slideEditor-saveBtn");
            this.element.append(this.saveBtn);
            this.closeBtn = $("<button>Close</button>").addClass("slideEditor-closeBtn");
            this.element.append(this.closeBtn);
        };
        return SlideEditor;
    })();
    Slideshow.SlideEditor = SlideEditor;
})(Slideshow || (Slideshow = {}));
var Slideshow;
(function (Slideshow) {
    var Show = (function () {
        function Show() {
            this.slideIds = [];
            this.slides = {};
            this.slideInc = 1;
        }
        Show.prototype.nextId = function () {
            var id = 'slide' + this.slideInc.toString();
            this.slideInc += 1;
            return id;
        };
        Show.prototype.addSlide = function (slide) {
            this.slideIds.push(slide.id);
            this.slides[slide.id] = slide;
        };
        Show.prototype.addSlideAt = function (slide, index) {
            this.slideIds.splice(index, 0, slide.id);
            this.slides[slide.id] = slide;
        };
        Show.prototype.removeSlide = function (id) {
            this.slideIds.splice(this.slideIds.indexOf(id), 1);
            delete this.slides[id];
        };
        Show.prototype.getSlide = function (id) {
            for (var slideId in this.slides) {
                var slide = this.slides[slideId];
                if (slide.id == id) {
                    return slide;
                }
            }
            return null;
        };
        Show.prototype.getSlideAt = function (index) {
            return this.slides[this.slideIds[index]];
        };
        Show.prototype.getSlideIndex = function (slide) {
            return this.slideIds.indexOf(slide.id);
        };
        Show.prototype.getLength = function () {
            return this.slideIds.length;
        };
        Show.prototype.prepForSave = function () {
            var _this = this;
            this.totalAudioClips = 0;
            this.processedAudioClips = 0;
            for (var id in this.slides) {
                var slide = this.slides[id];
                if (slide.audio) {
                    this.totalAudioClips++;
                    var audioReader = new FileReader();
                    (function (reader, j) {
                        reader.addEventListener('loadend', function () {
                            _this.slides[j].audioData = reader.result;
                            _this.processedAudioClips++;
                            if (_this.processedAudioClips === _this.totalAudioClips) {
                                var event = new Event('audio_processed');
                                document.dispatchEvent(event);
                                console.log('audio processed');
                            }
                        });
                    })(audioReader, id);
                    audioReader.readAsArrayBuffer(slide.audio);
                }
            }
            if (this.totalAudioClips == 0) {
                var event = new Event('audio_processed');
                document.dispatchEvent(event);
            }
        };
        return Show;
    })();
    Slideshow.Show = Show;
    (function (SlideField) {
        SlideField[SlideField["Image"] = 0] = "Image";
        SlideField[SlideField["Audio"] = 1] = "Audio";
        SlideField[SlideField["Caption"] = 2] = "Caption";
        SlideField[SlideField["Duration"] = 3] = "Duration";
    })(Slideshow.SlideField || (Slideshow.SlideField = {}));
    var SlideField = Slideshow.SlideField;
    var Slide = (function () {
        function Slide() {
            this.image = "";
            this.text = "";
            this.lockedFields = [];
            this.duration = 6;
            this.lockedFields[0 /* Image */] = false;
            this.lockedFields[1 /* Audio */] = false;
            this.lockedFields[2 /* Caption */] = false;
            this.lockedFields[3 /* Duration */] = false;
        }
        Slide.prototype.hasLockedFields = function () {
            var val = this.lockedFields[0 /* Image */] || this.lockedFields[1 /* Audio */] || this.lockedFields[2 /* Caption */] || this.lockedFields[3 /* Duration */];
            console.log("hasLockedFields:" + val);
            return val;
        };
        Slide.prototype.clone = function () {
            var clone = new Slide();
            clone.image = this.image;
            clone.text = this.text;
            clone.audio = this.audio;
            clone.audioData = this.audioData;
            clone.locked = this.locked;
            clone.lockedFields = this.lockedFields.slice();
            clone.duration = this.duration;
            return clone;
        };
        return Slide;
    })();
    Slideshow.Slide = Slide;
})(Slideshow || (Slideshow = {}));
/// <reference path='libs/jquery.d.ts'/>
/// <reference path='libs/jquery.i18n.d.ts'/>
var Slideshow;
(function (Slideshow) {
    var Localization = (function () {
        function Localization() {
            this.test = "test";
        }
        Localization.prototype.init = function () {
            console.log(this.test);
            var i18n = $.i18n();
            var language, person, kittens, message, gender;
            // Enable debug
            i18n.debug = true;
            /*
            message = '$1 has $2 {{plural:$2|kitten|kittens}}. '
                + '{{gender:$3|He|She}} loves to play with {{plural:$2|it|them}}.';
            language = $('.language option:selected').val();
            person = $('.person option:selected').text();
            gender = $('.person option:selected').val();
            kittens = $('.kittens').val();
            */
            //i18n.locale = "es";
            console.log("locale: " + i18n.locale);
            i18n.load('i18n/' + i18n.locale + '.json', i18n.locale).done(function () {
                console.log("i18n locale file loaded");
                $("span[data-i18n]").each(function (index, elem) {
                    var id = $(elem).attr("data-i18n");
                    console.log(id + ":" + $.i18n(id));
                    $(elem).text($.i18n(id));
                });
                //var personName = $.i18n(person), localizedMessage = $.i18n(message, personName,
                //    kittens, gender);
                //$('.result').text(localizedMessage).prop('title', message.toLocaleString());
            });
        };
        return Localization;
    })();
    Slideshow.Localization = Localization;
})(Slideshow || (Slideshow = {}));
/// <reference path='localization.ts'/>
var Slideshow;
(function (Slideshow) {
    var State;
    (function (State) {
        State[State["Init"] = 0] = "Init";
        State[State["Ready"] = 1] = "Ready";
        State[State["Show"] = 2] = "Show";
        State[State["Slide"] = 3] = "Slide";
        State[State["SlideCam"] = 4] = "SlideCam";
        State[State["SlideAudio"] = 5] = "SlideAudio";
        State[State["Play"] = 6] = "Play";
    })(State || (State = {}));
    ;
    var FileMode;
    (function (FileMode) {
        FileMode[FileMode["W"] = 0] = "W";
        FileMode[FileMode["T"] = 1] = "T";
        FileMode[FileMode["V"] = 2] = "V";
    })(FileMode || (FileMode = {}));
    ;
    var SlideshowApp = (function () {
        function SlideshowApp(element) {
            var _this = this;
            this.workMode = 0 /* W */;
            this.exportMode = 0 /* W */;
            this.slideThumbs = {};
            this.state = 0 /* Init */;
            this.show = new Slideshow.Show();
            this.ui = new Slideshow.UI(element);
            //this.initMedia();
            this.audio = new Slideshow.Audio(this.ui.recordedAudio);
            $(this.ui.loadPictureBtn).on('click', function () {
                _this.setState(3 /* Slide */);
                // trigger open file dialog
                _this.ui.imgFileInput.click();
            });
            $(this.ui.useWebcamBtn).on('click', function () {
                if (!_this.webcam || !_this.webcam.streaming) {
                    _this.initMedia(function () {
                        _this.useWebcam();
                        _this.setState(4 /* SlideCam */);
                    });
                }
                else {
                    _this.useWebcam();
                    _this.setState(4 /* SlideCam */);
                }
            });
            $("#takePictureBtn").on('click', function () {
                _this.takePicture();
                _this.setState(3 /* Slide */);
            });
            $("#cancelPictureBtn").on('click', function () {
                _this.setState(3 /* Slide */);
            });
            $(this.ui.imgFileInput).on("change", function () {
                _this.loadUserImageFile(_this.ui.imgFileInput.files[0]);
            });
            $("#loadAudioBtn").on('click', function () {
                $("#audioFileInput")[0].click();
                _this.setState(5 /* SlideAudio */);
            });
            $("#audioFileInput").on("change", function () {
                _this.loadUserAudioFile($("#audioFileInput")[0].files[0]);
            });
            $(this.ui.recordAudioBtn).on('click', function () {
                if (!_this.webcam || !_this.webcam.streaming) {
                    _this.initMedia(function () {
                        _this.setState(5 /* SlideAudio */);
                    });
                }
                else {
                    _this.setState(5 /* SlideAudio */);
                }
            });
            $(this.ui.toggleRecordBtn).on('click', function () {
                if (!_this.audio.isRecording) {
                    _this.startRecording();
                }
                else {
                    _this.stopRecording();
                }
            });
            $(this.ui.deleteAudioBtn).on('click', function () {
                _this.audio.clear();
                _this.workingSlide.audio = null;
                _this.workingSlide.audioData = null;
                $("#audioFilename").addClass("hidden");
            });
            $(this.ui.captionInput).on('change', function () {
                _this.ui.captionHolder.textContent = _this.ui.captionInput.value;
            });
            $(this.ui.newShowBtn).on('click', function () {
                _this.checkForSave(function () {
                    _this.newShow();
                });
            });
            $(this.ui.loadShowBtn).on('click', function () {
                _this.checkForSave(function () {
                    // trigger file open dialog
                    _this.ui.slideFileInput.click();
                });
            });
            $(this.ui.saveShowBtn).on('click', function () {
                _this.exportMode = 0 /* W */;
                _this.saveSlides();
            });
            $("#saveTemplateBtn").on("click", function () {
                _this.exportMode = 1 /* T */;
                _this.saveSlides();
            });
            $(this.ui.exportShowBtn).on('click', function () {
                _this.exportMode = 2 /* V */;
                _this.saveSlides();
            });
            this.ui.slideFileInput.onchange = function () {
                _this.loadShowFile(_this.ui.slideFileInput.files[0]);
            };
            $(this.ui.addSlideBtn).on('click', function () {
                if (_this.show.getLength() < 20) {
                    _this.addSlide();
                    _this.setSlide(_this.curSlide.id);
                }
            });
            $(this.ui.playShowBtn).on('click', function () {
                if (!_this.playback) {
                    _this.playShow();
                }
                else if (!_this.playback.playing) {
                    _this.resumeShow();
                }
                else {
                    _this.pauseShow();
                }
            });
            $("#saveSlideBtn").on("click", function () {
                _this.updateSlide();
                _this.setState(2 /* Show */);
            });
            $("#cancelSlideBtn").on("click", function () {
                _this.workingSlide = null;
                _this.ui.slideImg.src = _this.curSlide.image;
                _this.setState(2 /* Show */);
            });
            $(this.ui.slideRoll).sortable({
                containment: this.ui.slideRoll.parentElement,
                stop: function (e, ui) {
                    _this.updateSlideOrder();
                }
            });
            $(this.ui.slideEditor).addClass("hidden");
            $('#lockImgBtn').on('click', function (e) {
                if (_this.workMode != 1 /* T */) {
                    var val = _this.workingSlide.lockedFields[0 /* Image */] = !_this.workingSlide.lockedFields[0 /* Image */];
                    _this.ui.toggleLock($(e.currentTarget));
                }
            });
            $('#lockAudioBtn').on('click', function (e) {
                if (_this.workMode != 1 /* T */) {
                    var val = _this.workingSlide.lockedFields[1 /* Audio */] = !_this.workingSlide.lockedFields[1 /* Audio */];
                    _this.ui.toggleLock($(e.currentTarget));
                }
            });
            $('#lockCaptionBtn').on('click', function (e) {
                if (_this.workMode != 1 /* T */) {
                    var val = _this.workingSlide.lockedFields[2 /* Caption */] = !_this.workingSlide.lockedFields[2 /* Caption */];
                    _this.ui.toggleLock($(e.currentTarget));
                }
            });
            $('#lockDurationBtn').on('click', function (e) {
                if (_this.workMode != 1 /* T */) {
                    var val = _this.workingSlide.lockedFields[3 /* Duration */] = !_this.workingSlide.lockedFields[3 /* Duration */];
                    _this.ui.toggleLock($(e.currentTarget));
                }
            });
            $('#deleteImgBtn').on('click', function (e) {
                _this.workingSlide.image = _this.ui.slideImg.src = "";
                $('#imgFilename').addClass('hidden');
            });
            this.localization = new Slideshow.Localization();
            this.localization.init();
            this.addSlide();
        }
        SlideshowApp.prototype.initMedia = function (callback) {
            var _this = this;
            console.log("initMedia");
            navigator.getMedia = (navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia);
            navigator.getMedia({
                video: true,
                audio: true
            }, function (stream) {
                _this.webcam = new Slideshow.Webcam(stream, _this.ui.camVideo, _this.ui.camCanvas);
                _this.audio.setStream(stream);
                document.addEventListener('audio_ready', function () {
                    console.log('audio_ready');
                });
                _this.setState(1 /* Ready */);
                callback();
            }, function (error) {
                console.log("Webcam not accessible: " + error.message);
            });
        };
        SlideshowApp.prototype.clearAll = function () {
            console.log("clearAll");
            $(this.ui.slideRoll).empty();
            this.ui.slideImg.src = "";
            this.show = new Slideshow.Show();
            this.slideThumbs = {};
            $("#nameTxtInput").val("");
            this.ui.setEditLocks([false, false, false, false], false);
            this.setState(2 /* Show */);
            this.addSlide();
        };
        SlideshowApp.prototype.checkForSave = function (callback) {
            var _this = this;
            console.log("checkForSave workMode: " + this.workMode);
            if (this.workMode == 2 /* V */) {
                callback();
                return;
            }
            this.ui.showDialog("Hey, you're about to open a new slideshow.<br> Save this slideshow first?", [
                {
                    text: "OK",
                    fn: function () {
                        _this.exportMode = 0 /* W */;
                        _this.saveSlides(function () {
                            callback();
                        });
                    }
                },
                {
                    text: "Don't Save",
                    fn: function () {
                        callback();
                    }
                },
                {
                    text: "Cancel",
                    fn: function () {
                    }
                }
            ]);
        };
        SlideshowApp.prototype.newShow = function () {
            this.workMode = 0 /* W */;
            this.setWorkMode(0 /* W */);
            this.clearAll();
        };
        SlideshowApp.prototype.setWorkMode = function (mode) {
            switch (mode) {
                case 0 /* W */:
                    $("#saveShowBtn").removeClass("hidden");
                    $("#saveTemplateBtn").removeClass("hidden");
                    $("#exportShowBtn").removeClass("hidden");
                    break;
                case 1 /* T */:
                    $("#saveShowBtn").addClass("hidden");
                    $("#saveTemplateBtn").removeClass("hidden");
                    $("#exportShowBtn").removeClass("hidden");
                    break;
                case 2 /* V */:
                    $("#slideRollHolder").addClass("hidden");
                    $("#saveShowBtn").addClass("hidden");
                    $("#saveTemplateBtn").addClass("hidden");
                    $("#exportShowBtn").addClass("hidden");
                    break;
            }
        };
        SlideshowApp.prototype.setState = function (newState) {
            if (this.state != newState) {
                switch (this.state) {
                    case 5 /* SlideAudio */:
                        if (this.curSlide.audio == null) {
                            $("#recordedAudio").addClass("hidden");
                        }
                        $("#recordAudioControls").addClass("hidden");
                        break;
                    case 4 /* SlideCam */:
                        $("#takePictureBtn").addClass("hidden");
                        $("#cancelPictureBtn").addClass("hidden");
                        this.ui.useWebcamBtn.disabled = false;
                        $("#camVideo").addClass("hidden");
                        if (this.webcam && this.webcam.streaming) {
                            this.webcam.stop();
                        }
                        break;
                    default:
                        break;
                }
            }
            switch (newState) {
                case 1 /* Ready */:
                    break;
                case 3 /* Slide */:
                    $("#playShowBtn").addClass("hidden");
                    $("#slideRollHolder").addClass("hidden");
                    $("#slideEditor").removeClass("hidden");
                    $("#takePictureBtn").addClass("hidden");
                    if (this.curSlide.audio != null) {
                        $("#recordedAudio").removeClass("hidden");
                    }
                    $("#recordAudioBtn").removeClass("disabled");
                    break;
                case 5 /* SlideAudio */:
                    $("#recordAudioBtn").addClass("disabled");
                    $("#takePictureBtn").addClass("hidden");
                    $("#recordedAudio").removeClass("hidden");
                    $("#recordAudioControls").removeClass("hidden");
                    break;
                case 4 /* SlideCam */:
                    $("#takePictureBtn").removeClass("hidden");
                    $("#cancelPictureBtn").removeClass("hidden");
                    break;
                case 2 /* Show */:
                    $("#slideEditor").addClass("hidden");
                    $("#recordAudioControls").addClass("hidden");
                    $("#takePictureBtn").addClass("hidden");
                    $("#recordedAudio").addClass("hidden");
                    $("#slideRollHolder").removeClass("hidden");
                    $("#playShowBtn").removeClass("hidden");
                    if (this.webcam) {
                        this.webcam.stop();
                    }
                    break;
            }
            this.state = newState;
        };
        SlideshowApp.prototype.updateSlideOrder = function () {
            var children = $(this.ui.slideRoll).children();
            for (var i = 0; i < children.length; i++) {
                var child = children[i];
                var slide = this.show.getSlide(child.id);
                this.show.removeSlide(child.id);
                this.show.addSlideAt(slide, i);
                var thumb = this.slideThumbs[slide.id];
                thumb.setOrder(i + 1);
            }
        };
        SlideshowApp.prototype.loadUserAudioFile = function (file) {
            var _this = this;
            if (file.type.substring(0, 5) != 'audio') {
                // TODO: show error msg
                console.log('invalid image type');
                return;
            }
            var reader = new FileReader();
            reader.onload = function (e) {
                var file = e.target.result;
                var dataview = new DataView(file);
                _this.workingSlide.audio = new Blob([dataview], { type: 'audio/wav' });
                _this.audio.load(_this.workingSlide.audio);
            };
            reader.readAsArrayBuffer(file);
            this.ui.setFilename($("#audioFilename"), this.curSlide.id + "audio.wav");
        };
        SlideshowApp.prototype.loadUserImageFile = function (file) {
            var _this = this;
            if (file.type.substring(0, 5) != 'image') {
                // TODO: show error msg
                console.log('invalid image type');
                return;
            }
            console.log("loading img file");
            var reader = new FileReader();
            reader.onload = function (e) {
                _this.workingSlide.image = _this.ui.slideImg.src = e.target.result;
                console.log("img file loaded");
                _this.ui.imgFileInput.value = null;
            };
            reader.readAsDataURL(file);
            this.ui.setFilename($("#imgFilename"), this.curSlide.id + "img.png");
        };
        SlideshowApp.prototype.useWebcam = function () {
            var _this = this;
            var onCamReady = function () {
                //this.webcam.start();
                _this.ui.useWebcamBtn.disabled = true;
                _this.ui.camVideo.classList.remove("hidden");
                _this.ui.slideImg.classList.remove("hidden");
                _this.webcam.showVideo();
            };
            //if (!this.webcam || !this.webcam.streaming) {
            //   this.initMedia(onCamReady);
            //} else {
            onCamReady();
            //}
        };
        SlideshowApp.prototype.takePicture = function () {
            this.workingSlide.image = this.ui.slideImg.src = this.webcam.takePicture();
            this.ui.camVideo.classList.add("hidden");
            var imgName = this.curSlide.id + "img.png";
            this.ui.setFilename($("#imgFilename"), imgName);
            //this.webcam.stop();
            this.setState(3 /* Slide */);
        };
        SlideshowApp.prototype.startRecording = function () {
            var _this = this;
            this.audio.clear();
            this.audio.record();
            this.ui.toggleRecordBtn.classList.add("active");
            var time = 0;
            this.audioTimer = setInterval(function () {
                time += 1;
                $("#audioTimer").text(time.toString());
                if (time >= 20) {
                    _this.stopRecording();
                }
            }, 1000);
        };
        SlideshowApp.prototype.stopRecording = function () {
            var _this = this;
            clearInterval(this.audioTimer);
            $(this.ui.recordedAudio).one('durationchange', function (e) {
                _this.workingSlide.duration = Math.floor(_this.ui.recordedAudio.duration) + 1;
                _this.ui.durationInput.value = _this.workingSlide.duration.toString();
                var filename = _this.curSlide.id + "audio.wav";
                _this.ui.setFilename($("#audioFilename"), filename);
                _this.workingSlide.audio = _this.audio.audioBlob;
            });
            this.ui.toggleRecordBtn.classList.remove("active");
            this.audio.stopRecording();
        };
        SlideshowApp.prototype.addSlide = function () {
            this.curSlide = new Slideshow.Slide();
            this.curSlide.id = this.show.nextId();
            this.show.addSlide(this.curSlide);
            if (this.audio) {
                this.audio.clear();
            }
            this.ui.captionHolder.textContent = this.ui.captionInput.value = "";
            $("#imgFilename").addClass("hidden");
            $("#audioFilename").addClass("hidden");
            this.ui.slideImg.src = "";
            this.ui.durationInput.value = this.curSlide.duration.toString();
            var thumb = this.createSlideThumb(this.curSlide);
            this.curThumb = thumb;
        };
        SlideshowApp.prototype.createSlideThumb = function (slide) {
            var _this = this;
            var slideThumb = new Slideshow.SlideControl();
            var thumbEl = slideThumb.getElement();
            slideThumb.id = thumbEl.id = slide.id;
            if (slide.image != undefined) {
                slideThumb.setImageSrc(slide.image);
            }
            this.ui.slideRoll.appendChild(thumbEl);
            this.slideThumbs[slide.id] = slideThumb;
            var slideIndex = this.show.getSlideIndex(this.curSlide);
            slideIndex = Math.max(slideIndex, 0);
            slideThumb.setOrder(slideIndex + 1);
            if (this.show.getLength() > slideIndex + 1) {
                this.updateSlideOrder();
            }
            $(this.ui.slideRoll).sortable({ handle: ".slide-drag-handle" });
            $(this.ui.slideRoll).sortable("refresh");
            // jump to new slide thumb
            this.ui.slideRoll.scrollTop = this.ui.slideRoll.scrollHeight;
            // fix scroll jump with sortables
            // http://stackoverflow.com/questions/1735372/jquery-sortable-list-scroll-bar-jumps-up-when-sorting/32477389#32477389
            /*$(thumbEl).mousedown(function () {
                $('#slideRoll').height($('#slideRoll').height());
            });/*.mouseup(function () {
                $('#slideRoll').height('auto');
            });*/
            $(slideThumb.getElement()).on("mouseup", function (e) {
                if (_this.curSlide.id == slideThumb.id) {
                    return;
                }
                else {
                    _this.curThumb = slideThumb;
                    _this.setSlide(slideThumb.id);
                }
            });
            slideThumb.deleteBtn.on("click", function (e) {
                var id = $(e.currentTarget).parent()[0].id;
                slideThumb.deleteModal.removeClass("hidden");
                var onConfirm = function () {
                    _this.deleteSlide(id);
                };
                slideThumb.deleteConfirmBtn.on("click", onConfirm);
                slideThumb.deleteCancelBtn.on("click", function () {
                    slideThumb.deleteModal.addClass("hidden");
                });
            });
            slideThumb.duplicateBtn.on("click", function (e) {
                var id = $(e.currentTarget).parent()[0].id;
                _this.duplicateSlide(id);
            });
            slideThumb.editBtn.on("click", function (e) {
                _this.workingSlide = _this.curSlide.clone();
                _this.setState(3 /* Slide */);
            });
            console.log("createSlideThumb");
            if (this.workMode == 0 /* W */) {
                console.log("workMode: FileMode.W");
                // todo:
                slideThumb.lockBtn.on("click", function (e) {
                    var id = $(e.currentTarget).parent()[0].id;
                    var slide = _this.show.getSlide(id);
                    _this.ui.toggleLock($(e.currentTarget));
                    slide.locked = !slide.locked;
                });
            }
            else {
                slideThumb.lockBtn.addClass("hidden");
                slideThumb.lockBtn[0].disabled = true;
                slideThumb.lockBtn.addClass("disabledBtn");
            }
            return slideThumb;
        };
        SlideshowApp.prototype.duplicateSlide = function (id) {
            var slide = this.show.getSlide(id);
            var dupe = slide.clone();
            dupe.id = this.show.nextId();
            var index = this.show.getSlideIndex(slide) + 1;
            this.show.addSlideAt(dupe, index);
            this.createSlideThumb(dupe);
        };
        SlideshowApp.prototype.deleteSlide = function (id) {
            if (this.curSlide.id == id) {
                var curIndex = this.show.getSlideIndex(this.curSlide);
                if (this.show.getLength() == 1) {
                    this.curSlide = null;
                }
                else {
                    var prevIndex = curIndex - 1;
                    prevIndex = Math.max(prevIndex, 0);
                    this.curSlide = this.show.getSlideAt(prevIndex);
                    this.setSlide(this.curSlide.id);
                }
            }
            this.show.removeSlide(id);
            var slideThumb = this.slideThumbs[id];
            this.ui.slideRoll.removeChild(slideThumb.getElement());
            delete this.slideThumbs[id];
            this.updateSlideOrder();
        };
        SlideshowApp.prototype.setSlide = function (id) {
            this.curSlide = this.show.slides[id];
            // update lock buttons for current slide
            this.ui.setEditLocks(this.curSlide.lockedFields, (this.workMode == 1 /* T */));
            this.ui.captionHolder.textContent = this.ui.captionInput.value = this.curSlide.text ? this.curSlide.text : "";
            this.ui.slideImg.src = this.curSlide.image;
            if (this.curSlide.image != "") {
                this.ui.setFilename($("#imgFilename"), this.curSlide.id + "img.png");
                $("#imgFilename").removeClass("hidden");
            }
            else {
                $("#imgFilename").addClass("hidden");
            }
            if (this.curSlide.audio) {
                this.ui.setFilename($("#audioFilename"), this.curSlide.id + "audio.wav");
                $("#audioFilename").removeClass("hidden");
                this.audio.load(this.curSlide.audio);
            }
            else {
                $("#audioFilename").addClass("hidden");
            }
            this.ui.durationInput.value = this.curSlide.duration.toString();
            if (this.curSlide.audio) {
                this.audio.load(this.curSlide.audio);
            }
            else {
                $("#audioTimer").text("0");
            }
            if (this.workMode == 1 /* T */) {
                $(".lockToggleBtn").addClass("disabledLockButton");
            }
        };
        SlideshowApp.prototype.updateSlide = function () {
            if (this.ui.captionInput.value) {
                this.workingSlide.text = this.ui.captionInput.value;
            }
            if (this.ui.durationInput.value) {
                this.workingSlide.duration = parseInt(this.ui.durationInput.value);
            }
            // replace original version of slide with working slide
            var index = this.show.getSlideIndex(this.curSlide);
            this.workingSlide.id = this.curSlide.id;
            this.show.removeSlide(this.curSlide.id);
            this.show.addSlideAt(this.workingSlide, index);
            this.curSlide = this.workingSlide;
            var slideThumb = this.slideThumbs[this.curSlide.id];
            slideThumb.setImageSrc(this.curSlide.image);
            slideThumb.order.text(index + 1);
        };
        SlideshowApp.prototype.saveSlides = function (callback) {
            var _this = this;
            console.log('saveSlides');
            var onAudioProcessed = function () {
                document.removeEventListener('audio_processed', onAudioProcessed);
                _this.finishSave();
            };
            document.addEventListener('audio_processed', onAudioProcessed);
            if (callback) {
                document.addEventListener('slideshow_saved', function () {
                    console.log("saved callback");
                    callback();
                });
            }
            this.show.prepForSave();
        };
        SlideshowApp.prototype.finishSave = function () {
            console.log('onAudioProcessed');
            var name = this.ui.nameTxtInput.value ? this.ui.nameTxtInput.value : "slideshow";
            var slidesJSON = '{"name":"' + name + '",\n"slides": [';
            var zip = new JSZip();
            for (var i = 0; i < this.show.slideIds.length; i++) {
                var id = this.show.slideIds[i];
                var slide = this.show.slides[id];
                var imgFileName = id + 'img.png';
                var audioFileName = id + 'audio.wav';
                var slideText = slide.text ? slide.text : "";
                var slideJSON = '\n{"text": ' + JSON.stringify(slideText);
                slideJSON += ', "duration": "' + slide.duration + '"';
                if (slide.image) {
                    slideJSON += ', "image": "' + imgFileName + '"';
                }
                if (slide.audio) {
                    slideJSON += ', "audio": "' + audioFileName + '"';
                }
                if (slide.locked) {
                    slideJSON += ', "locked": "' + slide.locked + '"';
                }
                if (slide.hasLockedFields()) {
                    slideJSON += ', "lockedFields": [' + slide.lockedFields.toString() + ']';
                }
                slideJSON += '}';
                slidesJSON += slideJSON;
                if (i < this.show.getLength() - 1) {
                    slidesJSON += ',';
                }
                var imgData = this.slideThumbs[id].getImageSrc();
                if (imgData) {
                    // remove metadata from dataURL
                    imgData = imgData.substr(imgData.indexOf(',') + 1);
                    zip.file(imgFileName, imgData, { base64: true });
                }
                if (slide.audio) {
                    zip.file(audioFileName, slide.audioData, { binary: true });
                }
            }
            slidesJSON += ']}';
            zip.file("slides.json", slidesJSON);
            var content = zip.generate({ type: "blob" });
            var ext;
            switch (this.exportMode) {
                case 0 /* W */:
                    ext = "cssw";
                    break;
                case 1 /* T */:
                    ext = "csst";
                    break;
                case 2 /* V */:
                    ext = "cssv";
                    break;
            }
            //FileSaver.js
            saveAs(content, name + "." + ext);
            console.log('saved slides');
            var event = new Event("slideshow_saved");
            document.dispatchEvent(event);
        };
        SlideshowApp.prototype.loadShowFile = function (file) {
            var _this = this;
            this.show = new Slideshow.Show();
            this.setState(2 /* Show */);
            var ext = file.name.substr(file.name.lastIndexOf('.'));
            switch (ext) {
                case ".cssw":
                    this.workMode = 0 /* W */;
                    break;
                case ".csst":
                    this.workMode = 1 /* T */;
                    break;
                case ".cssv":
                    this.workMode = 2 /* V */;
                    break;
            }
            console.log("loadShow workmode: " + this.workMode);
            this.setWorkMode(this.workMode);
            var reader = new FileReader();
            reader.onload = function (e) {
                _this.slideThumbs = {};
                _this.ui.slideRoll.innerHTML = '';
                var zip = new JSZip(e.target.result);
                var dataFile = zip.files['slides.json'];
                var slidesObj = JSON.parse(dataFile.asText());
                _this.ui.nameTxtInput.value = slidesObj["name"];
                var slides = slidesObj["slides"];
                for (var i = 0; i < slides.length; i++) {
                    var slideObj = slides[i];
                    _this.addSlide();
                    _this.curSlide.text = slideObj["text"] ? slideObj["text"] : "";
                    _this.curSlide.duration = slideObj["duration"];
                    if (slideObj.hasOwnProperty("image") && slideObj["image"] != "undefined" && slideObj["image"] != "") {
                        var imgName = slideObj["image"];
                        var imgFile = zip.files[imgName];
                        _this.curSlide.image = _this.curThumb.setImageSrc("data:image/png;base64," + JSZip.base64.encode(imgFile.asBinary()));
                    }
                    if (slideObj.hasOwnProperty("audio") && slideObj["audio"] != "undefined") {
                        var audioFileName = slideObj["audio"];
                        var audioFile = zip.files[audioFileName];
                        var dataview = new DataView(audioFile.asArrayBuffer()); // convert from binary to ArrayBuffer?
                        _this.curSlide.audio = new Blob([dataview], { type: 'audio/wav' });
                    }
                    if (slideObj.hasOwnProperty("locked") && slideObj["locked"] == "true") {
                        _this.curSlide.locked = true;
                        _this.ui.toggleLock(_this.curThumb.lockBtn);
                    }
                    if (_this.workMode == 1 /* T */) {
                        if (_this.curSlide.locked) {
                            _this.curThumb.lockBtn.removeClass("hidden");
                            _this.curThumb.editBtn.addClass("hidden");
                        }
                        else {
                            _this.curThumb.lockBtn.addClass("hidden");
                        }
                    }
                    if (slideObj.hasOwnProperty("lockedFields")) {
                        _this.curSlide.lockedFields = slideObj["lockedFields"];
                    }
                }
                _this.setSlide(_this.show.getSlideAt(0).id);
                _this.ui.slideFileInput.value = null;
            };
            reader.readAsArrayBuffer(file);
        };
        SlideshowApp.prototype.playShow = function () {
            var _this = this;
            console.log('playShow');
            this.playback = new Slideshow.Playback(this.show, this.ui.slideImg, this.ui.captionHolder, this.audio);
            this.ui.togglePlayBtn();
            $(document).one(Slideshow.PlaybackEvent.FINISH, function () {
                _this.onPlaybackFinished();
            });
            this.playback.start();
        };
        SlideshowApp.prototype.pauseShow = function () {
            this.ui.togglePlayBtn();
            this.playback.pause();
        };
        SlideshowApp.prototype.resumeShow = function () {
            this.ui.togglePlayBtn();
            this.playback.start();
        };
        SlideshowApp.prototype.onPlaybackFinished = function () {
            this.ui.togglePlayBtn();
            this.setSlide(this.show.getSlideAt(0).id);
            this.playback = null;
        };
        return SlideshowApp;
    })();
    Slideshow.SlideshowApp = SlideshowApp;
})(Slideshow || (Slideshow = {}));
var Slideshow;
(function (Slideshow) {
    var UI = (function () {
        function UI(content) {
            this.content = content;
            this.slideRoll = $('#slideRoll')[0];
            this.slideEditor = $('#slideEditor')[0];
            this.nameTxtInput = document.getElementById('nameTxtInput');
            this.slideImg = document.getElementById('slideImg');
            this.captionHolder = document.getElementById('captionHolder');
            this.captionInput = document.getElementById('captionInput');
            this.durationInput = document.getElementById('durationInput');
            this.loadPictureBtn = document.getElementById('loadPictureBtn');
            this.useWebcamBtn = document.getElementById('useWebcamBtn');
            this.takePictureBtn = document.getElementById('takePictureBtn');
            this.deleteImgBtn = document.getElementById('deleteImgBtn');
            this.recordAudioBtn = document.getElementById('recordAudioBtn');
            this.toggleRecordBtn = document.getElementById('toggleRecordBtn');
            this.deleteAudioBtn = document.getElementById('deleteAudioBtn');
            this.recordedAudio = document.getElementById('recordedAudio');
            this.saveShowBtn = document.getElementById('saveShowBtn');
            this.exportShowBtn = document.getElementById('exportShowBtn');
            this.loadShowBtn = document.getElementById('loadShowBtn');
            this.addSlideBtn = document.getElementById('addSlideBtn');
            this.deleteSlideBtn = document.getElementById('deleteSlideBtn');
            this.newShowBtn = document.getElementById('newShowBtn');
            this.playShowBtn = document.getElementById('playShowBtn');
            this.imgFileInput = document.getElementById('imgFileInput');
            this.slideFileInput = document.getElementById('slideFileInput');
            this.camVideo = document.getElementById('camVideo');
            this.camCanvas = document.getElementById('camCanvas');
            this.controlElements = document.getElementsByClassName('controls');
            this.hideDialog();
        }
        UI.prototype.hideEditControls = function () {
            for (var i = 0; i < this.controlElements.length; i++) {
                var el = this.controlElements[i];
                el.classList.add('hidden');
            }
        };
        UI.prototype.showEditControls = function () {
            for (var i = 0; i < this.controlElements.length; i++) {
                var el = this.controlElements[i];
                el.classList.remove('hidden');
            }
        };
        UI.prototype.clearAll = function () {
            this.nameTxtInput.value = "";
        };
        UI.prototype.showDialog = function (message, buttons) {
            var _this = this;
            $("#dialogWrapper").removeClass("hidden");
            $("#dialogMsg").html(message);
            $("#dialogBtns").empty();
            buttons.forEach(function (btnDef) {
                var btn = $("<button>").text(btnDef.text).addClass("textBtn");
                $("#dialogBtns").append(btn);
                (function (callback) {
                    btn.on("click", function () {
                        callback();
                        _this.hideDialog();
                    });
                })(btnDef.fn);
            });
        };
        UI.prototype.hideDialog = function () {
            $("#dialogWrapper").addClass("hidden");
        };
        UI.prototype.setEditLocks = function (locks, templateMode) {
            this.setLock($("#lockImgBtn"), locks[0 /* Image */], templateMode);
            if (locks[0 /* Image */] && templateMode) {
                $("#loadPictureBtn").addClass("hidden");
                $("#useWebcamBtn").addClass("hidden");
                $("#deleteImgBtn").addClass("hidden");
            }
            else {
                $("#loadPictureBtn").removeClass("hidden");
                $("#useWebcamBtn").removeClass("hidden");
                $("#deleteImgBtn").removeClass("hidden");
            }
            this.setLock($("#lockAudioBtn"), locks[1 /* Audio */], templateMode);
            if (locks[1 /* Audio */] && templateMode) {
                $("#recordAudioBtn").addClass("hidden");
                $("#loadAudioBtn").addClass("hidden");
                $("#deleteAudioBtn").addClass("hidden");
            }
            else {
                $("#recordAudioBtn").removeClass("hidden");
                $("#loadAudioBtn").removeClass("hidden");
                $("#deleteAudioBtn").removeClass("hidden");
            }
            this.setLock($("#lockCaptionBtn"), locks[2 /* Caption */], templateMode);
            if (locks[2 /* Caption */] && templateMode) {
                $("#captionInput").addClass("disabled");
                $("#captionInput").attr("readonly", "readonly");
            }
            else {
                $("#captionInput").removeClass("disabled");
                $("#captionInput").removeAttr("readonly");
            }
            this.setLock($("#lockDurationBtn"), locks[3 /* Duration */], templateMode);
            if (locks[3 /* Duration */] && templateMode) {
                $("#durationInput").addClass("disabled");
                $("#durationInput").attr("readonly", "readonly");
            }
            else {
                $("#durationInput").removeClass("disabled");
                $("#durationInput").removeAttr("readonly");
            }
        };
        UI.prototype.setLock = function (button, val, templateMode) {
            console.log("setLock: " + button + " = " + val + " (template=" + templateMode + ")");
            if (templateMode) {
                button.addClass("hidden");
            }
            else {
                button.removeClass("hidden");
            }
            if (val) {
                button.children("i").addClass("fa-lock").removeClass("fa-unlock-alt");
            }
            else {
                button.children("i").addClass("fa-unlock-alt").removeClass("fa-lock");
            }
        };
        UI.prototype.toggleLock = function (button) {
            button.children("i").toggleClass("fa-unlock-alt").toggleClass("fa-lock");
        };
        UI.prototype.togglePlayBtn = function () {
            $("#playShowBtn").children("i").toggleClass("fa-play").toggleClass("fa-pause");
        };
        UI.prototype.setFilename = function (selection, name) {
            selection.removeClass("hidden").children("span").text(name);
        };
        return UI;
    })();
    Slideshow.UI = UI;
})(Slideshow || (Slideshow = {}));
var Slideshow;
(function (Slideshow) {
    var Webcam = (function () {
        function Webcam(stream, video, canvas) {
            var _this = this;
            this.camWidth = 384;
            this.camHeight = 288;
            console.log('new Webcam');
            this.video = video;
            this.canvas = canvas;
            this.stream = stream;
            video.muted = true;
            var browserURL = window.URL || window.webkitURL || window.mozURL || window.msURL;
            video.src = browserURL.createObjectURL(stream);
            video.addEventListener('canplay', function (e) {
                if (!_this.streaming) {
                    _this.checkSizes();
                }
            }, false);
        }
        Webcam.prototype.stop = function () {
            console.log("webcam.stop");
            //this.stream.stop();
            this.stream.active = false;
            this.streaming = false;
        };
        Webcam.prototype.start = function () {
            if (!this.streaming) {
                this.stream.active = true;
                this.streaming = true;
            }
        };
        Webcam.prototype.checkSizes = function () {
            var onTimeUpdate = function (e) {
                this.checkSizes();
            };
            if (this.video.videoHeight != 0 && this.video.videoWidth != 0) {
                this.fixSizes();
                this.video.removeEventListener('timeupdate', function (e) { return onTimeUpdate; });
            }
            else {
                // account for FireFox bug (https://bugzilla.mozilla.org/show_bug.cgi?id=926753)
                this.video.addEventListener('timeupdate', function (e) { return onTimeUpdate; }, false);
            }
        };
        Webcam.prototype.showVideo = function () {
            this.video.hidden = false;
            this.video.play();
        };
        Webcam.prototype.hideVideo = function () {
            this.video.hidden = true;
            this.video.pause();
        };
        Webcam.prototype.fixSizes = function () {
            this.camHeight = this.video.videoHeight / (this.video.videoWidth / this.camWidth);
            this.video.setAttribute('width', this.camWidth.toString());
            this.video.setAttribute('height', this.camHeight.toString());
            this.canvas.setAttribute('width', this.camWidth.toString());
            this.canvas.setAttribute('height', this.camHeight.toString());
            this.streaming = true;
        };
        Webcam.prototype.takePicture = function () {
            this.canvas.width = this.camWidth;
            this.canvas.height = this.camHeight;
            var ctx = this.canvas.getContext('2d');
            ctx.save();
            ctx.scale(-1, 1);
            ctx.drawImage(this.video, this.camWidth * -1, 0, this.camWidth, this.camHeight);
            ctx.restore();
            var data = this.canvas.toDataURL('image/png');
            return data;
        };
        return Webcam;
    })();
    Slideshow.Webcam = Webcam;
})(Slideshow || (Slideshow = {}));
//# sourceMappingURL=slideshowApp.js.map