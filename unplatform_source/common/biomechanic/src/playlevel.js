playLevel = {
    create: function() {

        // game.fpsProblemNotifier.add(function() {
        //     game.time.desiredFps = game.time.suggestedFps - 8;
        //     console.log('fps problem')
        // }, this);


        // Set up the html elements
        document.getElementsByTagName('body')[0].style="background-color:#aae;"
        document.getElementById('graphs').style.display = "inline";
        document.getElementById('posgraph-ctr').style.display = "inline";
        document.getElementById('velgraph-ctr').style.display = "inline";

        game.stage.backgroundColor = '0xaae';

        // game.physics.startSystem(Phaser.Physics.ARCADE);
        map = game.add.tilemap('MyTileMap');
        map.addTilesetImage('road', 'road');
        map.addTilesetImage('robot', 'robot');
        map.addTilesetImage('buttons', 'buttons');
        map.addTilesetImage('finish', 'finish');
        map.addTilesetImage('handle', 'handle');
        map.addTilesetImage('slider', 'slider');


        layer = map.createLayer('RoadTiles');
        layer.resizeWorld();
        if (debug) { layer.debug = true; }

        // header = game.add.sprite(0,0, 'rectangle')
        // header.scale.set(4, .5)
        // header.tint = '0xeef'
        // header.alpha = .1


        // At this point all the objects in the scene are setup
        levelIndicator = new LevelIndicator(100, 60)
        logo = game.add.sprite(306, 20, 'logo')
        logo.scale.setTo(1)

        signLocations = this.findObjectsByType('sign', map, 'Objects');
        startSign = new Sign(signLocations[0], "0m")
        startSign.markerone = game.add.sprite(signLocations[0].x, signLocations[0].y, 'whiteroadmarker')
        startSign.markertwo = game.add.sprite(signLocations[0].x, signLocations[0].y + 64, 'whiteroadmarker')
        signOne = new Sign(signLocations[2], "20m")
        signTwo = new Sign(signLocations[3], "40m")
        endSign = new Sign(signLocations[1], "60m")
        distance = (endSign.x - startSign.x) // in pixels

        finishline = game.add.group()
        finishLocations = this.findObjectsByType('finish', map, 'Objects');
        finishLocations.forEach(function(location){
            new Finish(location, finishline)
        })


        playerLocations = this.findObjectsByType('robot', map, 'Objects');
        players = game.add.group()
        playerone = new Computer(playerLocations[0], players, 0x554444, 'mouse')
        playertwo = new Player(playerLocations[1], players, 0xADD8E6, 'cat')
        playertwo.checkSolution()
        // playerone.x -= 18
        // playertwo.x -= 18

        // Player one's throttle was originally visible
        handleLocation = this.findObjectsByType('handle', map, 'Objects');
        playerone.lever = new Lever(handleLocation[1], playerone)  // computer
        // playerone.lever.toggleEnabled()
        playerone.lever.visible = false;
        playerone.lever.slider.visible = false;
        playerone.lever.text.visible = false;
        playertwo.lever = new Lever(handleLocation[0], playertwo)  // player

        betButton = new BetBox(700, 60)

        // This let's us reposition the velocity graph
        // document.getElementById('graphs').style.display = "inline";
        if (game.level == 6) {
            document.getElementById('velgraph-ctr').style="position:absolute; left:-430px;"
            console.log('left')
        }
        posgraph = new Graph("Position (m)", playerone, playertwo, 'posgraph')
        velgraph = new Graph("Velocity (m/s)", playerone, playertwo, 'velgraph')

        if (game.level < 6) {
            legend = new Legend(960, 350)
        } else { legend = new Legend(530, 350)   }

        // This sucks. It was shoehorned in because too many pieces need to be done in a certain order.
        pointerloc = {} // for corrections
        if (game.level === 1 ){
            document.getElementById('graphs').style.display = "none";
            legend.toggleHide()


            pointerloc.x = playertwo.lever.slider.x
            pointerloc.y = playertwo.lever.slider.y
            pointerloc.y += 168
            pointer = new Pointer(pointerloc)

        } else if (game.level === 2) {

            posgraph.fullGraph()
            velgraph.fullGraph()

            pointerloc.x = playertwo.lever.slider.x
            pointerloc.y = playertwo.lever.slider.y
            pointerloc.y += 168
            pointer = new Pointer(pointerloc)


        } else if (game.level === 3 ) {
            document.getElementById('graphs').style.display = "none";
            legend.toggleHide()

            pointerloc.x = playertwo.lever.slider.x
            pointerloc.y = playertwo.lever.slider.y
            pointerloc.y += 168
            pointer = new Pointer(pointerloc)

        } else if (game.level === 4 ) {
            document.getElementById('graphs').style.display = "none";
            legend.toggleHide()
            
            playertwo.lever.inputEnabled = false
            playertwo.lever.toggleEnabled()
            playertwo.enableChangeDelay()

            pointerloc.x = playertwo.delayController.x
            pointerloc.x += 10
            pointerloc.y = playertwo.delayController.y
            pointerloc.y += 64
            pointer = new Pointer(pointerloc)


        } else if (game.level === 5 ) {
            posgraph.fullGraph()
            velgraph.fullGraph()
            playertwo.lever.inputEnabled = false
            playertwo.lever.toggleEnabled()
            playertwo.lever.visible = false;
            playertwo.lever.slider.visible = false;
            playertwo.lever.text.visible = false;

            graphControl = new GraphControl(50, 340)


            pointerloc.x = graphControl.x
            pointerloc.y = graphControl.y
            pointerloc.y += 118
            pointer = new Pointer(pointerloc)
        } else if (game.level === 6 ) {
            posgraph.fullGraph()
            velgraph.fullGraph()
            playertwo.lever.inputEnabled = false
            playertwo.lever.toggleEnabled()

            playertwo.lever.visible = false;
            playertwo.lever.slider.visible = false;
            playertwo.lever.text.visible = false;
            playertwo.lever.label.visible = false

            graphControl = new GraphControl(50, 340)
            document.getElementById('posgraph-ctr').style.display = "none";

            pointerloc.x = graphControl.x
            pointerloc.y = graphControl.y
            pointerloc.y += 118
            pointer = new Pointer(pointerloc)


        } else if (game.level === 7 ) {
            // playertwo.lever.inputEnabled = false
            posgraph.fullGraph()
            velgraph.fullGraph()
            document.getElementById('velgraph-ctr').style.display = "none";
            playertwo.lever.text.visible = false;

            pointerloc.x = playertwo.lever.slider.x
            pointerloc.y = playertwo.lever.slider.y
            pointerloc.y += 168
            pointer = new Pointer(pointerloc)

        }

        promptBox = new Prompt(430,600)

        // game.time.desiredFps = game.time.suggestedFps - 5;

    },

    update: function() {


        // All removed when the actual physics models were pulled out
        // if (playerone.body.velocity.x > 0 && playertwo.body.velocity.x > 0) {

        //     game.deltaTime = (game.time.elapsedMS * game.time.fps) / 1000;

        //     playerone.body.velocity.x = playerone.vel * game.deltaTime;
        //     playertwo.body.velocity.x = playertwo.vel * game.deltaTime;
        //     // console.log(playerone.velocity)
        // }

        // // game.physics.arcade.overlap(players, finishline, finishcollide, finishprocess, this);
        // // function finishcollide() {}
        // // function finishprocess(player, finish) {
        // //     player.stop()
        // //     // playertwo.stop()
        // //     betButton.showResult(playerone,playertwo);
        // //     if (Math.abs(playerone.x - playertwo.x) < 32) {
        // //         game.ontime = true
        // //         promptBox.indicator.updateProgress()
        // //         // asdf

        // //     } else {
        // //         game.ontime = false
        // //         promptBox.updatePrompt() // will this fire multiple times.?
        // //     }

        // }
    },



	findObjectsByType: function(type, map, layer) {
		var result = new Array();
		map.objects[layer].forEach(function(element) {
			if (element.type === type) {
				//Put all of the specifed objects in an array.
				//Phaser uses top left, Tiled bottom left so we have to adjust
				//so they might not be placed in the exact position as in Tiled
				result.push(element);
			}
		});
		return result;
	},

    render: function() {
		if (debug) {
			players.forEachAlive(this.renderGroup, this);
            finishline.forEachAlive(this.renderGroup, this);
			game.debug.text(game.time.fps || '--', 2, 14, "#00ff00");
            game.debug.geom( leverBounds[0], 'rgba(255,255,0,.4)' ) ;
            game.debug.geom( leverBounds[1], 'rgba(255,255,0,.4)' ) ;
		}
	},
    // rendergroup lets you add debug to ever member of a group
	renderGroup: function(member) {
		game.debug.body(member);
	},


};


