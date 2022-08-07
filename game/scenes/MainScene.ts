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
    const lineWidth = 2;
    grapfics.lineWidth(lineWidth);
    grapfics.strokeStyle('#3bb4ff');
    const min = Math.min(this.width, this.height);
    const step = (min-lineWidth)/11;
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

    posX = this.width-step-lineWidth/2;
    posY = this.height-step-lineWidth/2;
    //grapfics.strokeRect(posX, posY, step, step);
    for (let i = 0; i < 11; i++) {
      for (let j = 0; j < 11; j++) {
        grapfics.strokeRect(posX, posY, step, step);
        posX-=step;
      }
      posX = this.width-step-lineWidth/2;
      posY-=step;
    }

    const ship = this.add.sprite('ship-type-3', 0, 0, step*3-2, step-6);
    const gun = this.add.sprite('gun-type-3', -28, 0, 18, 10);

    //const cont = this.add.container(2*step-step/2, 1*step/2);
    const cont = this.add.container(200, 200);
    cont.add([ship, gun]);
  }

  update(): void {
    // if(this.img){
    //   this.img.x++;
    // }
  }
}