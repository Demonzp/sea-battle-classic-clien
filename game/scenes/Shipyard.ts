import Scene from '../../gameLib/Scene';
import Ship from './Ship';

export default class Shipyard extends Scene{
  ship1: Ship|null = null;
  ship2: Ship|null = null;

  constructor(){
    super('Shipyard');
  }

  create(): void {
    const fon = this.add.sprite('shipyard2', this.width/2, this.height/2);
    this.ship1 = new Ship(this, 320, 105, 4, -16, 1.3);
    this.ship2 = new Ship(this, 330, 144, 3, -18, 1.3);
  }

  update(): void {
    //console.log('Shipyard');
    if(this.ship1){
      this.ship1.update();
    }
    if(this.ship2){
      this.ship2.update();
    }
  }
}