class CenteredText {
    constructor(sprite, yoffset, txt, style) {
        if (style.wordWrap ) {
            style.wordWrapWidth = style.wordWrapWidth || (sprite.right - sprite.left) - 50
        }
        this.text = game.add.text(0, 0, txt, style)
        this.text.anchor.set(0.5);
        this.text.x = Math.ceil((sprite.left + sprite.right) / 2);
        this.text.y = Math.ceil((sprite.top + sprite.bottom) / 2) + yoffset;
        this.lines = this.text.precalculateWordWrap(txt.toString())
    }
}

class TextBox extends Phaser.Sprite {
    constructor(x,y, yoffset, xScale, yScale, txt, style) {
        super(game,x,y,'rectangle');
        game.add.existing(this);

        this.scale.set(xScale, yScale)
        this.anchor.set(0.5);

        this.text = new CenteredText(this, yoffset, txt, style)
    }
}

class LabelButton extends Phaser.Button {
    constructor(game, x, y, key, label, callback, callbackContext, overFrame, outFrame, downFrame, upFrame) {
        super(game, x, y, key, callback, callbackContext, overFrame, outFrame, downFrame, upFrame);
        this.style = {
          'font': '30px PT Mono',
          'fill': 'black'
        };
        this.anchor.setTo(0.5, 0.5);
        this.label = new Phaser.Text(game, 0, 0, label, this.style);
        //puts the label in the center of the button
        this.label.anchor.setTo(0.5, 0.5);
        this.addChild(this.label);
        this.setLabel(label); //adds button to game
        game.add.existing(this);
    }
    setLabel(label) {
        this.label.setText(label);
    }
};

class Player extends Phaser.Sprite {
    constructor(location, group, color, sprite) {
        super(game, location.x+3 - 18, location.y - 64 - 14, sprite, 8);
        this.delays = [1, 2, 3, 4, 5, 6 , 8, 9, 10, 12, 15];
        this.speeds = [3, 4, 5, 6, 7.5, 10, 12, 15, 20, 30, 60];
        this.speed = this.speeds[0]; // initial speed
        // game.physics.enable(this);
        // this.body.enable = true;
        // this.body.setSize(6,32, -2, 32);
        game.world.bringToTop(this)
        // this.body.velocity.x = 0;
        this.animations.add('run');
        game.add.existing(this);
        this.color = color
        if (game.level == 7 ) {
            this.delay = 0
        } else {
            this.delay = this.randomValue(this.delays.slice(0,computerSpeed+1));
        }


        group.add(this);
        this.labelDelay(this.delay)
        this.text.visible = true
    }
    // move() {
    //     var _this = this
    //     this.movement = setTimeout(function() {
    //         _this.vel = distance * _this.speed / 60
    //         _this.body.velocity.x = _this.vel
    //         _this.animations.play('run', 8, true);
    //         _this.lever.toggleEnabled();
    //     }, this.delay * 1000); // in milliseconds
    //     if (game.level != 4) {
    //         this.countdown()
    //     } else if (game.level == 4) {

