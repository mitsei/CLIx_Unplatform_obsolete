 
ending = {
    create: function() {
        game.add.image(0, 0, 'ending');
        
        
		this.text = game.add.text(w/2, h/2, 'Nice work! You have completed the game.')
		this.text.anchor.set(.5)
		this.input.onDown.add(function () {
                game.state.start("LevelSelect");
            }, this)
    }
    
}