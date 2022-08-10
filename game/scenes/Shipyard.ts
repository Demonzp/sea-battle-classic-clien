import Scene from '../../gameLib/Scene';
import Ship from './Ship';

export default class Shipyard extends Scene{
  ship1: Ship|null = null;

  constructor(){
    super('Shipyard');
  }

  create(): void {

    this.ship1 = new Ship(this, 100, 100, 3);
  }
}