    //     }
    // }

    fakeMove() {
        var _this = this
        this.rate = distance * this.speed / 60
        this.lever.toggleEnabled();
        this.movement = setTimeout(function() {
            _this.motion = setInterval(function() {
                _this.x += _this.rate * 30 / 1000
                if (_this.x > 704 ) {

                    if (_this.x > 704 + _this.speed*2 ) {
                        clearInterval(_this.motion)
                        _this.animations.stop(null, true);
                    }
                    betButton.showResult(playerone,playertwo);
                    // if (Math.abs(playerone.x - playertwo.x) < 63) {
                    if ( playertwo.speed*(60 - playerone.speed * playertwo.delay) == 60*playerone.speed ) {
                        game.ontime = true
                        promptBox.indicator.updateProgress()

                    } else {
                        game.ontime = false
                        promptBox.updatePrompt() // will this fire multiple times.?
                    }


                }
                },30)
            _this.animations.play('run', 8, true);
            _this.lever.toggleEnabled();
        }, this.delay * 1000); // in milliseconds
        if (game.level != 4) {
            this.countdown()
        } else if (game.level == 4) {

        }
    }

    // stop() {
    //     var _this = this;
    //     setTimeout(function(e) {
    //         _this.animations.stop(null, true);
    //         // _this.body.velocity.x = 0;
    //     }, 1000); // in milliseconds
    //     // promptBox.next_button.visible = true;
    // }
    labelDelay(label) {

        this.backplate = game.add.sprite(this.x - 132 + 18, this.y +14,'rectangle')
        this.backplate.scale.set(.35,.25)
        this.backplate.tint = this.color


        if (game.level == 4) {
            this.flair = game.add.sprite(this.x - 128 + 18, this.y + 20,'speedometer')
        } else {
            this.flair = game.add.sprite(this.x - 128+ 18, this.y + 20,'hourglass')
        }

        this.flair.scale.set(.8)

        this.sprite = game.add.sprite(this.x - 128 + 18, this.y + 44,'minicat')
        this.sprite.scale.set(1.3)




        this.text = game.add.text(this.x - 96 + 18, this.y + 16, "Delay:\n   " + label + " s", {
            font: "18px PT Mono",
            fill: "#000",
            align: "left"
		});
    }
    // blinkDelay() {
    //     var _this = this
    //     _this.blink = setInterval(function(){
    //             _this.text.visible = !_this.text.visible;
    //         }, 500)

    // }



    enableChangeDelay() {
        if (game.level == 4) {
            // var _this = this
            // this.text.inputEnabled = true;

            // this.text.events.onInputUp.add(function(e){
            //     _this.index = _this.delays.indexOf(_this.delay)
            //     _this.delay = _this.delays[(_this.index + 1) % _this.delays.length ]
            //     _this.text.destroy()
            //     _this.labelDelay(_this.delay)
            //     _this.enableChangeDelay()
            //     clearInterval(_this.blink)
            // })

            this.text.destroy()
            this.lever.visible = false;
            this.lever.slider.visible = false;
            this.lever.text.visible = false;

            this.delayController = new DelayController(70, 400)




        }
    }


    randomValue(arr) {
        return arr[Math.floor(Math.random()*arr.length)]
    };
    countdown() {
        var _this = this;
        this.counter = this.delay
        if (this.counter > 0) {
            this.timer = setInterval(function(e) {
                _this.text.destroy()
                _this.counter -= 1
                _this.labelDelay(_this.counter)
                if (_this.counter == 0) { clearInterval(_this.timer) }
            }, 1000)
        }
    }
    resetDelay() {
        clearInterval(this.timer)
        clearInterval(this.movement)
    }

    checkSolution() {
        var _this = this
        var speed = playerone.speeds[computerSpeed]
        _this.solvable = false;
        if (game.level != 4) {
            while ( !_this.solvable  ){
                _this.speeds.forEach(function(playerSpeed){

                    if ( playerSpeed*(60/speed - _this.delay) == 60 ) {
                        _this.solvable = true;
                    }
                })
                if (!_this.solvable) {
                    _this.delay = _this.randomValue(_this.delays);
                    console.log('new delay: ' + _this.delay)
                }
            }
            _this.text.destroy()
            _this.labelDelay(_this.delay)
        } else if (game.level == 4) {

            while ( !_this.solvable  ){
                _this.delays.forEach(function(playerDelay){

                    if ( _this.speed*(60/speed - playerDelay) == 60 ) {
                        _this.solvable = true;
                    }
                })
                if (!_this.solvable) {
                    _this.speed = _this.randomValue(_this.speeds);
                    console.log('new speed: ' + _this.speed)
                }
            }
            _this.text.destroy()
            _this.labelDelay(_this.speed)


        }
    }
};

