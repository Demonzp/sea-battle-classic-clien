import Scene from '../../gameLib/Scene';
import { TShipOnFleatShema } from '../../store/slices/game';
import store from '../../store/store';
import PlayerField from '../objects/PlayerField';
import Ship from '../objects/Ship';

export default class Battle extends Scene{
  plField: PlayerField|null = null;
  plFieldEnemy: PlayerField|null = null;
  ships: Ship[] = [];

  constructor(){
    super('Battle');
  }

  create(): void {
    console.log('Battle create');
    this.input.on('pointerup', (point)=>{
      this.plFieldEnemy?.pointerUp(point);
      //console.log('pointerup');
      //this.ships.forEach(ship=>ship.pointerUp());
    });

    this.input.on('pointerdown', (point)=>{
      //console.log('pointerdown');
      this.plFieldEnemy?.pointerMove(point);
      //console.log('pointerup');
      //this.ships.forEach(ship=>ship.pointerUp());
    });

    this.plField = new PlayerField(this, 0,0);
    const stepX = Math.trunc(this.game.width-(this.plField.width*2));
    this.plFieldEnemy = new PlayerField(this, this.plField.width+stepX,0);
    this.plFieldEnemy.setType('enemy');

    this.input.on('pointermove', (point)=>{
      this.plFieldEnemy?.pointerMove(point);
      this.ships.forEach(ship=>ship.setTarget(point));
      //console.log('pointermove');
    });

    const shipFour = new Ship(this, 0, 0, 4);
    const shipTreeOne = new Ship(this, 0, 0, 3);
    const shipTreeTwo = new Ship(this, 0, 0, 3);
    const shipTwoOne = new Ship(this, 0, 0, 2);
    const shipTwoTwo = new Ship(this, 0, 0, 2);
    const shipTwoTree = new Ship(this, 0, 0, 2);
    const shipOneOne = new Ship(this, 0, 0, 1);
    const shipOneTwo = new Ship(this, 0, 0, 1);
    const shipOneTree = new Ship(this, 0, 0, 1);
    const shipOneFour = new Ship(this, 0, 0, 1);
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
    const fleatShema = store.getState().game.fleatShema;
    this.parserFleatShema(fleatShema);
  }

  parserFleatShema(fleatShema:TShipOnFleatShema[]){
    //console.log('fleatShema = ', fleatShema);
    const arrShipId:string[] = [];
    fleatShema.forEach(shipShema=>{
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
    this.plField?.clearField();
    this.ships.forEach(ship=>ship.angle===0?ship.angle=180:ship.angle=0);
  }

  // parseField(){
  //   this.plField
  // }

  update(): void {
    this.ships.forEach(ship=>ship.update());
  }
}