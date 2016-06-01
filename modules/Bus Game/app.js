var w = 800, h = 600;
// var game = new Phaser.Game(w, h, Phaser.CANVAS, '',{preload:preload, create:create, update:update, render:render});
var debug = true;


var game = new Phaser.Game(w, h, Phaser.AUTO, '');

// game.state.add("Loading", loading);
// game.state.add("LevelSelect", levelSelect);
// game.state.add("PlayLevel", playLevel);

// game.state.start("Loading");
var player, gem, gems, flags, button; //,buttonsprite;
var collided = false;
var timer;
var winstate = '';
var levelcomplete = false;
var level = 1;
var mygame;
var map;
var totalTicks = 13;
var baseHour = 8;
var baseMin = 0;
var clock = new Date()
var levels = 5;


loading = {
    init: function() {
        
    },
  
    preload: function() {
        game.loadJSONTilemap = function(url) {
            var request = new XMLHttpRequest();
            request.open('GET', url, false);  // `false` makes the request synchronous
            request.send(null);
            if (request.status === 200) {
              game.load.tilemap('MyTileMap1a', null, request.responseText, Phaser.Tilemap.TILED_JSON);
            }
        }
        game.loadJSONTilemap('assets/traintrack1a.json') // workaround to fix phaser bug
        game.load.image('tracks', 'assets/tracks.png');  //track image
        game.load.spritesheet('bus', 'assets/bus.png', 64, 64);
        game.load.spritesheet('gems', 'assets/gems2.png', 64, 64, 9);
        game.load.spritesheet('goats', 'assets/goat.png', 64, 64);
        game.load.spritesheet('busStops', 'assets/stop.png', 64, 64);
        game.load.spritesheet('10km', 'assets/10km.png', 64, 64);
        game.load.spritesheet('buttons', 'assets/buttons.png', 150, 48, 3); 
        game.load.spritesheet('green_check', 'assets/green_check.png', 64, 64);
        game.load.spritesheet('red_x', 'assets/red_x.png', 64, 64);
        game.load.image('menu', 'assets/number-buttons-90x90.png', 270, 180);
        if (debug) { game.time.advancedTiming = true; }
        
        game.state.start("LevelSelect");
    }
      
};



levelSelect = {
    create: function() {
        // Create a label to use as a button
        menu_button = game.add.text(640, 20, 'MENU', { font: '24px Arial', fill: '#1AF' });
        menu_button.inputEnabled = true;
        menu_button.events.onInputUp.add(function () {
            // When the paus button is pressed, we pause the game
            game.paused = true;
    
            // Then add the menu
            menu = game.add.sprite(w/2, h/2, 'menu');
            menu.anchor.setTo(0.5, 0.5);
    
            // And a label to illustrate which menu item was chosen. (This is not necessary)
            choiseLabel = game.add.text(w/2, h-150, 'Click outside menu to continue', { font: '30px Arial', fill: '#fff' });
            choiseLabel.anchor.setTo(0.5, 0.5);
        });
    
        // Add a input listener that can help us return from being paused
        game.input.onDown.add(unpause, self);
        
        // And finally the method that handels the pause menu
        function unpause(event){
            // Only act if paused
            if(game.paused){
                game.state.start("PlayLevel");
                // Calculate the corners of the menu
                var x1 = w/2 - 270/2, x2 = w/2 + 270/2,
                    y1 = h/2 - 180/2, y2 = h/2 + 180/2;
    
                // Check if the click was inside the menu
                if(event.x > x1 && event.x < x2 && event.y > y1 && event.y < y2 ){
                    // The choicemap is an array that will help us see which item was clicked
                    var choisemap = ['one', 'two', 'three', 'four', 'five', 'six'];
    
                    // Get menu local coordinates for the click
                    var x = event.x - x1,
                        y = event.y - y1;
    
                    // Calculate the choice 
                    var choise = Math.floor(x / 90) + 3*Math.floor(y / 90);

                    // Display the choice
                    choiseLabel.text = 'You chose menu item: ' + choisemap[choise];
                    
                }
                else{
                    // Remove the menu and the label
                    menu.destroy();
                    choiseLabel.destroy();
    
                    // Unpause the game
                    game.paused = false;
                    
                    
                }
            }
        };
    },
    
};


