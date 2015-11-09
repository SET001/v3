"use strict";
class FPSGameMode extends V3.GameMode{
	constructor(){
		super();
		this.defaultPawn = FPSCharacter;
		this.playerController = V3.FPSPlayerController;
	}
	init(){
		super.init();
		new GlobalLight();
		new Room();
		var spawningStartPoint = new THREE.Vector3(-1000, 0, -1000);
		var spawningEndPoint = new THREE.Vector3(1000, 0, 1000);
		var spawner = new V3.Spawner(FPSBot);
		var bots = spawner.spawn(5, spawningStartPoint, spawningEndPoint);
		var bot = new FPSBot();


		var coinSpawner = new V3.Spawner(FPSCoin);
		var coins = coinSpawner.spawn(
			50,
			new THREE.Vector3(-1000, 40, -1000),
			new THREE.Vector3(1000, 40, 1000),
			spawningEndPoint);
		// var redBotsSpawner = new V3.Spawner(FPSBotDevil);
		// var redBots = redBotsSpawner.spawn(5, spawningStartPoint, spawningEndPoint);


		// var skeletonSpawner = new V3.Spawner(FSPBotSkeleton);
		// skeletonSpawner.spawn(5, spawningStartPoint, spawningEndPoint);
	}
}
