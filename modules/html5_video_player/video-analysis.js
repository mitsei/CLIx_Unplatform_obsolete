
// hackey bit to get a simple fps solution in place til something more robust is developed
var fps = 99999;

function setFPS(framerate) {
	fps = framerate;
	hideFPSButtons()
}

// end hackey bit




function hideFPSButtons() {
	var fpsButtons = document.getElementsByClassName('hidden-fps')
	var frameButtons = document.getElementsByClassName('hidden-frame')

	for (var i = 0; i < fpsButtons.length; i++) {
		console.log(i)

		fpsButtons[i].style.display = 'none';
	};
	for (var i = 0; i < frameButtons.length; i++) {
		console.log(i)
		frameButtons[i].style.display = 'block';

	};
	
}

function hideshow() {
	var fpsButtons = document.getElementsByClassName('hidden-fps')
	var enableButton = document.getElementById('enable-frame-seek');
	enableButton.style.display = 'none';
	for (var i = 0; i < fpsButtons.length; i++) {
		fpsButtons[i].style.display = 'block';

	};
	
	
	
};



function rotateVideo() {
	var video = document.getElementById('video');
	if (video.style.transform === 'rotate(90deg)') { 
		video.style.transform = 'rotate(180deg)' }
	else if (video.style.transform === 'rotate(180deg)') { 
		video.style.transform = 'rotate(270deg)' }
	else if (video.style.transform === 'rotate(270deg)') { 
		video.style.transform = 'rotate(0deg)' }		
	else { video.style.transform='rotate(90deg)' }
	
	// document.getElementById('inner').style.marginTop = '100%'
}


// custom controls from 
// http://blog.teamtreehouse.com/building-custom-controls-for-html5-videos
function framePlus() {
	videoTimeDelta((1/fps))
}
	
function frameMinus() {
	videoTimeDelta(-(1/fps))
}	
		
function videoTimeDelta(delta) {
	if (video.paused == true) {
		video.currentTime += delta;
		video.currentTime = video.currentTime;
	} 
}
		
		
function newButtons() {
	// Buttons	
	var playButton = document.getElementById("play-pause");
	var muteButton = document.getElementById("mute");
	var fullScreenButton = document.getElementById("full-screen");
	var plusButton = document.getElementById("plus-one-frame");
	var minusButton = document.getElementById("minus-one-frame");
	
	
	// Sliders
	var seekBar = document.getElementById("seek-bar");
	var volumeBar = document.getElementById("volume-bar");

	// Time
	var currentTime = document.getElementById("current-time")
	
	// Video
	var video = document.getElementById("video");
	
		
	// Event listener for the play/pause button
	playButton.addEventListener("click", function() {
	if (video.paused == true) {
		// Play the video
		video.play();
	
		// Update the button text to 'Pause'
		playButton.innerHTML = "Pause";
	} else {
		// Pause the video
		video.pause();
	
		// Update the button text to 'Play'
		playButton.innerHTML = "Play";
	}
	});
	
	var enableFPSButton = document.getElementById('enable-frame-seek');
	enableFPSButton.addEventListener('click', hideshow, false);
	
	
	var fps24Button = document.getElementById('24-fps');
	var fps25Button = document.getElementById('25-fps');
	var fps30Button = document.getElementById('30-fps');
	var fps50Button = document.getElementById('50-fps');
	var fps60Button = document.getElementById('60-fps');
	
	fps24Button.addEventListener("click",function() { setFPS(24) }, false);
	fps25Button.addEventListener("click",function() { setFPS(25) }, false);
	fps30Button.addEventListener("click",function() { setFPS(30) }, false);
	fps50Button.addEventListener("click",function() { setFPS(50) }, false);
	fps60Button.addEventListener("click",function() { setFPS(60) }, false);
	
	plusButton.addEventListener("click", framePlus);
	
	minusButton.addEventListener("click", frameMinus);
	
	var rotateButton = document.getElementById("rotate-video");
	rotateButton.addEventListener("click", rotateVideo)
	
	// Event listener for the mute button
	muteButton.addEventListener("click", function() {
		if (video.muted == false) {
		// Mute the video
		video.muted = true;

		// Update the button text
		muteButton.innerHTML = "Unmute";
		} else {
		// Unmute the video
		video.muted = false;
	
		// Update the button text
		muteButton.innerHTML = "Mute";
		}
	});
	
	
	// Event listener for the volume bar
	volumeBar.addEventListener("change", function() {
		// Update the video volume
		video.volume = volumeBar.value;
	});
	
	
	
	// Event listener for the full-screen button
	fullScreenButton.addEventListener("click", function() {
		if (video.requestFullscreen) {
		video.requestFullscreen();
		} else if (video.mozRequestFullScreen) {
		video.mozRequestFullScreen(); // Firefox
		} else if (video.webkitRequestFullscreen) {
		video.webkitRequestFullscreen(); // Chrome and Safari
		}
	});
	
	
	
	
	
	// Event listener for the seek bar
	seekBar.addEventListener("change", function() {
		// Calculate the new time
		var time = video.duration * (seekBar.value / 100);
	
		// Update the video time
		video.currentTime = time;
	});
	
	// Update the seek bar as the video plays
	video.addEventListener("timeupdate", function() {
		// Calculate the slider value
		var value = (100 / video.duration) * video.currentTime;
	
		// Update the slider value
		seekBar.value = value;
	});

	video.oncanplay = function() {	
		currentTime.innerHTML = video.currentTime.toFixed(3);
		document.getElementById("duration").innerHTML = video.duration.toFixed(3);
	};
	
	// Update the current time
	video.ontimeupdate = function() {	
		document.getElementById("duration").innerHTML = video.duration.toFixed(3);
	};

	
	video.addEventListener("timeupdate", function() {
		// Calculate the slider value
		currentTime.innerHTML = video.currentTime.toFixed(3);
		
	});
	
	
	
	
	// Pause the video when the slider handle is being dragged
	seekBar.addEventListener("mousedown", function() {
		video.pause();
	});
	
	// Play the video when the slider handle is dropped
	seekBar.addEventListener("mouseup", function() {
		playButton.innerHTML = "Play"; // to cue that the video is paused and needs to be played
		// video.play(); // old, should delete
	});
}

