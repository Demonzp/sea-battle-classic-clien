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
    this.plField = new PlayerField(this, 0,0);
    // const graphics = this.add.graphics();
    // graphics.fillStyle('#ff0004');
    // graphics.fillRect(300, 400, 5,5);
    const shipFour = new Ship(this, 490, 70, 4);
    const shipTreeOne = new Ship(this, 430, 120, 3);
    const shipTreeTwo = new Ship(this, 520, 160, 3);
    const shipTwoOne = new Ship(this, 400, 180, 2);
    const shipTwoTwo = new Ship(this, 500, 220, 2);
    const shipTwoTree = new Ship(this, 400, 240, 2);
    //shipFour.angle = 40;
    this.ships.push(shipFour, shipTreeOne, shipTreeTwo, shipTwoOne, shipTwoTwo, shipTwoTree);
    //this.ships.push(shipTreeOne);
  }

  update(delta: number): void {
    this.ships.forEach(ship=>ship.update());
  }
}