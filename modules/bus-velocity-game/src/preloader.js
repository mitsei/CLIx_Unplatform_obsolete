function Preloader() {
  this.asset = null;
  this.ready = false;
}

Preloader.prototype.preload = function() {
  this.asset = this.add.sprite(this.game.width * 0.5 - 110, this.game.height * 0.5 - 10, 'preloader');
  this.load.setPreloadSprite(this.asset);

  // this.load.onLoadComplete.addOnce(this.onLoadComplete, this);
  this.loadResources();
  this.ready = true;
};

/*throwError=function(param){
  console.log('error');
  console.log(param);
  filesuccess=false;
};*/

function isLetter(str) {  //used for parsing file names - do they have a letter MyTileMap1a
  return str.length === 1 && str.match(/[a-z]/i);
}

loadComplete = function(param, filename, success) {  //runs after load regardless of success
  if (success === true && filename.substring(0, 9) == "MyTileMap") { //determines if it is a tilemap by name
    this.game.levelarray[parseInt(filename.substring(filename.length - 1, filename.length))] = 1;
  } else if (success === false && filename.substring(0, 9) == "MyTileMap") {  //failed to load tilemap
    loadAlternates(parseInt(filename.substring(filename.length - 1, filename.length)), this.game); //check for 1a and 1b instead
  }
};

function loadAlternates(level, game) {  //failed to load tilemap so check for a and b version
  game.levelarray[parseInt(level)] = 2;
  game.load.tilemap('MyTileMap' + level + 'a', 'assets/traintrack' + level + 'a' + '.json', null, Phaser.Tilemap.TILED_JSON);
  game.load.tilemap('MyTileMap' + level + 'b', 'assets/traintrack' + level + 'b' + '.json', null, Phaser.Tilemap.TILED_JSON);

}

Preloader.prototype.loadResources = function() {
  // load your resources here

  //this.game.load.onFileError.add(throwError,this);
  this.game.load.onFileComplete.add(loadComplete, this);
  this.game.gamelevels = 2;

  this.game.levelarray = [];
  //console.log(this.game);
  for (i = 1; i <= this.game.gamelevels; i++) {
    this.game.levelarray[i] = 0;
    this.game.load.tilemap('MyTileMap' + i, 'assets/traintrack' + i + '.json', null, Phaser.Tilemap.TILED_JSON);
  }

  this.load.image('tracks', 'assets/tracks.png');  //track image
  this.game.load.spritesheet('train64', 'assets/train64.png', 64, 64, 12);
  this.game.load.spritesheet('gems', 'assets/gems2.png', 64, 64, 9);
  this.game.load.spritesheet('flags', 'assets/flags.png', 64, 64, 4);
  this.game.load.spritesheet('buttons', 'assets/buttons.png', 150, 48, 3);
};

Preloader.prototype.create = function() {

};

Preloader.prototype.update = function() {
  // if (!!this.ready) {
  this.game.state.start('menu');
  // }
};

Preloader.prototype.onLoadComplete = function() {
  // this.ready = true;
};