class Computer extends Player {
    constructor(location, group, color, sprite) {
        super(location, group, color, sprite);
        this.delay = 0
        // this.speeds = [2, 3, 4, 5, 6, 10, 12, 15, 30]
        this.speeds = [30, 15, 12, 10, 6, 5, 4, 3]
        this.speed = this.randomValue(this.speeds)
        this.labelSpeed(this.speed)
        computerSpeed = this.speeds.indexOf(this.speed)
    }
    fakeMove() {
        super.fakeMove()
        this.lever.toggleEnabled();
    }
    labelSpeed(label) {
        this.text.destroy()
        this.sprite.destroy()

        this.backplate = game.add.sprite(this.x - 132 + 18, this.y +14,'rectangle')
        this.backplate.scale.set(.35,.25)
        this.backplate.tint = this.color


        this.sprite = game.add.sprite(this.x - 128 + 18, this.y + 44,'minimouse')
        this.sprite.scale.set(1.3)

        this.flair = game.add.sprite(this.x - 128 + 18, this.y + 20,'speedometer')
        this.flair.scale.set(.8)

        this.text = game.add.text(this.x - 96 + 18, this.y + 18, "Speed:\n" + label + " m/s", {
            font: "18px PT Mono",
            fill: "#FFF",
            align: "left"
		});
    }
}

class Finish extends Phaser.Sprite {
    constructor(location, group) {
        super(game, location.x, location.y-64, 'finish');
        // game.physics.enable(this)
        // this.body.enable = true;
		// this.body.setSize(10, 64);
        game.add.existing(this)
        group.add(this)
    }
}

class Lever extends Phaser.Sprite {
    constructor(location, player) {
        location.y += 7
        location.x -= 128
        super(game, location.x, location.y+32, 'handle');
        this.slider = game.add.sprite(location.x, location.y-128, 'slider')
        // this.slider.tint = player.tint
        this.y -= 64;
        game.add.existing(this)
        game.world.bringToTop(this)

        if (game.level != 4 && game.level != 5 && game.level != 6)
        this.label = game.add.text(this.x + 3, this.y - 102, "Cat Throttle", {
            font: "12px PT Mono",
            fill: "white",
            align: "center"
		});

        this.increments = 128 / player.speeds.length

        // Controls
        this.inputEnabled = true;
        var _this = this.slider
        this.events.onInputUp.add(function(e){
            // solve for % of the input bounds
            var previous_speed = player.speed
            player.speed = player.speeds[10 - Math.floor((e.y - _this.y)/9)] // improve this
            e.updateText(player);
            if (game.level == 2 || game.level == 3 || game.level == 7) {
                posgraph.fullGraph()
                velgraph.fullGraph()
            }
            game.report('throttle_input', {
                    'previous_cat_speed': previous_speed,
                    'level': game.level,
                    'new_cat_speed': playertwo.speed,
                    'cat_delay': playertwo.delay,
                    'mouse_speed': playerone.speed,
                    'mouse_delay': playerone.delay,
                    'level_progress': game.progress,
                })
        })


        this.input.enableDrag();
        this.bounds = new Phaser.Rectangle(this.x, this.y - 92, 64, 127);
        this.input.boundsRect = this.bounds;
        if (debug) { leverBounds.push(this.bounds) }


        this.input.enableSnap(64, 9, true, true);


        if (game.level == 4) {
            while (playertwo.speed < playerone.speed) {
                console.log(playertwo.speed)
                playertwo.speed = playertwo.randomValue(playertwo.speeds)
                console.log(playertwo.speed)
            }
        }

        this.textcolor = '#fff'
        this.text = game.add.text(this.slider.x - 10, this.slider.y + 130, "Speed:\n " + player.speed + " m/s", {
            font: "28px PT Mono",
            fill: this.textcolor,
            align: "left"
		});
    }
    toggleEnabled() {
        if (game.level <= 3) {
            this.inputEnabled =! this.inputEnabled;
        }
        // if (this.lock == null) {
        //     this.lock = game.add.sprite(this.slider.x, this.slider.y+32, 'lock')
        //     this.lock.alpha = 0.6
        // }
    }
    updateText(player) {
        this.text.destroy();
        this.text = game.add.text(this.slider.x - 10, this.slider.y + 130, "Speed:\n " + player.speed + " m/s", {
            font: "28px PT Mono",
            fill: this.textcolor,
            align: "left"
		});
        if (game.level === 7) { this.text.visible = false; }
    }
};


class BetBox extends TextBox {
    constructor(x,y) {
        super(x, y, -25, 1.3, 0.5, "Make Your Bet!",{
            font: "18px PT Mono",
            align: "center",
            fill: "white",
        });
        this.tint = '0x0b4f6c'
        this.alpha = 0.7
        // this.scale.setTo(1.3, 0.4) //dims ~340x77

        this.text = new CenteredText(this, -5, "Tap to predict if your cat will arrive...", {
            font: "16px PT Mono",
            align: "center",
            fill: "white",
        })


        this.betButton = new BetButton(
            Math.round((this.left + this.right)/2),
            Math.round((this.top + this.bottom)/2) + 30
            );
        this.betButton.anchor.set(0.5)

        this.visible = false

    }
    check(comp,player) {
        this.betButton.check(comp,player)
    }
    showResult(comp,player) {
        this.betButton.showResult(comp,player)
    }
    toggleEnabled() {
        this.betButton.toggleEnabled()
    }

}


