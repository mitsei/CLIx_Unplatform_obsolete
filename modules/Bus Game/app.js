var game = new Phaser.Game(800, 600, Phaser.CANVAS, '',{preload:preload, create:create, update:update, render:render});

function preload() {
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
    game.load.spritesheet('train64', 'assets/bus.png', 64, 64);
    game.load.spritesheet('gems', 'assets/gems2.png', 64, 64, 9);
    // game.load.spritesheet('flags', 'assets/flags.png', 64, 64, 4);
    game.load.spritesheet('goats', 'assets/goat.png', 64, 64);
    game.load.spritesheet('busStops', 'assets/stop.png', 64, 64);
    game.load.spritesheet('10km', 'assets/10km.png', 64, 64);
    game.load.spritesheet('buttons', 'assets/buttons.png', 150, 48, 3); 
    game.load.spritesheet('green_check', 'assets/green_check.png', 64, 64);
}

var player, gem, gems, flags, button; //,buttonsprite;
var collided = false;
var timer;
var winstate = '';
var levelcomplete = false;
var level = 1;
var mygame;
var chart;
var map;
var totalTicks = 12;
var baseHour = 8;
var baseMin = 0;
var startTime = new Date()
var clock = new Date()
var stationTime = new Date()

function create() {
    game.physics.startSystem(Phaser.Physics.ARCADE);
    map = game.add.tilemap('MyTileMap1a');
    map.addTilesetImage('tracks', 'tracks'); 
    map.addTilesetImage('train64', 'train64');
    map.addTilesetImage('buttons', 'buttons');
    
    startTime.setHours(baseHour, baseMin, 0, 0);
    clock.setHours(baseHour, baseMin, 0, 0);
    stationTime.setHours(baseHour, baseMin, 0, 0);
    
    timer = game.time.create();
    layer = map.createLayer('RoadTiles');
    //layer.resizeWorld();
    // layer.dirty = true;
    layer.debug = true;
    setupGraph();
    
    busStops = game.add.group();
    result = findObjectsByType('busStop', map, 'Stops');  //find the stops and setup
    result.forEach(function(element) {
      createStopFromTiledObject(element, busStops);
    }, this);  
      
    result = findObjectsByType('goat', map, 'Objects');  //setup the goat
    goat = game.add.sprite(result[0].x, result[0].y, 'goats', 8);
    goat.y -= goat._frame.height;
    game.physics.enable(goat);
    goat.body.setSize(64, 64);
    
    distanceMarkers = game.add.group();
    result = findObjectsByType('10km', map, 'Objects'); 
    result.forEach(function(element) {
        console.log('asdf')
        marker = game.add.sprite(element.x, element.y, '10km');
        marker.y -= marker._frame.height;
    }, this); 

    
    result = findObjectsByType('train', map, 'Objects');  //setup the bus
    player = game.add.sprite(result[0].x, result[0].y - 14, 'train64', 8);
    player.y -= player._frame.height;
    player.speed = 1.0; //should get from tiled insaread
    
    game.physics.enable(player);
    player.body.setSize(1,1, -1, 32);  //body surrounds train and used for collisions, setSize(width, height, offsetX, offsetY)
        
    //put the start game button out
    button = new LabelButton(game, 100, 64, 'buttons', "Start game!", doBtnStartHandler, this, 2, 1, 0); // button frames 1=over, 0=off, 2=down
    
   
    currentTime = clock.toLocaleTimeString(navigator.language, {hour: '2-digit', minute:'2-digit'});
    clockDisplay = this.game.add.text(0, 0, "Current Time\n   " + currentTime , {
      font: "24px Arial",
      fill: "#ffffff",
      align: "left",
      fill: "red",
      // backgroundColor: "green",
    });
    clockDisplay.setTextBounds(450, 100, 100, 20);
    console.log(currentTime)
    
    var index = 0;
    plotPoint = function() {
        chart.series[0].addPoint([index*5,chart.series[1].points[index].y], false);
        if (index < totalTicks) {
            
            // player.body.velocity.x = 64            
            player.body.velocity.x = (64 / (30)) * parseInt(chart.series[1].points[index].y);
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
        chart.redraw();
    };
  
};
    


function update() {
    
    
      //set up the possible collisions types - this uses groups
    // game.physics.arcade.collide(player, layer);
  
    // game.physics.arcade.collide(player, gems, gemcollide, gemprocess, this);
  
    // game.physics.arcade.collide(player, busStops, stopcollide, stopprocess, this);
    // player.body.collides(busStops, atStop, this);
    game.physics.arcade.overlap(player, busStops, stopcollide, stopprocess, this);
    
    function stopcollide() {  //not used - passed along to process instead
      
    }
    
    function stopprocess(player, busStop) {
      console.log(busStop.arrivalTime) 
      
      if (clockDisplay.text == busStop.clockArrivalTime) {
        console.log("true")
        game.add.sprite(busStop.x, busStop.y, "green_check")
      }
      
      
      }
    //   //this section determines success of the level
    //   //it contains a lot of tesxt that needs to be internationalized.  
    //   console.log('flagprocess')
    //   gamefail = false;
    //   if (flag.collided === false) {
    //     if (parseInt(flag.time) !== 0) {  //this is a time flag
    //       if (parseInt(flag.time) > 0) {  //and it is one that needs to be greater than a time
    //         if (Math.round((timer.ms) / 1000) >= parseInt(flag.time)) {  //round times to the nearest second
    //           if (flag.final == 'true') {  //if the flag isn't the last one just keep going
    //             winstate = "You Win";  //but if it is let them know they win.
    //             //and display a button to the next level
    //             nextbutton = new LabelButton(this.game, 100, 64, 'buttons', "Next Level", doBtnNextHandler, this, 2, 1, 0); // button frames 1=over, 0=off, 2=down
    //           }
    //         } else {
    //           winstate = "You Lose";
    //           repeatbutton = new LabelButton(this.game, 100, 64, 'buttons', "Repeat Level", doBtnRepeatHandler, this, 2, 1, 0); // button frames 1=over, 0=off, 2=down
    //           gamefail = true;
    //         }
    //       } else {
    //         if (Math.round((timer.ms) / 1000) <= parseInt(Math.abs(flag.time))) {  //max time instead
    //           if (flag.final == "true") {
    //             winstate = "You Win";
    //             nextbutton = new LabelButton(this.game, 100, 64, 'buttons', "Next Level", doBtnNextHandler, this, 2, 1, 0); // button frames 1=over, 0=off, 2=down
    //           }
    //         } else {
    //           winstate = "You Lose";
    //           repeatbutton = new LabelButton(this.game, 100, 64, 'buttons', "Repeat Level", doBtnRepeatHandler, this, 2, 1, 0); // button frames 1=over, 0=off, 2=down
    //           gamefail = true;
    //         }
    //       }
    //     } else //it is a speed flag
    //     {
    //       if (parseInt(flag.speed) > 0) {  //this means a min speed flag
    //         if (player.speed >= parseInt(flag.speed)) {  
    //           if (flag.final == "true") {  //player was faster than flag.  ok
    //             winstate = "You Win";
    //             nextbutton = new LabelButton(this.game, 100, 64, 'buttons', "Next Level", doBtnNextHandler, this, 2, 1, 0); // button frames 1=over, 0=off, 2=down
    //           }
    //         } else {  //too slow
    //           winstate = "You Lose";
    //           repeatbutton = new LabelButton(this.game, 100, 64, 'buttons', "Repeat Level", doBtnRepeatHandler, this, 2, 1, 0); // button frames 1=over, 0=off, 2=down
    //           gamefail = true;
    //         }
    //       } else {
    //         if (player.speed <= parseInt(Math.abs(flag.speed))) {  //flag is a max speed
    //           if (flag.final == "true") {  //slow enough ok
    //             winstate = "You Win";
    //             nextbutton = new LabelButton(this.game, 100, 64, 'buttons', "Next Level", doBtnNextHandler, this, 2, 1, 0); // button frames 1=over, 0=off, 2=down
    //           }
    //         } else {  //too fast
    //           winstate = "You Lose";
    //           repeatbutton = new LabelButton(this.game, 100, 64, 'buttons', "Repeat Level", doBtnRepeatHandler, this, 2, 1, 0); // button frames 1=over, 0=off, 2=down
    //           gamefail = true;
    //         }
    //       }
    //     }
    //     if (flag.final == 'true' || gamefail) {  //stop if you are done or fail
    //       player.body.velocity.x = 0;
          
    //       timer.stop();
    //       levelcomplete = true;
    //     }
    //     flag.collided = true;
    //   }
    //   return false;
    // }
    

}


function doBtnStartHandler() {  //when the button is started.  
    timer.removeAll();
    timer.start();
      //set the player going.  this might need to be in parameters in stead
    timer.repeat(1000, totalTicks + 1, plotPoint, this);  //set a timer for plotting points
    timer.repeat(1000, 100, updatechart, this);  //set a timer for updating the chart not every point
    button.visible = false;
}
    
function doBtnNextHandler() {
    level++;   
}    
    
findObjectsByType = function(type, map, layer) {
    var result = new Array();
    //console.log(this.map.objects['Objects'][0]);
    this.map.objects[layer].forEach(function(element) {
        if (element.type === type) {
            //PUt all of the specifed objects in an array.
            //Phaser uses top left, Tiled bottom left so we have to adjust
            //also keep in mind that the cup images are a bit smaller than the tile which is 16x16
            //so they might not be placed in the exact position as in Tiled
            //console.log(element);
            //element.y -= 64;//tilesize not map
            result.push(element);
        }
    });
    return result;
};



createStopFromTiledObject = function(element, group) {

  busStop = this.game.add.sprite(element.x, element.y, 'busStops');
  busStop.y -= busStop._frame.height;
  this.game.physics.enable(busStop);


  

  //copy all properties to the sprite
  Object.keys(element.properties).forEach(function(key) {
    busStop[key] = element.properties[key];
  });
  busStop.collided = false;  //only allow flags to collide once - check manually.  
  busStop.body.enable = true;
  busStop.body.setSize(64, 64, 0, 64);

  // label the stop according to arrival time.
  stationTime.setMinutes(Number(startTime.getMinutes()) + Number(busStop.arrivalTime));
  console.log(Number(startTime.getMinutes()));
  console.log(Number(busStop.arrivalTime));
  console.log(stationTime.toLocaleTimeString(navigator.language, {hour: '2-digit', minute:'2-digit'}))
  busStop.clockArrivalTime = stationTime.toLocaleTimeString(navigator.language, {hour: '2-digit', minute:'2-digit'})
  busStopText = this.game.add.text(0, 0, busStop.clockArrivalTime + "\nWait: " + busStop.waitTime + "mins", {
    font: "18px Arial",
    fill: "#ffffff",
    align: "left"
  });
  busStop.addChild(busStopText);
  busStopText.x = (busStop.width - busStopText.width) / 2;
  busStopText.y = (busStop.height - busStopText.height) / 2 - 64;

  group.add(busStop);  // easier to set properties on
};

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
  var options = {  //this is for options for the graph - some style specified in html
    chart: {
      renderTo: 'velocity-graph',
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
      max: 100,
      tickInterval: 10
    },
    xAxis: {
      title: {
        text: 'Time (min)'
      },
    },
    series: [{
      name: 'Live Speed',
      data: [],
      color: '#0000FF',
      step: 'center',
      marker: {
        enabled: true
        },
      lineWidth: 2
    }, {
      name: 'km/h',
      data: [],
      marker: {
        enabled: true
      },
      lineWidth: 2,
      draggableY: true, // I modified the draggable points library (newY = Math.round(newY)) so it snaps to nearest int
      dragMaxY: 100,
      dragMinY: 0,
      step: 'center',
      point : { 
        events: {
          // drag : function(e) {
            
          //   },
          drop : function(e) {

            // console.log(this.y) 
           
            }
        }
      
      }
    }]

  };

  chart = new Highcharts.Chart(options);
  chart.series[0].data = [];
  chart.series[0].data.length = 0;
  // chart.series[1].data = [1,1,1,1,1,1,1,1];
  // chart.series[0].data.length = 8;
  for (var i = 0; i <= (totalTicks); i++) {
    chart.series[1].addPoint([i*5,30])
  }
}

function render() {

    // game.debug.bodyInfo(player)
    // game.debug.body(player)
    // game.debug.body(goat)
    // busStops.forEachAlive(renderGroup, this);
}
function renderGroup(member) {
    game.debug.body(member);
}
