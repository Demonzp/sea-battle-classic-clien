import Scene from '../../gameLib/Scene';
import { getCamo } from '../../store/getters/game';
import { TShipOnFleetShema } from '../../store/slices/game';
import store from '../../store/store';
import Bullet from '../objects/Bullet';
import PlayerField from '../objects/PlayerField';
import Ship from '../objects/Ship';

export default class FleatShema extends Scene{
  plField: PlayerField|null = null;
  ships: Ship[] = [];
  numShots = 0;
  isFleatReadyShot = false;

  constructor(){
    super('FleatShema');
  }

  create(): void {
    //console.log('FleatShema create');
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
    const camo = getCamo();
    const shipFour = new Ship(this, 490, 70, 4, camo);
    const shipTreeOne = new Ship(this, 430, 120, 3, camo);
    const shipTreeTwo = new Ship(this, 520, 160, 3, camo);
    const shipTwoOne = new Ship(this, 400, 180, 2, camo);
    const shipTwoTwo = new Ship(this, 500, 220, 2, camo);
    const shipTwoTree = new Ship(this, 400, 240, 2, camo);
    const shipOneOne = new Ship(this, 390, 290, 1, camo);
    const shipOneTwo = new Ship(this, 430, 290, 1, camo);
    const shipOneTree = new Ship(this, 480, 290, 1, camo);
    const shipOneFour = new Ship(this, 520, 290, 1, camo);
    //shipFour.angle = 40;
    this.ships.push(
      shipFour, 
      shipTreeOne, 
      shipTreeTwo, 
      shipTwoOne, 
      shipTwoTwo, 
      shipTwoTree,
      shipOneOne,
      shipOneTwo,
      shipOneTree,
      shipOneFour,
    );
    //console.log('gameObjects = ', this.add.gameObjects);
    const fleatShema = store.getState().game.fleetShema;
    this.parserFleatShema(fleatShema);
    //this.parserFleatShema(fleatShema);
    //this.ships.push(shipTreeOne);
  }

  parserFleatShema(fleetShema:TShipOnFleetShema[]){
    //console.log('fleatShema = ', fleatShema);
    const arrShipId:string[] = [];
    fleetShema.forEach(shipShema=>{
      const ship = this.ships.find(s=>{
        if(s.type===shipShema.type&&!arrShipId.find(id=>id===s.id)){
          return true;
        }

        return false;
      });

      if(ship){
        //console.log('ship = ', ship);
        arrShipId.push(ship.id);
        ship.angle = shipShema.angle;
        this.plField?.calcFromStartCell(shipShema.startPos, ship, ship.angle);
        //console.log(this.plField?.isGreen);
        ship.x = this.plField?.shipPos.x!;
        ship.y = this.plField?.shipPos.y!;
        this.plField?.dropShip(ship);
      }
    });
  }

  shipShot(_: Ship){
    this.numShots++;
    if(this.numShots>=this.ships.filter(s=>s.isLive).length){
      this.isFleatReadyShot = true;
      this.numShots = 0;
    }
  }

  update(delta: number): void {
    this.ships.forEach(ship=>ship.update());
  }
}