class BetButton extends Phaser.Sprite {
    constructor(x,y){
        super(game, x, y, 'bet');
        game.add.existing(this);
        this.xScale = 1.1
        this.scale.setTo(this.xScale, 0.5 )
        this.frame = 0
        this.inputEnabled = true;
        var _this = this
        this.events.onInputDown.add(function(e){
            // Get the position of the mouse and determine which box was clicked
            e.frame = Math.ceil((game.input.mousePointer.x - _this.left) / (_this.xScale * 64));
            console.log(e.frame)

            game.report("bet_chosen", {
                'level': game.level,
                'bet': ['too_soon','on_time','too_late'][e.frame - 1],

                })
            })

        this.style = {
                'font': '14px PT Mono',
                // align: "center",
            };



        this.boxone = game.add.text(this.x, this.y, "too soon", this.style)
        this.boxone.x = Math.ceil((this.left + this.right) / 2) - 128 - 64*this.xScale;
        // this.boxone.y = Math.ceil((this.top + this.bottom) / 2);
        this.boxone.anchor.set(0, .5)


        this.boxtwo = game.add.text((this.x + 64*this.xScale), this.y, "on time", this.style)
        this.boxtwo.x = Math.ceil((this.left + this.right) / 2) - 128;
        // this.boxtwo.y = Math.ceil((this.top + this.bottom) / 2);
        this.boxtwo.anchor.set(0, .5)

        this.boxthree = game.add.text(this.x + 128*this.xScale, this.y, "too late", this.style)
        this.boxthree.x = Math.ceil((this.left + this.right) / 2) - 128 + 64*this.xScale;
        // this.boxthree.y = Math.ceil((this.top + this.bottom) / 2);
        this.boxthree.anchor.set(0, .5)


        this.finished = false

    }
    check(comp,player) {
        // console.log(player.x)
        // console.log(comp.x)
        if ( playertwo.speed*(60  - playerone.speed * playertwo.delay) == 60 *playerone.speed ) { // on time
            game.ontime = true
            return 2; // the frame it should be
        } else if (player.speed*60/(60+player.speed*player.delay) < comp.speed) { // too slow
            game.slow = true
            return 3;
        } else { // too soon
            game.fast = true
            return 1;
        }
    }
    showResult(comp,player) {
        var label;
        console.log('test')
        if (!this.finished) {
            if (this.frame) {
                console.log('test2')
                this.feedbackFrame = game.add.sprite(this.x, this.y - 26, 'rectangle')
                this.feedbackFrame.anchor.set(.5)
                this.feedbackFrame.scale.setTo(this.xScale, 0.35 )

                this.style = {
                    'font': '23px PT Mono',
                };
                console.log(this.check(comp,player))
                if (this.frame == this.check(comp,player)) {
                    this.style.fill = "green";
                    label = "Yes! The cat was "
                    this.result = 'correct'
                } else {
                    this.style.fill = "red";
                    label = "No, the cat was "}
                    this.result = 'incorrect'
                if (game.ontime) {
                    label += 'on time.'
                    this.guess = 'on_time'
                } else if (game.slow) {
                    label += 'late.'
                    this.guess = 'too_slow'
                } else if (game.fast) {
                    label += 'early.'
                    this.guess = 'too_fast'
                }

                game.report('bet_results', {
                    'result': this.result,
                    'guess': this.guess,
                    'level': game.level,
                    'cat_speed': playertwo.speed,
                    'cat_delay': playertwo.delay,
                    'mouse_speed': playerone.speed,
                    'mouse_delay': playerone.delay,
                    'level_progress': game.progress,

                })

                this.label = game.add.text(this.x, this.y - 26, label, this.style)
                this.label.anchor.set(.5)



            }
            this.finished = true;
        }
    }
    toggleEnabled() {
        // if (this.lock == null) {
        //     this.lock = game.add.sprite(this.x + 64, this.y, 'lock')
        //     this.lock.alpha = 0.6
        // }
        this.inputEnabled =! this.inputEnabled;
    }
}

class Sign extends Phaser.Sprite {
    constructor(location, label){
        super(game,  location.x + 32, location.y - 54, 'sign');
        this.style = {
          'font': '20px PT Mono',
          'fill': 'white'
        };
        this.anchor.setTo(0.5, 0);
        this.label = new Phaser.Text(game, 0, 0, label, this.style);
        //puts the label in the center of the button
        this.label.anchor.setTo(0.5, -0.7);
        this.addChild(this.label);
        this.setLabel(label); //adds button to game
        game.add.existing(this);
        this.scale.set(1, .75)

        this.markerone = game.add.sprite(location.x, location.y, 'roadmarker')
        this.markertwo = game.add.sprite(location.x, location.y + 64, 'roadmarker')
    }
    setLabel(label) {
        this.label.setText(label);
    }
}

class Graph extends RGraph.Line {
    constructor(ylabel, playerone, playertwo, id) {

        var data = [new Array(30), new Array(30)]
        if (id == "posgraph") {
            var graphdata = [positionData(playerone), positionData(playertwo)];
            var stepped = false;
        } else if (id == "velgraph") {
            var graphdata = [velocityData(playerone), velocityData(playertwo)];
            var stepped = true;
            enableArrows()
        } else {};


        var line = super({
            id: id,
            data: data,
            options: {
                colors: ['#'+playerone.color.toString(16), '#'+playertwo.color.toString(16)],
                linewidth: 2,
                // colorsAlternate: true,
                // tickmarks: 'tick',
                shadow: false,
                adjustable: false,
                outofbounds: false,
                ylabelsCount: 6,
                // xlabelsCount: 6,
                backgroundColor: '#88c',
                labels: ['0', '10', '20', '30'],
                numxticks: 30,
                numyticks: 6,
                ymax: 60,
                ymin: 0,
                titleXaxis: "Time (s)",
                titleXaxisSize: 11,
                titleYaxis: ylabel,
                titleYaxisSize: 8,
                titleYaxisX: 5,
                gutterLeft: 30,
                stepped: stepped,
                backgroundGridAutofitNumhlines: 6,
                // numticks: 2
                // adjustable: true
            }
        })

        this.line = line
        this.id = id
        this.data = data
        this.graphdata = graphdata

        this.line.draw();


        function positionData(player) {
            var posdata = []
            for (var i = 0; i <= player.delay; i++) {
                posdata.push(0);
            }
            var position = 0
            for (var i = player.delay + 1; i <= 30; i++) {
                position += player.speed
                posdata.push(position);
                if (position >= 60) {
                    var arr = new Array(30-i);
                    // arr.fill(60)
                    posdata = posdata.concat(arr);
                    player.maxTime = i
                    i = 31;
                    // console.log(player.maxTime)
                    }
            }
            return posdata;
        }
        this.positionData = positionData
        function velocityData(player) {
            var veldata = []
            for (var i = 0; i < player.delay; i++) {
                veldata.push(0);
            }
            // for (var i = player.delay; i <= 30; i++) {
            //     veldata.push(player.speed);
            // }

            for (var i = player.delay; i <= player.maxTime; i++) {
                veldata.push(player.speed);
            }
            for (var i = player.maxTime; i <= 30; i++) {
                veldata.push(null);
            }

            return veldata;
        }
        this.velocityData = velocityData
        this.counter = 0

        function enableArrows() {

        }

    }

