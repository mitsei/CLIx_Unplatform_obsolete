loading = {
    init: function() {
        
    },
  
    preload: function() {
        
        game.load.image('menu', 'assets/level-buttons-90x540.png', 90, 540);
        game.load.image('language_select_en', 'assets/language-buttons-en-90x180.png', 90, 180);
        game.load.image('language_select_hi', 'assets/language-buttons-hi-90x180.png', 90, 180);
        game.load.image('tracks', 'assets/tracks.png');  //track image
        game.load.spritesheet('bus', 'assets/bus.png', 64, 64);
        game.load.spritesheet('gems', 'assets/gems2.png', 64, 64, 9);
        game.load.spritesheet('goats', 'assets/goat.png', 64, 64);
        game.load.spritesheet('obstacles', 'assets/invisible_goat.png', 64, 64);
        game.load.spritesheet('busStops', 'assets/stop.png', 64, 64);
        game.load.spritesheet('10km', 'assets/10km.png', 64, 64);
        game.load.spritesheet('buttons', 'assets/buttons.png', 150, 48, 3); 
        game.load.spritesheet('green_check', 'assets/green_check.png', 64, 64);
        game.load.spritesheet('red_x', 'assets/red_x.png', 64, 64);
        game.loadJSONTilemap('assets/level1.json')
        
        game.load.start()
        
        if (debug) { game.time.advancedTiming = true; }
        
        game.state.start("LevelSelect");
    }
      
};