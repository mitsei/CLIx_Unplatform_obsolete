var goat_present
playLevel = {
    create: function() {
			fail = false;
			menu_button = game.add.text(640, 20, 'MENU', { font: '24px Arial', fill: '#1AF' });
			menu_button.inputEnabled = true;
			menu_button.events.onInputUp.add(function () {
				document.getElementById('velocity-graph-1').style.display = 'none'
				document.getElementById('velocity-graph-2').style.display = 'none'
				game.state.start("LevelSelect");
				game.paused = false;
			});
			
			document.getElementById('velocity-graph-1').style.display = ''
			document.getElementById('velocity-graph-2').style.display = ''
			
            game.physics.startSystem(Phaser.Physics.ARCADE);
            map = game.add.tilemap('MyTileMap');
            map.addTilesetImage('tracks', 'tracks'); 
            map.addTilesetImage('bus', 'bus');
            map.addTilesetImage('buttons', 'buttons');
                
            timer = game.time.create();
            layer = map.createLayer('RoadTiles');
            layer.resizeWorld();
            if (debug) { layer.debug = true; }
            
            
            this.setupGraph();
            this.setupClock(baseHour, baseMin);
            
            busStops = game.add.group();
            result = this.findObjectsByType('busStop', map, 'Stops');  //find the stops and setup
            result.forEach(function(element) {
              this.createStopFromTiledObject(element, busStops);
            }, this);  
             
			obstacles = game.add.group(); 
            result = this.findObjectsByType('goat', map, 'Objects');  //setup the goat
				if (result.length > 0 ) {
					result.forEach(function(element) {
    	          		this.createObstacleFromTiledObject(element, obstacles);
            		}, this);
					goat_present = true;  
				} else { goat_present = false }
			
            distanceMarkers = game.add.group();
            result = this.findObjectsByType('10km', map, 'Objects'); 
            result.forEach(function(element) {
                marker = game.add.sprite(element.x, element.y, '10km');
                marker.y -= marker._frame.height;
            }, this);
            
            result = this.findObjectsByType('bus', map, 'Objects');  //setup the bus
            player = game.add.sprite(result[0].x+3, result[0].y - 14, 'bus', 8);
            player.y -= player._frame.height;
            player.speed = 1.0; //should get from tiled insaread
            
            game.physics.enable(player);
            player.body.setSize(5,32, -2, 32);  //body surrounds bus and used for collisions, setSize(width, height, offsetX, offsetY)
            // player.body.collideWorldBounds=true;
			player.checkWorldBounds = true;
			player.events.onOutOfBounds.add(function(){withinBounds = false; console.log('collide')}, this);
			game.world.bringToTop(player)
			    
            //put the start game button out
            go_button = new LabelButton(game, 150, 210, 'buttons', "Go!", this.doBtnStartHandler, this, 2, 1, 0); // button frames 1=over, 0=off, 2=down
            			
            // sample text
            textBox = this.game.add.text(0, 0, instructions , {
              font: "20px Arial",
              fill: "#ffffff",
              align: "left",
              fill: "black",
              backgroundColor: "white",
              wordWrap: true,
              wordWrapWidth: 300,
            });
            textBox.setTextBounds(60, 300, 300, 20); // text location
        
            var area
            var index = 0;
            plotPoint = function() {
				
                velocity_chart.series[0].addPoint([index*5,velocity_chart.series[1].points[index].y], false);
                if (index == 0) {
                	area = 0;
				} else {
                	area = ( velocity_chart.series[1].points[index-1].y * 5 )/60 + area
				}
				if (debug) {
					console.log('vel chart: ' + velocity_chart.series[1].points[index].y)
					console.log('area: ' + area)
				}
                position_chart.series[0].addPoint([index*5,area], false);
				
				// position_chart.series[0].addPoint([index*5,area], false);
				
				
                if (index < totalTicks && withinBounds) {
					if (debug) {console.log('in bounds:' + withinBounds)}      
                    player.body.velocity.x = (64 / (60)) * parseInt(velocity_chart.series[1].points[index].y);
                    if (debug) {console.log('index: ' + index)}
                    clock.setMinutes(clock.getMinutes() + 5);
                    clockDisplay.text = clock.toLocaleTimeString(navigator.language, {hour: '2-digit', minute:'2-digit'})
                    index++;
                } else {
                    
                    console.log("end_of_game")
					if (level == 2 && velocity_chart.series[1].points[index].y != 60) { fail = true; } // separate out into level validation
					
					
					restart_button = new LabelButton(game, 150, 210, 'buttons', "Restart", function(){game.state.start("PlayLevel")}, this, 2, 1, 0);
					
                    player.body.velocity.x = 0;
					if (fail) {
						fail = false;
						console.log('restart')
						 
                	} else {
						
						// Clear variables and setup for next level
						// go_button.label.setText('Next level')
						// go_button.visible = true;
						started = false;
						next_button = new LabelButton(game, 150, 260, 'buttons', "Next Level", function(){
							
							level++;
							instructions = instruction_array[language][level - 1]
							game.loadJSONTilemap('assets/level' + level + '.json') // bug workaround included
							if (level == 1 || level == 2 || level == 3) { totalTicks = 2 } else { totalTicks = 13 }
							game.input.onDown.add(function(){game.paused = false; game.state.start("PlayLevel")}, self)
							game.state.start("PlayLevel")}, this, 2, 1, 0);
						
						// game.paused = true;
							
						;
					}
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
        
		if (goat_present) {
			game.physics.arcade.overlap(player, obstacles, goatcollide, goatprocess, this);
		}
		
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
              if ( clock.valueOf() > busStop.leaveTime.time.valueOf() ) {
                game.add.sprite(busStop.x, busStop.y, "red_x")
				fail = true; 
			  }
            }
        }
        
        function goatcollide() {  //not used - passed along to process instead
        }
        function goatprocess(player, goat) {
			if (debug) {console.log('player body: ' + player.body.velocity.x )
				console.log( 'goat min: ' + (goat.min_velocity - 5) )
				console.log( 'goat max: ' + (goat.max_velocity + 5) ) 
				console.log(player.body.velocity.x <= (goat.max_velocity + 5))
				console.log( player.body.velocity.x >= (goat.min_velocity - 5))
			}
			
			if (player.body.velocity.x <= (parseInt(goat.max_velocity) + 5)
				&& player.body.velocity.x >= (parseInt(goat.min_velocity) - 5)) {		
			} else { goat.pass = false }
			
			if (goat.pass) { 
				game.add.sprite(goat.x, goat.y, "green_check")
			} else if (started) {
				game.add.sprite(goat.x, goat.y, "red_x");
				fail = true; 
			}
        
        }
        function checktime(a,b) {
            var threshold = 1000;
            return Math.abs(a - b) < threshold;
        }
          
    },
	
	doBtnStartHandler: function() {  //when the button is started.  
		started = true;
		timer.removeAll();
		timer.start();
		//set the player going.  this might need to be in parameters in stead
		timer.repeat(1000, totalTicks + 1, plotPoint, this);  //set a timer for plotting points
		timer.repeat(1000, 100, updatechart, this);  //set a timer for updating the chart not every point
		go_button.visible = false;
	},
		
	findObjectsByType: function(type, map, layer) {
		var result = new Array();
		map.objects[layer].forEach(function(element) {
			if (element.type === type) {
				//PUt all of the specifed objects in an array.
				//Phaser uses top left, Tiled bottom left so we have to adjust
				//so they might not be placed in the exact position as in Tiled
				result.push(element);
			}
		});
		return result;
	},
	
	createObstacleFromTiledObject: function(element, group) {
		if (level == 2 || level == 4) {
			goat = this.game.add.sprite(element.x, element.y, 'obstacles');
		} else {
			goat = this.game.add.sprite(element.x, element.y, 'goats');
		}
		goat.y -= goat._frame.height;
		
		game.physics.enable(goat);
		this.copyProperties(element, goat);
		// element.body.enable = true;
		goat.body.enable = true;
		goat.body.setSize(64, 64);
		goat.pass = true;
		group.add(goat)
		
	},
	
	createStopFromTiledObject: function(element, group) {
		busStop = this.game.add.sprite(element.x, element.y, 'busStops');
		busStop.y -= busStop._frame.height;
		this.game.physics.enable(busStop);
	
		this.copyProperties(element, busStop);

		busStop.body.enable = true;
		busStop.body.setSize(3, 64, 0, 64);
	
		
		// label the stop according to arrival time.
		busStop.arriveTime = new TimeEvent(busStop.arrivalTime);
		busStop.leaveTime = new TimeEvent(parseInt(busStop.arrivalTime) + parseInt(busStop.waitTime));
		//busStopText = this.game.add.text(0, 0, busStop.arriveTime.clockTime + "\nWait: " + busStop.waitTime + "mins", {
		busStopText = this.game.add.text(0, 0, busStop.arriveTime.clockTime, {
		font: "18px Arial",
		fill: "#ffffff",
		align: "left"
		});
		busStop.addChild(busStopText);
		busStopText.x = (busStop.width - busStopText.width) / 2;
		busStopText.y = (busStop.height - busStopText.height) / 2 - 64;
	
		group.add(busStop);  // easier to set properties on
	},
	
	copyProperties: function(from, to) {
		//copy all properties to the sprite
		Object.keys(from.properties).forEach(function(key) {
		to[key] = from.properties[key];
		});
	},
	
	setupGraph: function(){
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
					if (level < 3) {  
						velocity_chart.series[1].data.forEach(function(item){
						item.y = e.target.y });
						velocity_chart.yAxis[0].isDirty = true;
						velocity_chart.redraw();
					}
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
		// min: 0,
		// max: 50, // ((120/60) * 5 * totalTicks)/3, // max speed of * 5 min intervals * n intervals
		tickInterval: 10
		},
		xAxis: {
		min: 0,
		max: 5 * totalTicks,
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
	if (level == 3) {
		velocity_options.series[0].step = 'left';
		velocity_options.series[1].step = 'left';
	}
	velocity_chart = new Highcharts.Chart(velocity_options);
	position_chart = new Highcharts.Chart(position_options);
	console.log(velocity_options)
	velocity_chart.series[0].data = [];
	velocity_chart.series[0].data.length = 0;
	position_chart.series[0].data = [];
	position_chart.series[0].data.length = 0;
	for (var i = 0; i <= (totalTicks); i++) {
		velocity_chart.series[1].addPoint([i*5,30]) // intervals of 5, default value 30
	}
	// position_chart.series[0].addPoint([0,0])
	// position_chart.series[0].addPoint([totalTicks*5,0])
	},
	
	render: function() {
		if (debug) { 
			game.debug.bodyInfo(player)
			game.debug.body(player)
			if (goat_present) { obstacles.forEachAlive(this.renderGroup, this); 
				game.debug.body(goat); }
			busStops.forEachAlive(this.renderGroup, this);
			game.debug.text(game.time.fps || '--', 2, 14, "#00ff00");
		}
	},
	renderGroup: function(member) {
		game.debug.body(member);
	},
	
	setupClock: function(baseHour, baseMin) {
		clock.setHours(baseHour, baseMin, 0, 0);
		currentTime = clock.toLocaleTimeString(navigator.language, {hour: '2-digit', minute:'2-digit'});
	
		clockDisplay = this.game.add.text(0, 0, currentTime , {
		font: "24px Arial",
		fill: "#ffffff",
		align: "left",
		fill: "red",
		});
		if (level > 4 ) { clockDisplay.setTextBounds(250, 220, 100, 20); } // clock location
		else {clockDisplay.setTextBounds(-50, -50, 100, 20); }
	}

};

class LabelButton extends Phaser.Button {
    constructor(game, x, y, key, label, callback, callbackContext, overFrame, outFrame, downFrame, upFrame) {
        super(game, x, y, key, callback, callbackContext, overFrame, outFrame, downFrame, upFrame);
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
    }
    setLabel(label) {
        this.label.setText(label);
    }
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