playLevel = {
    create: function() {
            game.physics.startSystem(Phaser.Physics.ARCADE);
            map = game.add.tilemap('MyTileMap1a');
            map.addTilesetImage('tracks', 'tracks'); 
            map.addTilesetImage('bus', 'bus');
            map.addTilesetImage('buttons', 'buttons');
                
            timer = game.time.create();
            layer = map.createLayer('RoadTiles');
            layer.resizeWorld();
            if (debug) { layer.debug = true; }
            
            
            setupGraph();
            setupClock(baseHour, baseMin);
            
            busStops = game.add.group();
            result = findObjectsByType('busStop', map, 'Stops');  //find the stops and setup
            result.forEach(function(element) {
              createStopFromTiledObject(element, busStops);
            }, this);  
              
            result = findObjectsByType('goat', map, 'Objects');  //setup the goat
            goat = game.add.sprite(result[0].x, result[0].y, 'goats', 8);
            copyProperties(result[0], goat);
            goat.y -= goat._frame.height;
            game.physics.enable(goat);
            goat.body.setSize(64, 64);
            
            distanceMarkers = game.add.group();
            result = findObjectsByType('10km', map, 'Objects'); 
            result.forEach(function(element) {
                marker = game.add.sprite(element.x, element.y, '10km');
                marker.y -= marker._frame.height;
            }, this);
            
            result = findObjectsByType('bus', map, 'Objects');  //setup the bus
            player = game.add.sprite(result[0].x+3, result[0].y - 14, 'bus', 8);
            player.y -= player._frame.height;
            player.speed = 1.0; //should get from tiled insaread
            
            game.physics.enable(player);
            player.body.setSize(5,32, -2, 32);  //body surrounds bus and used for collisions, setSize(width, height, offsetX, offsetY)
                
            //put the start game button out
            button = new LabelButton(game, 150, 220, 'buttons', "Start game!", doBtnStartHandler, this, 2, 1, 0); // button frames 1=over, 0=off, 2=down
            
            // sample text
            textBox = this.game.add.text(0, 0, "Text Here:\nPlz press the start button to begin the game. The quick brown fox jumps over the lazy dog. This is called a pangram." , {
              font: "20px Arial",
              fill: "#ffffff",
              align: "left",
              fill: "black",
              backgroundColor: "white",
              wordWrap: true,
              wordWrapWidth: 300,
            });
            textBox.setTextBounds(60, 350, 300, 20); // text location
        
            var area
            var index = 0;
            plotPoint = function() {
                velocity_chart.series[0].addPoint([index*5,velocity_chart.series[1].points[index].y], false);
                if (index == 0) {
                  area = 0 
                  } else {
                    area = ( velocity_chart.series[1].points[index].y * 5 )/60 + area
                  }
                position_chart.series[0].addPoint([index*5,area], false);
                if (index < totalTicks) {      
                    player.body.velocity.x = (64 / (60)) * parseInt(velocity_chart.series[1].points[index].y);
                    // console.log("running")
                    clock.setMinutes(clock.getMinutes() + 5);
                    clockDisplay.text = clock.toLocaleTimeString(navigator.language, {hour: '2-digit', minute:'2-digit'})
                    index++;
                } else {
                    
                    console.log("end_of_game")
                    player.body.velocity.x = 0;
                }
                
            };
          
            updatechart = function() {
                velocity_chart.redraw();
                position_chart.redraw();
            };
    },
    
    
    update: function() {
        //set up the possible collisions types - this uses groups
        game.physics.arcade.overlap(player, busStops, stopcollide, stopprocess, this);
        game.physics.arcade.overlap(player, goat, goatcollide, goatprocess, this);
        
        function stopcollide() {  //not used - passed along to process instead
        }
        function stopprocess(player, busStop) {        
            if (checktime(clock.valueOf(), busStop.arriveTime.time.valueOf())) {
              busStop.arriveTime.onTime = true;
            } else {
              // busStop.arriveTime.onTime = false;
            }
            if (checktime(clock.valueOf(), busStop.leaveTime.time.valueOf() + 5*60*1000)) {
              busStop.leaveTime.onTime = true;
            } else {
              // busStop.leaveTime.onTime = false;
            }
            if (busStop.arriveTime.onTime && busStop.leaveTime.onTime) {
              game.add.sprite(busStop.x, busStop.y, "green_check")
            } else {
              // if (!busStop.leaveTime.onTime) {
                game.add.sprite(busStop.x, busStop.y, "red_x")
            }
        }
        
        function goatcollide() {  //not used - passed along to process instead
        }
        function goatprocess(player, goat) {
          if (player.body.velocity.x < goat.max_velocity 
            && player.body.velocity.x > goat.min_velocity ) {
            
            game.add.sprite(goat.x, goat.y, "green_check")
          }
          else {
            console.log('player body: ' + player.body.velocity.x )
            console.log( 'goat min: ' + goat.min_velocity )
            console.log( 'goat max: ' + goat.max_velocity )
            game.add.sprite(goat.x, goat.y, "red_x") 
        }
        }
        function checktime(a,b) {
            var threshold = 1000;
            return Math.abs(a - b) < threshold;
        }
          
    }
};

