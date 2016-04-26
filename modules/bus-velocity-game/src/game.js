function Game() {}

var player, gem, gems, flags, button; //,buttonsprite;
var collided = false;
var timer, timerEvent;
var winstate = '';
var levelcomplete = false;
var level = 1;
var mygame;
var chart;

Game.prototype.create = function() {

  if (this.game.levelarray[level] == 1) {  //if 1 tilemap
    this.map = this.game.add.tilemap('MyTileMap' + level);
  } else if (Math.random() <= 0.50) {  //if there are two pick randomly
    this.map = this.game.add.tilemap('MyTileMap' + level + 'a');
  } else {
    this.map = this.game.add.tilemap('MyTileMap' + level + 'b');
  }

  this.map.addTilesetImage('tracks', 'tracks');  //track image
  this.map.addTilesetImage('train64', 'train64');
  this.map.addTilesetImage('gems', 'gems');
  this.map.addTilesetImage('flags', 'flags');
  this.map.addTilesetImage('buttons', 'buttons');

  //this.map.setCollisionBetween(1, 9);
  this.map.setTileIndexCallback(6, turnleft, this.map);  //these are poorly names since they each 
  this.map.setTileIndexCallback(4, turnup, this.map);   //can have two diretions they turn
  this.map.setTileIndexCallback(8, turnright, this.map);
  this.map.setTileIndexCallback(3, turndown, this.map);

  timer = this.game.time.create();

  mygame = this.game;

  layer = this.map.createLayer('RoadTiles');
  layer.resizeWorld();
  this.createItems();

  setupGraph();

};

