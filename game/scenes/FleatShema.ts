import Scene from '../../gameLib/Scene';
import PlayerField from '../objects/PlayerField';
import Ship from '../objects/Ship';

export default class FleatShema extends Scene{
  plField: PlayerField|null = null;
  ships: Ship[] = [];
  constructor(){
    super('FleatShema');
    
  }

  create(): void {
    this.plField = new PlayerField(this);

    const shipFour = new Ship(this, 500, 60, 4);
    this.ships.push(shipFour);
  }
}