function doBtnStartHandler() {  //when the button is started.  
    timer.removeAll();
    timer.start();
      //set the player going.  this might need to be in parameters in stead
    timer.repeat(1000, totalTicks + 1, plotPoint, this);  //set a timer for plotting points
    timer.repeat(1000, 100, updatechart, this);  //set a timer for updating the chart not every point
    button.visible = false;
}
    
findObjectsByType = function(type, map, layer) {
    var result = new Array();
    this.map.objects[layer].forEach(function(element) {
        if (element.type === type) {
            //PUt all of the specifed objects in an array.
            //Phaser uses top left, Tiled bottom left so we have to adjust
            //so they might not be placed in the exact position as in Tiled
            result.push(element);
        }
    });
    return result;
};

createStopFromTiledObject = function(element, group) {
    busStop = this.game.add.sprite(element.x, element.y, 'busStops');
    busStop.y -= busStop._frame.height;
    this.game.physics.enable(busStop);
  
    copyProperties(element, busStop);
    //copy all properties to the sprite rewrote to new function
    // Object.keys(element.properties).forEach(function(key) {
    //   busStop[key] = element.properties[key];
    // });
    
    busStop.collided = false;  //only allow flags to collide once - check manually.  
    busStop.body.enable = true;
    busStop.body.setSize(3, 64, 0, 64);
  
    
    // label the stop according to arrival time.
    busStop.arriveTime = new TimeEvent(busStop.arrivalTime);
    busStop.leaveTime = new TimeEvent(parseInt(busStop.arrivalTime) + parseInt(busStop.waitTime));
    busStopText = this.game.add.text(0, 0, busStop.arriveTime.clockTime + "\nWait: " + busStop.waitTime + "mins", {
      font: "18px Arial",
      fill: "#ffffff",
      align: "left"
    });
    busStop.addChild(busStopText);
    busStopText.x = (busStop.width - busStopText.width) / 2;
    busStopText.y = (busStop.height - busStopText.height) / 2 - 64;
  
    group.add(busStop);  // easier to set properties on
};

var copyProperties = function(from, to) {
    //copy all properties to the sprite
    Object.keys(from.properties).forEach(function(key) {
      to[key] = from.properties[key];
    });
}

var LabelButton = function(game, x, y, key, label, callback, callbackContext, overFrame, outFrame, downFrame, upFrame) {
  Phaser.Button.call(this, game, x, y, key, callback, callbackContext, overFrame, outFrame, downFrame, upFrame);
  this.style = {
    'font': '20px Arial',
    'fill': 'white'
  };
  this.anchor.setTo(0.5, 0.5);
  this.label = new Phaser.Text(game, 0, 0, label, this.style);
  //puts the label in the center of the button    
  this.label.anchor.setTo(0.5, 0.5);
  this.addChild(this.label);
  this.setLabel(label); //adds button to game    
  game.add.existing(this);
};

