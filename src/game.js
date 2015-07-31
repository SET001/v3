"use strict";

{
	let _view=null;

	V3.Game = class{
		constructor(){
			this.mode = new V3.GameMode();
			this.pawns = [];
		}
		set view(view){
			_view = view;
			_view.game = this;
		}

		get view(){
			if(!_view){
				this.view = new V3.defaultGameView();
			}
			return _view;
		}
		addPawn(pawn){
			if (pawn.mesh){
				this.view.scene.add(pawn.mesh);
			}
			this.pawns.push(pawn);
		}
		run(){
			// if defined project url then load map
			this.view.show();
			// load default scene
			// run default scene
		}
		//	find where to place
		loadMap(){}
	};
}
