import Scene from '../../gameLib/Scene';

export default class PlayerField{
  scene: Scene;
  constructor(scene: Scene){
    this.scene = scene;

    this.create();
  }

  create(){
    const grapfics = this.scene.add.graphics();
    const lineWidth = 2;
    grapfics.lineWidth(lineWidth);
    grapfics.strokeStyle('#3bb4ff');
    const min = Math.min(this.scene.width, this.scene.height);
    const step = (min-lineWidth)/11;
    let posX = lineWidth/2;
    let posY = lineWidth/2;

    for (let i = 0; i < 11; i++) {
      for (let j = 0; j < 11; j++) {
        grapfics.strokeRect(posX, posY, step, step);
        posX+=step;
      }
      posX = lineWidth/2;
      posY+=step;
    }
  }
}