import Container from '../../gameLib/Container';
import { TPointer } from '../../gameLib/InputEvent';
import Scene from '../../gameLib/Scene';
import Sprite from '../../gameLib/Sprite';

export default class MainScene extends Scene{
  img: Sprite|null = null;
  ship: Sprite|null = null;
  contGun: Container|null = null;
  contShip: Container|null = null;
  constructor(){
    super('MainScene');
  }

  create(): void {
    //console.log('scene:', this.key);

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

    this.ship = this.add.sprite('ship-type-3', 0, 0, step*3, step-2);
    this.contGun = this.add.container(-25,0);
    const gun = this.add.sprite('gun-type-3', -3, 0, 18, 10);
    this.contGun.add(gun);
    //const cont = this.add.container(2*step-step/2, 1*step/2);
    this.contShip = this.add.container(200, 200);
    this.contShip.add([this.ship, this.contGun]);
    //this.contShip.setInteractiveRect(step*3, step-2);
    //this.contShip.on('pointerdown', this.click, this);
    this.ship.on('pointerdown', this.click, this);
    gun.on('pointerdown', ()=>{
      //console.log('click on gun'); 
    });
    //this.contGun.angle=90;
    //this.input.on('', this.click, this);
    //this.contShip.angle = 0;
  }

  click(pointer: TPointer){
    //console.log('pointer = ', pointer);
    //this.input.off(EInputEvents.pointerdown, this.click, this);
    //this.input.off(EInputEvents.pointerdown, ()=>{console.log()}, this);
  }

  update(): void {
    // if(this.contGun){
    //   this.contGun.angle+=1;
    // }
    // if(this.contShip){
    //   this.contShip.x+=0.2;
    // }
    // if(this.img){
    //   this.img.x++;
    // }
  }
}