var w = 800, h = 600;

var debug = false;


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

game.state.add("Loading", loading);
game.state.add("LevelSelect", levelSelect);
game.state.add("PlayLevel", playLevel);
game.state.start("Loading");