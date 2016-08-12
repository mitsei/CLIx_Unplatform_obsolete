// http://jsfiddle.net/dsbonev/cCCZ2/

var init = function(){
(function localFileVideoPlayerInit(win) {
    var URL = win.URL || win.webkitURL,
        displayMessage = (function displayMessageInit() {
            var node = document.querySelector('#message');

            return function displayMessage(message, isError) {
                node.innerHTML = message;
                node.className = isError ? 'error' : 'info';
            };
        }()),
        playSelectedFile = function playSelectedFileInit(event) {
            var file = this.files[0];
            var type = file.type;
            var videoNode = document.querySelector('video');
            var canPlay = videoNode.canPlayType(type);
            canPlay = (canPlay === '' ? 'no' : canPlay);
            var message = 'Can play type "' + type + '": ' + canPlay;
            var isError = canPlay === 'no';

            displayMessage(message, isError);
            if (isError) {
                return;
            }

            var fileURL = URL.createObjectURL(file);
            videoNode.src = fileURL;
        },
        inputNode = document.querySelector('input');
        
    if (!URL) {
        displayMessage('Your browser is not supported!', true);
        return;
    }                
                                                                                                                                                                                         
    inputNode.addEventListener('change', playSelectedFile, false);
    newButts(); // gotta be a better place to put this
    postFingerprint(); //same
}(window));
}

// var vid = document.querySelector('video');
// var fps = vid.webkitDecodedFrameCount / vid.currentTime;

// vid.currentTime += (1 / 29.97);
