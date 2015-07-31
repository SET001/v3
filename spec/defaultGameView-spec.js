describe('V3 defaultGameView', function(){
	it('should have light', function(){
		var game = new V3.Game();
		game.run();
		for (i in game.view.scene.children){
		 	var cLights = 0;
		 	if (game.view.scene.children[i].type.toLowerCase().indexOf("light")>-1)
		 		cLights++;
		}
		expect(cLights).toBeTruthy();
	})
});
