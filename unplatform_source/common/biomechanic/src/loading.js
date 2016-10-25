loading = {
    preload: function() {
        game.loadJSONTilemap('assets/level1.json');
        game.load.image('levelmenu', 'assets/level-buttons-90x630.png');
        
        game.load.image('roadmarker', 'assets/roadmarker.png');
        game.load.image('whiteroadmarker', 'assets/whiteroadmarker.png');
        game.load.image('road', 'assets/road.png', 64, 64);  //track image
        game.load.spritesheet('cat', 'assets/cat.png', 64, 64);
        game.load.spritesheet('mouse', 'assets/mouse.png', 64, 64, 8);
        game.load.spritesheet('robot', 'assets/robot.png', 64, 64, 10);
        game.load.image('finish', 'assets/finish.png');
        game.load.image('sign', 'assets/sign.png');
        game.load.image('slider', 'assets/slider.png', 64, 128);
        game.load.image('handle', 'assets/handle.png', 64, 32);
        game.load.image('lock', 'assets/lock.png', 64, 64);
        game.load.spritesheet('bet', 'assets/betbuttons.png', 192, 64, 4);
        game.load.spritesheet('stars', 'assets/stars.png', 192, 64, 4);
        game.load.spritesheet('buttons', 'assets/buttons.png', 150, 48); 
        // game.load.spritesheet('levelmenu', 'assets/level-buttons-90x360.png', 90, 360)
        game.load.image('arrows', 'assets/arrows.png',64, 128)
        game.load.image("loadscreen", "assets/loadscreen.png");
        game.load.image("logo", "assets/logo.png");
        game.load.image('levelselectscreen', 'assets/levelselectscreen.png')
        game.load.image('levelbutton', 'assets/levelbutton.png')
        game.load.image('minimouse', 'assets/minimouse.png')
        game.load.image('minicat', 'assets/minicat.png')
        game.load.image('rectangle', 'assets/rectangle.png')
        game.load.image('logo', 'assets/logo.png')
        game.load.image('plus', 'assets/plus.png')
        game.load.image('minus', 'assets/minus.png')
        game.load.image('speedometer', 'assets/speedometer.png')
        game.load.image('hourglass', 'assets/hourglass.png')
        game.load.image('pointer', 'assets/pointer.png')
        game.load.image('ending', 'assets/ending.png')
        
        // game.time.advancedTiming = true
        
        
        // game.scale.onSizeChange(function() {
        //     var graphWidth = document.getElementById('posgraph').style.width
        //     document.getElementById('posgraph').style.width = "inline";
            
        // })
        // // http://phaser.io/docs/2.4.4/Phaser.ScaleManager.html#scaleMode  
        // game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL
        
    },
  
    create: function() {
        
        game.state.onStateChange.add(function (state) { console.log(state)}) 
        
        loadscreen = game.add.image(0, 0, 'loadscreen');
        logo = game.add.sprite(200, 250, 'logo');
        logo.scale.setTo(1.1,1.1)
        
        game.load.start()       
        if (debug) { game.time.advancedTiming = true; }
        
         setTimeout(function(){
                game.state.start("LevelSelect")
            }, 3000);
        
        
        
        game.report = function(event, params) {
            data = {
                "app_name": "biomechanic",
                "event_type": event,
                "params": params,
            }
            console.log(data)
            gameReporter.submitData('/api/appdata/', data)
        }
        
    },
    
    update: function() {    
       
    }
      
};


class GameReporter {
	constructor(data) {
		this.session_id = this.getCookie('session_uuid')
	}


	submitData(url, data) {
		var xhr = new XMLHttpRequest();

		var data_string = {}
		data_string['session_id'] = this.getCookie('session_uuid');
		for (var key in data) {data_string[key] = data[key];};
		data_string = JSON.stringify(data_string);

		xhr.open('POST', url, false);
		xhr.setRequestHeader("Content-Type","application/json");
		xhr.send(data_string);
		return xhr.response
	}

	getCookie(cname) {
		var name = cname + "=";
		var ca = document.cookie.split(';');
		for(var i=0; i<ca.length; i++) {
			var c = ca[i];
			while (c.charAt(0)==' ') c = c.substring(1);
			if (c.indexOf(name) == 0) return c.substring(name.length,c.length);
		}
        console.log('no uuid found')
	}


}

var gameReporter = new GameReporter()
