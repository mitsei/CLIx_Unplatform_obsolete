function Boot() {}

Boot.prototype.preload = function () {
  this.load.image('preloader', 'assets/preloader.gif');
};

Boot.prototype.create = function () {
  this.game.input.maxPointers = 1;

  if (this.game.device.desktop) {
    this.game.scale.pageAlignHorizontally = true;
  } else {
    this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    this.scale.minWidth =  480;
    this.scale.minHeight = 260;
    this.scale.maxWidth = 640;
    this.scale.maxHeight = 640;
    this.scale.forceOrientation(true);
    this.scale.pageAlignHorizontally = true;
    this.scale.updateLayout(true);
  }
  this.game.state.start('preloader');
};


