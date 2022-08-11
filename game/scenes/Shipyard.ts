import Scene from '../../gameLib/Scene';
import Ship from './Ship';

export default class Shipyard extends Scene{
  ship1: Ship|null = null;

  constructor(){
    super('Shipyard');
  }

  create(): void {
    const fon = this.add.sprite('shipyard', this.width/2, this.height/2);
    this.ship1 = new Ship(this, 300, 200, 3, -18);
  }
}