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
    this.input.on('pointerup', ()=>{
      //console.log('pointerup');
      this.ships.forEach(ship=>ship.pointerUp());
    });
    this.input.on('pointermove', (point)=>{

      this.ships.forEach(ship=>ship.pointerMove(point));
      //console.log('pointermove');
    });
    this.plField = new PlayerField(this);
    // const graphics = this.add.graphics();
    // graphics.fillStyle('#ff0004');
    // graphics.fillRect(300, 400, 5,5);
    const shipFour = new Ship(this, 500, 60, 4);
    //shipFour.angle = 40;
    this.ships.push(shipFour);
  }

  update(delta: number): void {
    this.ships.forEach(ship=>ship.update());
  }
}