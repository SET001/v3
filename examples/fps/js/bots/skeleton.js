"use strict";
class FSPBotSkeleton extends FPSBot{
  constructor(){
    super();
    this.bodyColor = 0xABADB0;
    this.faceTexture = THREE.ImageUtils.loadTexture('../_images/botSkeleton.png');
  }
}
