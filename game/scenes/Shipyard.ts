import Scene from '../../gameLib/Scene';
import Ship from './Ship';

export default class Shipyard extends Scene{
  ship1: Ship|null = null;
  ship2: Ship|null = null;
  ship3: Ship|null = null;
  ship4: Ship|null = null;

  constructor(){
    super('Shipyard');
  }

  create(): void {
    const fon = this.add.sprite('shipyard2', this.width/2, this.height/2);
    this.ship1 = new Ship(this, 320, 105, 4, -16, 1.3);
    this.ship2 = new Ship(this, 330, 144, 3, -18, 1.3);
    this.ship3 = new Ship(this, 380, 210, 2, -18, 1.3);
    this.ship4 = new Ship(this, 380, 260, 1, -18, 1.3);

    this.timer.on(this.timerCallback, 30, this);
  }

  timerCallback(){
    console.log('ottical');
  }

  update(): void {
    //console.log('Shipyard');
    if(this.ship1){
      this.ship1.update();
    }
    if(this.ship2){
      this.ship2.update();
    }
    if(this.ship3){
      this.ship3.update();
    }
    if(this.ship4){
      this.ship4.update();
    }
  }
}