Game.prototype.createItems = function() {
  //create items
  gems = this.game.add.group();
  flags = this.game.add.group();

  result = this.findObjectsByType('gem', this.map, 'Objects');  //find the gems and setup
  result.forEach(function(element) {
    this.createGemFromTiledObject(element, gems);
  }, this);

  result = this.findObjectsByType('flag', this.map, 'Objects');  //find the flags and setup
  result.forEach(function(element) {
    this.createFlagFromTiledObject(element, flags);
  }, this);

  result = this.findObjectsByType('train', this.map, 'Objects');  //setup the train
  player = this.game.add.sprite(result[0].x, result[0].y, 'train64', 10);
  player.y -= player._frame.height;
  player.speed = 1.0; //should get from tiled insaread
  this.game.physics.enable(player);
  //player.body.velocity.y = -64*player.speed;
  player.body.setSize(1, 1, 32, 63);  //body surrounds train and used for collisions
  playertile = this.map.getTile(Math.round(player.x / 64), Math.round(player.y / 64), 'RoadTiles');
  for (var y = 0; y < this.map.height; ++y) {
    for (var x = 0; x < this.map.width; ++x) {
      tile = this.map.getTile(x, y);
      if (tile) {  //sets the tile collisions to false.  only want one collision per tile
        tile.collided = false;
      }
    }
  }

  playertile.collided = true;

//put the start game button out
  button = new LabelButton(this.game, 100, 64, 'buttons', "Start game!", doBtnStartHandler, this, 2, 1, 0); // button frames 1=over, 0=off, 2=down

};
//find objects in a Tiled layer that containt a property called "type" equal to a certain value
Game.prototype.findObjectsByType = function(type, map, layer) {
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
//create a sprite from an object
Game.prototype.createGemFromTiledObject = function(element, group) {

  gem = this.game.add.sprite(element.x, element.y, 'gems', 2);
  gem.y -= gem._frame.height;
  this.game.physics.enable(gem);

  //copy all properties to the sprite
  Object.keys(element.properties).forEach(function(key) {
    gem[key] = element.properties[key];
  });
  gem.collided = false;  //only allow flags to collide once - check manually.  
  gem.body.enable = true;

  if (gem.multiplier > 0) {  //gems speed up or slow down
    prefix = '+';
  } else {
    prefix = '';
  }

  //label the gem according to speed boost.
  boostText = this.game.add.text(0, 0, prefix + gem.multiplier, {
    font: "24px Arial",
    fill: "#ffffff",
    align: "left"
  });
  gem.addChild(boostText);
  boostText.x = (gem.width - boostText.width) / 2;
  boostText.y = (gem.height - boostText.height) / 2;

  gem.inputEnabled = true;

  gem.input.enableDrag();  //allow the gems to move around
  gem.input.enableSnap(64, 64, false, true);  //and snap to the grad
  gem.input.snapOffsetX = 0;
  gem.input.snapOffsetY = 0;

  gem.body.setSize(64, 64, 0, 0);
  //gem.body.moves = false;
  group.add(gem);  //the gems are a group which is easier to set properties on
};

Game.prototype.createFlagFromTiledObject = function(element, group) {

  flag = this.game.add.sprite(element.x, element.y, 'flags', 1);
  flag.y -= flag._frame.height;
  this.game.physics.enable(flag);

  //copy all properties to the sprite
  Object.keys(element.properties).forEach(function(key) {
    flag[key] = element.properties[key];
  });

  if (parseInt(flag.time) !== 0) {
    flag.frame = 0;
    if (flag.time > 0) {
      prefix = '>';
    } else {
      prefix = '<';
    }

    goalText = this.game.add.text(0, 0, prefix + Math.abs(flag.time), {
      font: "24px Arial",
      fill: "#ffffff",
      align: "left"
    });
  } else {
    if (flag.speed > 0) {
      prefix = '>';
    } else {
      prefix = '<';
    }

    goalText = this.game.add.text(0, 0, prefix + Math.abs(flag.speed), {
      font: "24px Arial",
      fill: "#ffffff",
      align: "left"
    });
  }


  flag.addChild(goalText);
  goalText.x = (flag.width - goalText.width) / 2;
  goalText.y = (flag.height - goalText.height) / 2;

  flag.collided = false;  //only allow flags to collide once - check manually.  
  flag.body.enable = true;
  gem.body.setSize(64, 64, 0, 0);
  //gem.body.moves = false;
  group.add(flag);


};

Game.prototype.update = function() {

  //set up the possible collisions types - this uses groups
  this.game.physics.arcade.collide(player, layer);

  this.game.physics.arcade.collide(player, gems, gemcollide, gemprocess, this);

  this.game.physics.arcade.collide(player, flags, flagcollide, flagprocess, this);

};

Game.prototype.render = function() {
  this.game.debug.body(player);  //turn this off when not debugging.

  if (timer.running === false) {  //only mov the train when the timer is running
    if (levelcomplete === true) {  //complete the level and win
      this.game.debug.text(winstate, 2, 14, "#ff0");
    }
    //console.log('false');
  }
  if (timer.running) {  //while the timer is running display this
    //these nesxt two ues hard coded text.  need to change for internationalization
    timetext = "Time: " + formatTime(Math.round((timer.ms) / 1000));
    speedtext = " Speed: " + player.speed;
    this.game.debug.text(timetext + speedtext, 2, 14, "#ff0");
  }
};

function formatTime(s) {
  // Convert seconds (s) to a nicely formatted and padded time string
  var minutes = "0" + Math.floor(s / 60);
  var seconds = "0" + (s - minutes * 60);
  return minutes.substr(-2) + ":" + seconds.substr(-2);
}

function gemcollide(player, gem) {
  //IGNORED
  //instead pass along to gemprocess so we don't have to process physics
}

function gemprocess() {
  if (gem.collided === false) {
    oldspeed = player.speed;
    player.speed += parseInt(gem.multiplier);  //get the boost from the parameters
    player.body.velocity.x = player.body.velocity.x * (player.speed / oldspeed);
    player.body.velocity.y = player.body.velocity.y * (player.speed / oldspeed);
    gem.collided = true;  //don't collide again
  }
  return false;
}

function flagcollide() {  //not used - passed along to process instead

}

function flagprocess(player, flag) {
  //this section determines success of the level
  //it contains a lot of tesxt that needs to be internationalized.  
  gamefail = false;
  if (flag.collided === false) {
    if (parseInt(flag.time) !== 0) {  //this is a time flag
      if (parseInt(flag.time) > 0) {  //and it is one that needs to be greater than a time
        if (Math.round((timer.ms) / 1000) >= parseInt(flag.time)) {  //round times to the nearest second
          if (flag.final == 'true') {  //if the flag isn't the last one just keep going
            winstate = "You Win";  //but if it is let them know they win.
            //and display a button to the next level
            nextbutton = new LabelButton(this.game, 100, 64, 'buttons', "Next Level", doBtnNextHandler, this, 2, 1, 0); // button frames 1=over, 0=off, 2=down
          }
        } else {
          winstate = "You Lose";
          repeatbutton = new LabelButton(this.game, 100, 64, 'buttons', "Repeat Level", doBtnRepeatHandler, this, 2, 1, 0); // button frames 1=over, 0=off, 2=down
          gamefail = true;
        }
      } else {
        if (Math.round((timer.ms) / 1000) <= parseInt(Math.abs(flag.time))) {  //max time instead
          if (flag.final == "true") {
            winstate = "You Win";
            nextbutton = new LabelButton(this.game, 100, 64, 'buttons', "Next Level", doBtnNextHandler, this, 2, 1, 0); // button frames 1=over, 0=off, 2=down
          }
        } else {
          winstate = "You Lose";
          repeatbutton = new LabelButton(this.game, 100, 64, 'buttons', "Repeat Level", doBtnRepeatHandler, this, 2, 1, 0); // button frames 1=over, 0=off, 2=down
          gamefail = true;
        }
      }
    } else //it is a speed flag
    {
      if (parseInt(flag.speed) > 0) {  //this means a min speed flag
        if (player.speed >= parseInt(flag.speed)) {  
          if (flag.final == "true") {  //player was faster than flag.  ok
            winstate = "You Win";
            nextbutton = new LabelButton(this.game, 100, 64, 'buttons', "Next Level", doBtnNextHandler, this, 2, 1, 0); // button frames 1=over, 0=off, 2=down
          }
        } else {  //too slow
          winstate = "You Lose";
          repeatbutton = new LabelButton(this.game, 100, 64, 'buttons', "Repeat Level", doBtnRepeatHandler, this, 2, 1, 0); // button frames 1=over, 0=off, 2=down
          gamefail = true;
        }
      } else {
        if (player.speed <= parseInt(Math.abs(flag.speed))) {  //flag is a max speed
          if (flag.final == "true") {  //slow enough ok
            winstate = "You Win";
            nextbutton = new LabelButton(this.game, 100, 64, 'buttons', "Next Level", doBtnNextHandler, this, 2, 1, 0); // button frames 1=over, 0=off, 2=down
          }
        } else {  //too fast
          winstate = "You Lose";
          repeatbutton = new LabelButton(this.game, 100, 64, 'buttons', "Repeat Level", doBtnRepeatHandler, this, 2, 1, 0); // button frames 1=over, 0=off, 2=down
          gamefail = true;
        }
      }
    }
    if (flag.final == 'true' || gamefail) {  //stop if you are done or fail
      player.body.velocity.x = 0;
      player.body.velocity.y = 0;
      timer.stop();
      levelcomplete = true;
    }
    flag.collided = true;
  }
  return false;
}

function turnleft(sprite, tile) { //these are oddly named.  only turn left from one direction
  if (!tile.collided) {
    if (player.body.velocity.x > 0) {  //moving right
      player.body.velocity.y = 64 * player.speed;  //go down
      player.body.velocity.x = 0;
      player.body.setSize(1, 1, 32, 1);
      player.frame = 0;
    } else { 
      player.body.velocity.y = 0;  //moving verticlaly
      player.body.velocity.x = -64 * player.speed;  //go left
      player.body.setSize(1, 1, 62, 32);
      player.frame = 3;
    }
    tile.collided = true;
    collided = true;
  }

}

function turnup(sprite, tile) {
  if (!tile.collided) {
    if (player.body.velocity.y > 0) {  //moving vertically
      player.body.velocity.y = 0;
      player.body.velocity.x = 64 * player.speed;  //move right
      player.body.setSize(1, 1, 1, 32);
      player.frame = 6;
    } else {
      //moving horizontally
      player.body.velocity.y = -64 * player.speed;  //turn up
      player.body.velocity.x = 0;
      player.body.setSize(1, 1, 32, 62);
      player.frame = 9;
    }
    collided = true;
    tile.collided = true;
  }
}

function turndown(sprite, tile) {
  if (!tile.collided) {
    if (player.body.velocity.y > 0) {  //moving vertically
      player.body.velocity.y = 0;
      player.body.velocity.x = -64 * player.speed;  //turn left
      player.body.setSize(1, 1, 62, 32);
      player.frame = 3;
    } else {  //moving horizontally 
      player.body.velocity.y = -64 * player.speed;  //turn up
      player.body.velocity.x = 0;
      player.body.setSize(1, 1, 32, 62);
      player.frame = 9;
    }
    collided = true;
    tile.collided = true;
  }
}

function turnright(sprite, tile) {
  if (!tile.collided) {  //moving horizontally
    if (player.body.velocity.x < 0) {
      player.body.velocity.y = 64 * player.speed;  //turn down
      player.body.velocity.x = 0;
      player.body.setSize(1, 1, 32, 1);
      player.frame = 0; 
    } else {  //moving vertically 
      player.body.velocity.y = 0;
      player.body.velocity.x = 64 * player.speed;  //turn right
      player.body.setSize(1, 1, 1, 32);
      player.frame = 6;
    }
    collided = true;
    tile.collided = true;
  }
}

function setupGraph(){
  var options = {  //this is for options for the graph - some style specified in html
    chart: {
      renderTo: 'velocity-graph',
      defaultSeriesType: 'line'
    },
    title: {
      text: 'Speed by Time'
    },
    yAxis: {
      title: {
        text: 'Speed'
      },
      min: 0,
      max: 10
    },
    series: [{
      name: 'Train Speed',
      data: [],
      color: '#0000FF',
      step: 'center',
      marker: {
        enabled: true
        },
      lineWidth: 2
    }, {
      name: 'asdf',
      data: [],
      marker: {
        enabled: true
      },
      lineWidth: 2,
      draggableY: true, // I modified the draggable points library (newY = Math.round(newY)) so it snaps to nearest int
      dragMaxY: 10,
      dragMinY: 0,
      step: 'center',
      point : { 
        events: {
          // drag : function(e) {
            
          //   },
          drop : function(e) {
            // this.y = Math.round(this.y)
            console.log(this.y) 
           
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
  for (var i = 0; i < 10; i++) {
    chart.series[1].addPoint(1)
  }
}

Game.prototype.onInputDown = function() {
  //this.game.state.start('menu');
  //not used
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

function doBtnStartHandler() {  //when the button is started.  
  timer.removeAll();
  timer.start();
  timer.repeat(1000, 10, plotPoint, this);  //set a timer for plotting points
  timer.repeat(1000, 100, updatechart, this);  //set a timer for updating the chart not every point
  player.body.velocity.y = -64 * player.speed;  //set the player going up.  this might need to be in parameters in stead
  button.visible = false;
}

function doBtnNextHandler() {
  level++;
  mygame.state.start('game');
}

function doBtnRepeatHandler() {
  mygame.state.start('game');
}

var ok = 0;
plotPoint = function() {
  chart.series[0].addPoint(chart.series[1].points[ok].y, false);
  // chart.series[1].addPoint(3)
  console.log('speed1: ' + player.speed)
  player.speed = chart.series[1].points[ok].y
  console.log('speed2: ' + player.speed)
  player.body.velocity.x *= chart.series[1].points[ok].y;
  player.body.velocity.y *= chart.series[1].points[ok].y;
  ok++;
  player.body.velocity.x /= chart.series[1].points[ok-1].y;
  player.body.velocity.y /= chart.series[1].points[ok-1].y;
  
  console.log('chart:' + chart.series[1].points[ok].y)
  console.log('speed:' + player.speed)
  console.log('vel: ' + player.body.velocity)
  console.log("ok: " + ok)
};

updatechart = function() {
  chart.redraw();
};
