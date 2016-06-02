var w = 800, h = 600;

var debug = true;


var game = new Phaser.Game(w, h, Phaser.CANVAS, '');


var player, gem, gems, flags, button; //,buttonsprite;
var collided = false;
var timer;
// var winstate = '';
// var levelcomplete = false;
var level;
var mygame;
var map;
var totalTicks = 13;
var baseHour = 8;
var baseMin = 0;
var clock = new Date()
var levels = 5;
var instructions;
var fail;
var withinBounds = true;
var started = false;
// var pass;

game.loadJSONTilemap = function(url) {
            var request = new XMLHttpRequest();
            request.open('GET', url, false);  // `false` makes the request synchronous
            request.send(null);
            if (request.status === 200) {
              game.load.tilemap('MyTileMap', null, request.responseText, Phaser.Tilemap.TILED_JSON);
            }
        }

game.state.add("Loading", loading);
game.state.add("LevelSelect", levelSelect);
game.state.add("PlayLevel", playLevel);
game.state.start("Loading");