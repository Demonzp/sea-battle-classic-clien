import Scene from '../../gameLib/Scene';
import Sprite from '../../gameLib/Sprite';

export default class MainScene extends Scene{
  img: Sprite|null = null;
  constructor(){
    super('MainScene');

  }

  create(): void {
    console.log('scene:', this.key);

    const grapfics = this.add.graphics();
    const lineWidth = 5;
    grapfics.lineWidth(lineWidth);
    grapfics.strokeStyle('#3bb4ff');
    const step = (this.height-lineWidth)/11;
    let posX = lineWidth/2;
    let posY = lineWidth/2;
    //grapfics.strokeRect(posX, posY, step, step);
    for (let i = 0; i < 11; i++) {
      for (let j = 0; j < 11; j++) {
        grapfics.strokeRect(posX, posY, step, step);
        posX+=step;
      }
      posX = lineWidth/2;
      posY+=step;
    }
  }

  update(): void {
    // if(this.img){
    //   this.img.x++;
    // }
  }
}