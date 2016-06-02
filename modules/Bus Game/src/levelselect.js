levelSelect = {
    create: function() {
        // Add the menu
        menu = game.add.sprite(50, h/2, 'menu');
        menu.anchor.setTo(0.5, 0.5);
        
        // language_select = game.add.sprite(150, h/2, 'language_select');
        selectLanguage(language);
        
        
        // Create a label to use as a button
        menu_button = game.add.text(640, 20, 'MENU', { font: '24px Arial', fill: '#1AF' });
        menu_button.inputEnabled = true;
        
        choiceLabel = game.add.text(w/2, h-150, 'Choose a level', { font: '30px Arial', fill: '#fff' });
        choiceLabel.anchor.setTo(0.5, 0.5);
        //});
        game.paused = true;
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
                    // var choicemap = ['one', 'two', 'three', 'four', 'five', 'six'];
    
                    // Get menu local coordinates for the click
                    var x = event.x - x1,
                        y = event.y - y1;
    
                    // Calculate the choice 
                    var choice = Math.floor(y / 90) //Math.floor(x / 90) + 3*Math.floor(y / 90);
                    console.log('choice: ' + choice)
                    // Display the choice
                    // choiceLabel.text = 'You chose menu item: ' + choicemap[choice];
                    level = choice + 1;
                    game.loadJSONTilemap('assets/level' + level + '.json') // bug workaround included
                    if (level == 1 || level == 2 || level == 3) { totalTicks = 2 } else { totalTicks = 13 }
                    instructions = instruction_array[language][level - 1] // "The quick brown fox jumps over the lazy dog. This is called a pangram."
                    
                    game.state.start("PlayLevel");
                    
                    game.paused = false;
                } else if(event.x > x3 && event.x < x4 && event.y > y3 && event.y < y4 ) {
                    var x = event.x - x3,
                        y = event.y - y3;
                        language_select.destroy()
                        language = Math.floor(y / 90)
                        selectLanguage(language)
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
        
    function selectLanguage(language){
        if (language == 0) {
            language_select = game.add.sprite(150, h/2, 'language_select_en');
        } else {
            language_select = game.add.sprite(150, h/2, 'language_select_hi')
        }
        language_select.anchor.setTo(0.5, 0.5);
    }
    },
    
    
    
};

var instruction_array = [["Welcome to Top Grade Bus Company. You are our new driver for our fancy new buses. We use this tool to control the bus making it go faster or slower. Try dragging the control up or down and clicking 'Go'. What's the fastest your bus can go?", "Drivers need to make their bus go the exact speed that they choose. Can you make your bus go exactly 60 Km/hr?", "Now let's add more controls. If we have three controls, they can tell the bus how fast to go the first 5 minutes, the next 6-10 minutes and then 11-15 minutes. Can you make your bus start slow, then get faster, and even faster? Try it.", "Do these controls remind you of anything? These controls are really just a graph of velocity (the y-axis) and time (the x-axis). Let's look at a graph for one hour, broken into 12 five-minute segments. Try to make the bus go any speed, but never slower than 40 Km/hr.", "Good bus drivers follow a schedule. Can you stick to a schedule? Control the velocity of your bus to make it arrive at each station at the time posted on the station sign.", "Better drivers also avoid accidents! Watch out for animals in the road, and get to your stations on time. BUT where there are animals, do not go above 20 Km/hr to avoid an accident."],
["टॉप ग्रेड बस कंपनी में आपका स्वागत है। हमारी इन खूबसूरत बसों के आप नए चालक हैं। इस कंट्रोल टूल का इस्तेमाल हम बस की रफ्तार को बढ़ाने या घटाने के लिए करते हैं। इस कंट्रोल को अप और डाउन करने की कोशिश कीजिए और साथ में “गो” पर क्लिक कीजिए। आपकी बस अधिकतम कितनी तेज़ जा सकती है?", "चालकों को ठीक उसी रफ्तार से बस चलानी होगी जो कि उन्होंने चुनी है। क्या आप अपनी बस को बिल्कुल 60 किलोमीटर प्रति घंटा (60कि.मी./ घंटा) की रफ्तार से आगे बढ़ा सकते हैं?", "चलिए नए कंट्रोल जोड़ते हैं। यदि हमारे पास तीन कंट्रोल हों तो, तो वे बस को बता सकते हैं कि पहले पांच मिनट के बीच कितनी रफ्तरा से जाना है और 6-10 मिनट के बीच व 11-15  मिनट के बीच रफ्तार कितनी रखनी है।  क्या आप अपनी बस को पहले धीरे और फिर थोड़ा तेज़ और फिर और तेज़ कर सकते हो? कोशिश करके देखो ज़रा।", "इन कंट्रोल को देखकर आपको कुछ याद आता है? ये कंट्रोल बस वेग (y अक्ष) और सयम (x अक्ष) का ग्राफ हैं। इस एक घंटे की अवधि के ग्राफ को देखते हैं जिसे 5 मिनट के 12 हिस्सों में बांट दिया है। कोशिश करें बस को चलाने के लेकिन ध्यान रहे कि उसकी स्पीड कभी भी 40 किमी/घंटा से कम न हो।", "बस के अच्छे चालक समय सारिणी का पालन करते हैं। क्या आप समय सारिणी का पालन कर सकते हैं ? बस के वेग को इस तरह रखें कि वह हर स्टेशन पर पूर्व निर्धारित समय पर ही पहुंचे।", "कुशल चालक दुर्धटना से भी बचते हैं। ध्यान रखिएगा सड़क पर मिलने वाले जानवरों का और हां स्टेशन ठीक समय पर ही पहुंचना है। जहां जानवर मिलें वहां 20 किमी/घंटा से ऊपर न जाएं ताकि दुर्घटना से बचा जा सके।"]]