LabelButton.prototype = Object.create(Phaser.Button.prototype);
LabelButton.prototype.constructor = LabelButton;
LabelButton.prototype.setLabel = function(label) {
  this.label.setText(label);
};

function setupGraph(){
  var velocity_options = {  //this is for options for the graph - some style specified in html
    chart: {
      renderTo: 'velocity-graph-1',
      defaultSeriesType: 'line'
    },
    title: {
      text: 'Velocity vs Time'
    },
    yAxis: {
      title: {
        text: 'Velocity (km/h)'
      },
      min: 0,
      max: 120,
      tickInterval: 10
    },
    xAxis: {
      title: {
        text: 'Time (min)'
      },
    },
    series: [{
      showInLegend: false,   
      data: [],
      color: '#0000FF',
      step: 'center',
      marker: {
        enabled: true
        },
      lineWidth: 2
    }, {
      showInLegend: false,   
      data: [],
      marker: {
        enabled: true
      },
      lineWidth: 2,
      draggableY: true, // I modified the draggable points library (newY = Math.round(newY)) so it snaps to nearest int
      dragMaxY: 120,
      dragMinY: 0,
      step: 'center',
      point : { 
        events: {
          // drag : function(e) {
          //   },
          drop : function(e) {  
            }
        }  
      }
    }]

  };
  var position_options = {  //this is for options for the graph - some style specified in html
    chart: {
      renderTo: 'velocity-graph-2',
      defaultSeriesType: 'line'
    },
    title: {
      text: 'Position vs Time'
    },
    yAxis: {
      title: {
        text: 'Position (km)'
      },
      min: 0,
      max: ((120/60) * 5 * totalTicks)/3, // max speed of * 5 min intervals * n intervals
      tickInterval: 10
    },
    xAxis: {
      title: {
        text: 'Time (min)'
      },
    },
    series: [{
      showInLegend: false,   
      data: [],
      color: '#0000FF',
      // step: 'center',
      marker: {
        enabled: true
        },
      lineWidth: 2
    }]

  };

  velocity_chart = new Highcharts.Chart(velocity_options);
  position_chart = new Highcharts.Chart(position_options);
  velocity_chart.series[0].data = [];
  velocity_chart.series[0].data.length = 0;
  position_chart.series[0].data = [];
  position_chart.series[0].data.length = 0;
  for (var i = 0; i <= (totalTicks); i++) {
    velocity_chart.series[1].addPoint([i*5,30]) // intervals of 5, default value 30
  }
  position_chart.series[0].addPoint([0,0])
  position_chart.series[0].addPoint([totalTicks*5,0])
}

function render() {
    if (debug) { 
        game.debug.bodyInfo(player)
        game.debug.body(player)
        game.debug.body(goat)
        busStops.forEachAlive(renderGroup, this);
        game.debug.text(game.time.fps || '--', 2, 14, "#00ff00");
    }
}
function renderGroup(member) {
    game.debug.body(member);
}


function setupClock(baseHour, baseMin) {
    clock.setHours(baseHour, baseMin, 0, 0);
    currentTime = clock.toLocaleTimeString(navigator.language, {hour: '2-digit', minute:'2-digit'});

    clockDisplay = this.game.add.text(0, 0, currentTime , {
      font: "24px Arial",
      fill: "#ffffff",
      align: "left",
      fill: "red",
    });
    clockDisplay.setTextBounds(250, 220, 100, 20); // clock location
}


class TimeEvent {
  constructor(endTime) {
    this.time = new Date()
    this.time.setHours(baseHour, baseMin, 0, 0)
    this.time.setMinutes(Number(endTime));
    this.clockTime = this.time.toLocaleTimeString(navigator.language, {hour: '2-digit', minute:'2-digit'})
    this.onTime = false;
  }
}




game.state.add("Loading", loading);
game.state.add("LevelSelect", levelSelect);
game.state.add("PlayLevel", playLevel);
game.state.start("Loading");