    fullGraph() {
        if (this.id == "posgraph") {
            if (game.level  == 7) {
                this.graphdata = [new Array(30),
                this.positionData(playertwo),];
            } else {
                this.graphdata = [this.positionData(playerone),
                this.positionData(playertwo)];
            }
        }
        else if (this.id == "velgraph") {
            this.graphdata = [this.velocityData(playerone),
            this.velocityData(playertwo)];
        } else { console.log('graph error') };

        if (game.level != 3 && game.level != 4) {
            this.line.original_data[0] = this.graphdata[0]
            this.line.original_data[1] = this.graphdata[1]
            this.redraw()
        } else {
            this.line.original_data[0] = new Array(30)
            this.line.original_data[1] = new Array(30)
            this.redraw()
        }
    }

    liveGraph() {
        this.updateLine(); // once for t=0
        this.updateLine(); // once because setinterval doesn't fire until the delay
        this.plotter = setInterval(this.updateLine.bind(this), 1000)
        }

    updateLine() {
            if (this.counter <= 30) {
                this.line.original_data[0][this.counter] = this.graphdata[0][this.counter]
                this.line.original_data[1][this.counter] = this.graphdata[1][this.counter]
                this.redraw()
                this.counter++;
            }
        }


    redraw() {
            RGraph.clear(this.line.canvas)
            this.line.draw()
        }

     resetGraph() {
        clearInterval(this.plotter)
        RGraph.clear(this.line.canvas)

    }
}

class GraphControl extends Phaser.Sprite {
    constructor(x,y){
        super(game, x, y, 'arrows');
        game.add.existing(this);

        this.inputEnabled = true;
        var _this = this
        this.events.onInputDown.add(function(e){
            // Get the position of the mouse and determine which arrow was clicked
            var arrow = Math.floor((game.input.mousePointer.y - y) / 64);
            if (arrow) {
                _this.index = playertwo.speeds.indexOf(playertwo.speed)
                playertwo.speed = playertwo.speeds[(((_this.index - 1) % playertwo.speeds.length) + playertwo.speeds.length) % playertwo.speeds.length ]
            } else {
                _this.index = playertwo.speeds.indexOf(playertwo.speed)
                playertwo.speed = playertwo.speeds[(_this.index + 1) % playertwo.speeds.length ]
            }

            velgraph.fullGraph()
            posgraph.fullGraph()
            playertwo.lever.updateText(playertwo)
        })
    }
}


class LevelIndicator {
    constructor(x,y) {

        this.text = new TextBox(x,y, -20, 0.9, 0.5, "Level: " + game.level, {
                font: "18px PT Mono",
                fill: "#ffffff",
            })
        this.text.visible = false;
        this.text.tint = '0x0b4f6c'
        this.text.alpha = 0.7

        this.button = new TextBox(
            Math.ceil((this.text.left + this.text.right)/2),
            Math.ceil((this.text.top + this.text.bottom)/2)+10,
            1, .6,.1, 'Change Your Level', {
            font: '14px PT Mono',
            fill: '#1AF',
            });
        this.button.tint = '0x0b4f6c'
        this.button.alpha = 0.7

        this.button.text.text.inputEnabled = true;
        this.button.text.text.events.onInputUp.add(function () {
            posgraph.resetGraph()
            velgraph.resetGraph()
            playerone.resetDelay()
            playertwo.resetDelay()
            clearInterval(promptBox.wiggler)
            game.progress = 0
            if (game.level == 6) { document.getElementById('velgraph-ctr').style="position:absolute; left:0px;"}
            document.getElementById('graphs').style.display = "none"
            game.state.start("LevelSelect");
        });
    }
}


class ProgressIndicator extends Phaser.Sprite {
    constructor(x,y){
        super(game,x,y,'stars');
        game.add.existing(this);

        if (typeof game.progress === 'undefined') {
            game.progress = 0
        }

        this.scale.set(.5)

        this.frame = game.progress
        this.finished = false
    }

    updateProgress() {
        if (!this.finished) {
            var _this = this
            if (game.progress < 2) {
                game.progress++
                this.frame = game.progress
                this.flipper = -1
                this.blink = setInterval(function(){
                    _this.frame += _this.flipper
                    _this.flipper *= -1
                }, 150)
                setTimeout(function(){
                    clearInterval(_this.blink)
                    _this.frame = game.progress
                }, 1500)


            } else {
                this.frame = 3
                game.progress = 0
                // if (game.level >= 7) {

                // } else {
                    game.level++
                // }

            }
            promptBox.updatePrompt()
            this.finished = true;
        }

    }

}

