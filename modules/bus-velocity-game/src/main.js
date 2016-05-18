var game = new Phaser.Game(640, 640, Phaser.AUTO, 'phaserphys-game');
game.state.add('boot', require('./boot'));
game.state.add('preloader', require('./preloader'));
game.state.add('menu', require('./menu'));
game.state.add('game', require('./game'));
game.state.start('boot');
