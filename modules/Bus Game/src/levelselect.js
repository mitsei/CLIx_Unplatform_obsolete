levelSelect = {
    create: function() {
        

        // Then add the menu
        menu = game.add.sprite(50, h/2, 'menu');
        menu.anchor.setTo(0.5, 0.5);
        
        // language_select = game.add.sprite(150, h/2, 'language_select');
        // language_select.anchor.setTo(0.5, 0.5);
        
        // Create a label to use as a button
        menu_button = game.add.text(640, 20, 'MENU', { font: '24px Arial', fill: '#1AF' });
        menu_button.inputEnabled = true;
        //menu_button.events.onInputUp.add(function () {
        // When the pause button is pressed, we pause the game
        game.paused = true;

        // And a label to illustrate which menu item was chosen. (This is not necessary)
        choiceLabel = game.add.text(w/2, h-150, 'Choose a level', { font: '30px Arial', fill: '#fff' });
        choiceLabel.anchor.setTo(0.5, 0.5);
        //});
    
        // Add a input listener that can help us return from being paused
        game.input.onDown.add(unpause, self);
        
        // And finally the method that handels the pause menu
        function unpause(event){
            // Only act if paused
            if(game.paused){
                
                // Calculate the corners of the menus
                var x1 = 50 - 90/2, x2 = 50+ 90/2,
                    y1 = h/2 - 540/2, y2 = h/2 + 540/2,
                    x3 = 150 - 90/2, x4 = 150 + 90/2,
                    y3 = h/2 - 180/2, y4 = h/2 + 180/2;
                
                console.log('x: ' + event.x + '\ny: ' + event.y)
                
                // Check if the click was inside the menu
                if(event.x > x1 && event.x < x2 && event.y > y1 && event.y < y2 ){
                    // The choicemap is an array that will help us see which item was clicked
                    var choicemap = ['one', 'two', 'three', 'four', 'five', 'six'];
    
                    // Get menu local coordinates for the click
                    var x = event.x - x1,
                        y = event.y - y1;
    
                    // Calculate the choice 
                    var choice = Math.floor(y / 90) //Math.floor(x / 90) + 3*Math.floor(y / 90);
                    console.log('choice: ' + choice)
                    // Display the choice
                    choiceLabel.text = 'You chose menu item: ' + choicemap[choice];
                    level = choice + 1;
                    game.loadJSONTilemap('assets/level' + level + '.json') // bug workaround included
                    if (level == 1 || level == 2 || level == 3) { totalTicks = 2 } else { totalTicks = 13 }
                    instructions = instruction_array[level - 1] // "The quick brown fox jumps over the lazy dog. This is called a pangram."
                    
                    game.state.start("PlayLevel");
                    
                    game.paused = false;
                } else if(event.x > x3 && event.x < x4 && event.y > y3 && event.y < y4 ) {
                    var x = event.x - x3,
                        y = event.y - y3;
                        var language = Math.floor(y / 90)
                        console.log('lang: ' + language)
                } else {
                    // Remove the menu and the label
                    // menu.destroy();
                    // choiceLabel.destroy();
    
                    // Unpause the game
                    // game.paused = false;
                    
                    
                }
            }
        };
        
        game.loadJSONTilemap = function(url) {
            var request = new XMLHttpRequest();
            request.open('GET', url, false);  // `false` makes the request synchronous
            request.send(null);
            if (request.status === 200) {
              game.load.tilemap('MyTileMap', null, request.responseText, Phaser.Tilemap.TILED_JSON);
            }
        }
        
    },
    
};

var instruction_array = ["Welcome to Top Grade Bus Company. You are our new driver for our fancy new buses. We use this tool to control the bus making it go faster or slower. Try dragging the control up or down and clicking 'Go'. What's the fastest your bus can go?", "Drivers need to make their bus go the exact speed that they choose. Can you make your bus go exactly 60 Km/hr?", "Now let's add more controls. If we have three controls, they can tell the bus how fast to go the first 5 minutes, the next 6-10 minutes and then 11-15 minutes. Can you make your bus start slow, then get faster, and even faster? Try it.", "Do these controls remind you of anything? These controls are really just a graph of velocity (the y-axis) and time (the x-axis). Let's look at a graph for one hour, broken into 12 five-minute segments. Try to make the bus go any speed, but never slower than 40 Km/hr.", "Good bus drivers follow a schedule. Can you stick to a schedule? Control the velocity of your bus to make it arrive at each station at the time posted on the station sign.", "Better drivers also avoid accidents! Watch out for animals in the road, and get to your stations on time. BUT where there are animals, do not go above 20 Km/hr to avoid an accident."]