class Legend {
    constructor(x,y){
        this.minimouse = game.add.sprite(x, y, 'minimouse')
        this.minimouse.scale.set(1.3)
        this.mouseline = this.draw(x + 30, y, '#544', false)

        this.minicat = game.add.sprite(x, y+30,'minicat')
        this.minicat.scale.set(1.3)
        this.catline = this.draw(x + 30, y + 30, '#ADD8E6', true)

    }
    toggleHide() {
        this.minicat.visible = !this.minicat.visible
        this.catline.visible = !this.catline.visible
        this.minimouse.visible = !this.minimouse.visible
        this.mouseline.visible = !this.mouseline.visible

    }
    draw(x, y, color, dashed) {
          var bmd = game.add.bitmapData(30,30);
          bmd.ctx.beginPath();
          bmd.ctx.lineWidth = "2";
          bmd.ctx.strokeStyle = color;
          if (dashed) {bmd.ctx.setLineDash([3])}
          bmd.ctx.moveTo(0, 15);
          bmd.ctx.lineTo(30 , 15);
          bmd.ctx.stroke();
          bmd.ctx.closePath();
          return game.add.sprite(x, y, bmd);
    }
}

class Prompt extends TextBox{
    constructor(x,y) {
        super(x,y, 0, 3, .5, game.prompt[game.level], {
          'font': '20px PT Mono',
          'fill': 'white',
          'wordWrap': true,
          'wordWrapWidth': 620,
        })
        this.tint = '0x0b4f6c'

        this.makeGoButton(x,y)
        // this.replay_button = new LabelButton(game, 200, 150, 'buttons', "Replay",  this.resetGame, this, 2, 1, 0)


        this.indicator = new ProgressIndicator(x+245,y+25)
        this.indicator.visible = false

    }
    doBtnStartHandler() {  //when the game starts
        if (game.level == 3 || game.level == 4) {
            document.getElementById('graphs').style.display = "inline";
            legend.toggleHide()
            posgraph.liveGraph()
            velgraph.liveGraph()
        }
		playerone.fakeMove();
        playertwo.fakeMove();
        betButton.inputEnabled = false;
        betButton.toggleEnabled()
        console.log(this.wiggler)
        clearInterval(this.wiggler)
		this.go_button.visible = false;
	}

    makeGoButton(x,y) {
        // if (this.text.lines.length == 1 ) {
        //     this.goXScale = this.text.lines[0].length/70
        // } else {
        //     this.text.lines = this.text.lines.sort(function(a, b){
        //         return a.length - b.length;
        //     });
        //     this.goXScale = this.text.lines[0].length/this.text.lines[this.text.lines.length - 1].length
        // }
        // console.log(this.text.lines)
        // if (this.text.lines.length)
        // y += 10 * (this.text.lines.length - 1)
        this.go_button = new LabelButton(game, this.centerX, y+37, 'buttons', "Go!", this.doBtnStartHandler, this, 2, 1, 0); // button frames 1=over, 0=off, 2=down
        this.go_button.scale.set(.7)
        // this.go_button.x = this.left + this.width*this.goXScale + 10
        // this.go_button.x += (this.centerX - this.go_button.x)*.05
        // if (this.go_button.x < this.centerX ) { this.go_button.x *= 1.5}
        this.wiggle()
    }
    wiggle() {
        var _this = this
            // console.log(this)
        _this.angleIncrement = .15
        _this.angleValue = 0
        _this.wiggler = setInterval(function(){
                _this.angleValue += _this.angleIncrement
                promptBox.go_button.angle = _this.angleValue
                if (promptBox.go_button.angle > 2.5) {
                _this.angleIncrement *= -1
                } else if (promptBox.go_button.angle < -2.5) {
                    _this.angleIncrement *= -1
                }

            }, 50)

    }



    nextGame() {

        if (game.level >= 8) {
            document.getElementById('graphs').style.display = "none";
            game.state.start("Ending");
        } else {
            posgraph.resetGraph()
            velgraph.resetGraph()
            playerone.resetDelay()
            playertwo.resetDelay()
            // this.indicator.finished = false;
            game.ontime = null
            game.slow = null
            game.fast = null
            game.state.restart(true, false)
        }
    }

    resetGame() { //reset delay too asdf
        this.reset_button.visible = false

        this.indicator.visible = false

        resetPlayer(playerone)
        resetPlayer(playertwo)

        posgraph.counter = 0
        clearInterval(posgraph.plotter)
        velgraph.counter = 0
        clearInterval(velgraph.plotter)

        betButton.finished = false;
        betButton.betButton.inputEnabled = true;
        betButton.betButton.finished = false;
        this.alsofinished = false
        if (betButton.betButton.label != null) {
            betButton.betButton.label.destroy()
            betButton.betButton.feedbackFrame.destroy()
        }

        game.ontime = null
        game.slow = null
        game.fast = null

        promptBox.text.text.destroy()


        if (game.level < 4) { playertwo.lever.inputEnabled = true }

        if (game.level != 4) {
            playertwo.text.destroy()
            playertwo.text = game.add.text(playertwo.x - 96 + 18, playertwo.y + 16, "Delay:\n" + playertwo.delay + " s", {
                font: "18px PT Mono",
                fill: "#000",
                align: "left"
            });
        }

        if (game.level == 3) {
            document.getElementById('graphs').style.display = "none";
            legend.toggleHide()


        }


        this.text = new CenteredText(this, 0, game.prompt[game.level], {
          'font': '20px PT Mono',
          'fill': 'white',
          'wordWrap': true,
        })
        clearInterval(promptBox.wiggler)
        this.makeGoButton(this.x,this.y)



        function resetPlayer(player) {
            player.animations.stop(null, true);
            // player.body.velocity.x = 0;
            clearInterval(player.motion)
            player.resetDelay()
            player.x = 113
        }

    }

