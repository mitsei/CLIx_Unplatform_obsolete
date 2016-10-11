levelSelect = {
    create: function() {
        
            game.stage.backgroundColor = 'rgb(225, 225, 245)';
            bkgnd = game.add.image(0, h - 564, 'levelselectscreen');
            // bkgnd.alpha = .5
            logo = game.add.sprite(800, 420, 'logo');
            
            levelOneButton = new LevelButton(100, 500, 1)
            levelTwoButton = new LevelButton(200, 500, 2)
            levelThreeButton = new LevelButton(300, 500, 3)
            levelFourButton = new LevelButton(400, 500, 4)
            levelFiveButton = new LevelButton(500, 500, 5)
            levelSixButton = new LevelButton(600, 500, 6)
            levelSevenButton = new LevelButton(700, 500, 7)
    
            textBoxOne = new Description(120, 150, "You are a biomechanical engineer creating a robotic cat. Carefully adjust your cat’s speed to catch the target mouse. Pay attention -- the mouse always gets a head start.")
            textBoxTwo = new Description(120, textBoxOne.bottom + 15, "If there are two players, one player controls the cat. The other player places their bet predicting what they think happen.")
            textBoxThree = new Description(120, textBoxTwo.bottom + 15, 'If you are sharing a computer, take turns controling the cat and placing bets.\nGood hunting!')
            // textBoxFour = new Description(100, textBoxThree.bottom + 5, 'Good hunting!')
            
        }
};

class Description extends Phaser.Sprite {
    constructor(x,y, text){     
        super(game, x, y, 'rectangle');
        game.add.existing(this);
        this.xScale = 2.0
        this.yScale = 0.7

        this.tint = '0x0b4f6c'
        this.alpha = 0.8
        this.style = {
                font: "20px PT Mono",
                fill: "white",
                wordWrap: true,
                wordWrapWidth: 235*this.xScale,
                align: "center",
            };
        this.text = game.add.text(x + (10*this.xScale) , y + (10*this.yScale), text, this.style)

        this.scale.setTo(this.xScale, this.text.height/(246))
    }
}

class LevelButton extends Phaser.Sprite {
    constructor(x,y,levelnum){     
        super(game, x, y, 'levelbutton');
        game.add.existing(this);
        this.style = {
            'font': '15px Arial',
            'fill': 'white'
        };
        this.text = game.add.text(this.x + 32, this.y+ 16, "Level " + levelnum, this.style)
        this.text.anchor.setTo(0.5, 0.5)
        
        this.levelnum = levelnum
        this.inputEnabled = true;
        this.events.onInputDown.add(function(e){
            game.level = levelnum
            game.report("level_selected", {'level': game.level})
            game.state.start("PlayLevel")
        })
        this.alpha = 0.99
        this.scale.setTo(1, 0.5)
      
    }
}