    blinkIndicator() {
        var _this = this
        _this.blink = setInterval(function(){
                _this.indicator.visible =! _this.indicator.visible;
            }, 500)

    }

    updatePrompt() {

        if (!this.alsofinished) {
            this.text.text.destroy()
            // this.go_button.visibile = false

            if (game.ontime) {
                this.feedback = 'You caught the mouse!'
                this.next_button = new LabelButton(game, this.x+100, this.y + 30, 'buttons', "Next Level", this.nextGame, this, 2, 1, 0);
                this.next_button.scale.set(.7)
                this.result = 'correct'
            } else {
                this.feedback = 'Hmmm…the Cat didn’t finish at the same time as the mouse. Try again. Click'
                this.reset_button = new LabelButton(game, this.x+100, this.y + 30, 'buttons', "Reset", this.resetGame, this, 2, 1, 0);
                this.reset_button.scale.set(.7)
                this.result = 'incorrect'
            }

            game.report('go_click_result', {
                    'result': this.result,
                    'level': game.level,
                    'cat_speed': playertwo.speed,
                    'cat_delay': playertwo.delay,
                    'mouse_speed': playerone.speed,
                    'mouse_delay': playerone.delay,
                    'level_progress': game.progress,
                })

            this.text = new CenteredText(this, 0, this.feedback, {
            'font': '20px PT Mono',
            'fill': 'white',
            'wordWrap': true,
            })

            if (game.progress == 0 && promptBox.indicator.frame == 0) {

            } else {
                this.indicator.visible = true
            }

        }
        this.alsofinished = true


    }
}


class DelayController extends TextBox {
    constructor(x,y) {
        super(x,y, -15, .45, .35, 'Cat Delay Controller', {
          'font': '15px PT Mono',
          'fill': 'white',
          'wordWrap': true,
        })
        this.tint = '0xc04a6c'
        this.minicat = game.add.sprite(x+30, y-40, 'minicat')
        // this.hourglass = game.add.sprite(x-50, y-40,'hourglass')
        // this.hourglass.scale.set(.5)

        this.delayDisplay = new TextBox(x,y+15, 0, .2, .1,  playertwo.delay + ' sec', {
          'font': '17px PT Mono',
          'fill': 'white',
          'wordWrap': false,
        })
        this.delayDisplay.tint = '0xc0f06d'

        this.minus = game.add.sprite(x-40,y + 15,'minus')
        this.minus.anchor.set(.5)
        this.minus.scale.set(.8)
        this.plus = game.add.sprite(x+40,y + 15,'plus')
        this.plus.anchor.set(.5)
        this.plus.scale.set(.8)

        var _this = this
        this.minus.inputEnabled = true;
        this.plus.inputEnabled = true

        this.plus.events.onInputUp.add(function(){
            playertwo.index = playertwo.delays.indexOf(playertwo.delay)
            if (playertwo.delay == playertwo.delays[playertwo.delays.length - 1]) {
                
            } else {
                playertwo.delay = playertwo.delays[(playertwo.index + 1) % playertwo.delays.length ]
            }
            _this.delayDisplay.text.text.destroy()
            _this.delayDisplay.text = new CenteredText(_this.delayDisplay, 0, playertwo.delay + ' sec', {
                'font': '17px PT Mono',
                'fill': 'white',
                'wordWrap': false,
            })
            posgraph.fullGraph()
            velgraph.fullGraph()
        })

        this.minus.events.onInputUp.add(function(){
            playertwo.index = playertwo.delays.indexOf(playertwo.delay)
            if (playertwo.delay == playertwo.delays[0]) {

            } else {
                playertwo.delay = playertwo.delays[(playertwo.index - 1) % playertwo.delays.length ]
            }
            _this.delayDisplay.text.text.destroy()
            _this.delayDisplay.text = new CenteredText(_this.delayDisplay, 0, playertwo.delay + ' sec', {
                'font': '17px PT Mono',
                'fill': 'white',
                'wordWrap': false,
            })
        })

        // this.sprite = game.add.sprite(playertwo.x - 105, playertwo.y + 16,'minicat')
        // this.sprite.scale.set(1.3)
        this.text = game.add.text(playertwo.x - 80, playertwo.y + 18, "Speed:\n" + playertwo.speed + " m/s", {
            font: "18px PT Mono",
            fill: "#FFF",
            align: "left"
		});


     }
}



class Pointer extends Phaser.Sprite {
    constructor(obj) {
        super(game,obj.x,obj.y-100,'pointer');
        game.add.existing(this);
        this.anchor.set(.5)
        this.angle = -30;
        game.world.bringToTop(this)


        this.getAttention()

        var _this=this;
        playLevel.input.onDown.add(function () {
                clearInterval(_this.blink)
                clearInterval(_this.grow)
                _this.destroy()
            }, playLevel)

    }

    getAttention() {
        var _this = this
        // _this.blink = setInterval(function(){
        //         _this.visible = !_this.visible;
        //     }, 500)

        _this.scaleIncrement = .01
        _this.scaleValue = 1
        _this.grow = setInterval(function(){
            // console.log(_this.scale)
                _this.scaleValue += _this.scaleIncrement
                _this.scale.set(_this.scaleValue)
                if (_this.scale.x > 1.05) {
                   _this.scaleIncrement *= -1
                } else if (_this.scale.x < 0.95) {
                    _this.scaleIncrement *= -1
                }
            }, 50)

    }

}

