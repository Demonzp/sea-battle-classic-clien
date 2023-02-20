import Scene from '../../gameLib/Scene';
import { getCamo } from '../../store/getters/game';
import { clearYourShots, TFieldShemaCell, TShipOnFleetShema } from '../../store/slices/game';
import store from '../../store/store';
import { compairValuesObjs } from '../../utils/global';
import Bullet from '../objects/Bullet';
import PlayerField from '../objects/PlayerField';
import Ship from '../objects/Ship';

export default class Battle extends Scene{
  plField: PlayerField|null = null;
  plFieldEnemy: PlayerField|null = null;
  prevShema: TFieldShemaCell [] = [];
  prevShemaEnemy: TFieldShemaCell [] = [];
  ships: Ship[] = [];
  shipsEnamy: Ship[] = [];
  idPointerMoveHandl = '';
  yorShots: TFieldShemaCell [] = [];
  targetCell: TFieldShemaCell|null = null;
  renderCells: TFieldShemaCell [] = [];
  numShots = 0;
  numLiviShips = 0;
  isFleatReadyShot = true;

  constructor(){
    super('Battle');
  }

  create(): void {
    const graphics = this.add.graphics();
    graphics.fillStyle('red');

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

    this.idPointerMoveHandl = this.input.on('pointermove', (point)=>{
      this.plFieldEnemy?.pointerMove(point);
      this.ships.forEach(ship=>ship.pointerSet(point));
      //console.log(point.x,'||', point.y);
      graphics.fillRect(point.x-5,point.y-5,10,10);
      //console.log('pointermove');
    });

    // const shipFour = new Ship(this, 0, 0, 4);
    // const shipTreeOne = new Ship(this, 0, 0, 3);
    // const shipTreeTwo = new Ship(this, 0, 0, 3);
    // const shipTwoOne = new Ship(this, 0, 0, 2);
    // const shipTwoTwo = new Ship(this, 0, 0, 2);
    // const shipTwoTree = new Ship(this, 0, 0, 2);
    // const shipOneOne = new Ship(this, 0, 0, 1);
    // const shipOneTwo = new Ship(this, 0, 0, 1);
    // const shipOneTree = new Ship(this, 0, 0, 1);
    // const shipOneFour = new Ship(this, 0, 0, 1);
    // //shipFour.angle = 40;
    // this.ships.push(
    //   shipFour, 
    //   shipTreeOne, 
    //   shipTreeTwo, 
    //   shipTwoOne, 
    //   shipTwoTwo, 
    //   shipTwoTree,
    //   shipOneOne,
    //   shipOneTwo,
    //   shipOneTree,
    //   shipOneFour,
    // );
    //console.log('gameObjects = ', this.add.gameObjects);
    const fleetShema = store.getState().game.fleetShema;
    this.parserFleatShema(fleetShema);
    this.parseDeadShips(store.getState().game.deadShips);
    let shema = store.getState().game.fieldShema;
    let shemaEnemy = store.getState().game.fieldShemaEnemy;
    this.prevShema = shema;
    this.prevShemaEnemy = shemaEnemy;
    this.parseField();
    store.subscribe(()=>{
      if(store.getState().game.gameScene==='gameOver'){
        this.input.off(this.idPointerMoveHandl);
        return;
      }
      
      const shema = store.getState().game.fieldShema;
      for (let i = 0; i < shema.length; i++) {
        const cell = shema[i];
        if(this.prevShema[i]){
          if(!compairValuesObjs(cell, this.prevShema[i])){
            //console.log('Мой стейт измянился!!!!!!!!!!!');
            this.prevShema = shema;
            this.plField?.parseServerData(shema);
            return;
          }
        }
      }

      const shemaEnemy = store.getState().game.fieldShemaEnemy;
      for (let i = 0; i < shemaEnemy.length; i++) {
        const cell = shemaEnemy[i];
        if(this.prevShemaEnemy[i]){
          if(!compairValuesObjs(cell, this.prevShemaEnemy[i])){
            //console.log('Противника стейт измянился!!!!!!!!!!!');
            this.prevShemaEnemy = shemaEnemy;
            this.plFieldEnemy?.parseServerData(shemaEnemy);
            const fleetShema = store.getState().game.fleetShemaEnemy;
            this.parserFleatShemaEnamy(fleetShema);
            return;
          }
        }
      }

      const shots = store.getState().game.youShotTo;

      if(shots.length>0){
        this.yorShots = [...this.yorShots, ...shots];
        console.log('shots = ', this.yorShots);
        store.dispatch(clearYourShots());
      }
      
    });
    graphics.setZindex(1);
  }

  parserFleatShemaEnamy(fleetShema:TShipOnFleetShema[]){
    //const arrShipId:string[] = [];
    const camos = store.getState().game.camos;
    const camoId = store.getState().game.enemyInfo?.camoId;
    const camo = camos.find(c=>c.id===camoId)!;
    fleetShema.forEach(shipShema=>{
      if(!this.shipsEnamy.find(ship=>ship.id===shipShema.id)){
        const ship = new Ship(this, 0, 0, shipShema.type, camo); 
        ship.angle = shipShema.angle;
        this.plFieldEnemy!.calcFromStartCell(shipShema.startPos, ship, ship.angle);
        ship.x = this.plFieldEnemy!.shipPos.x!;
        ship.y = this.plFieldEnemy!.shipPos.y!;
        this.plFieldEnemy!.dropShip(ship);
        ship.id = shipShema.id;
        this.shipsEnamy.push(ship);
      }
    });
    this.plFieldEnemy!.clearField();
  }

  parseDeadShips(fleatShema: TShipOnFleetShema[]){
    fleatShema.forEach(shipShema=>{
      const ship = this.ships.find(s=>s.id===shipShema.id);
      if(ship){
        ship.setDead();
      }
    });
  }

  parserFleatShema(fleetShema:TShipOnFleetShema[]){
    console.log('fleatShema = ', fleetShema);
    //const arrShipId:string[] = [];
    const camo = getCamo();
    fleetShema.forEach(shipShema=>{
      // const ship = this.ships.find(s=>{
      //   if(s.type===shipShema.type&&!arrShipId.find(id=>id===s.id)){
      //     return true;
      //   }

      //   return false;
      // });

      

      //if(ship){
        //console.log('ship = ', ship);
        //arrShipId.push(ship.id);
        const ship = new Ship(this, 0, 0, shipShema.type, camo);
        ship.id = shipShema.id;
        ship.angle = shipShema.angle;
        this.plField?.calcFromStartCell(shipShema.startPos, ship, ship.angle);
        //console.log(this.plField?.isGreen);
        ship.x = this.plField?.shipPos.x!;
        ship.y = this.plField?.shipPos.y!;
        
        this.plField?.dropShip(ship);
        this.ships.push(ship);
      //}
    });
    this.plField?.clearField();
    //this.ships.forEach(ship=>ship.angle===0?ship.angle=180:ship.angle=0);
  }

  parseField(){
    this.plField?.parseServerData(store.getState().game.fieldShema);
    this.plFieldEnemy?.parseServerData(store.getState().game.fieldShemaEnemy);
  }

  shipShot(_: Ship){
    this.numShots++;
    console.log('shot = ', this.numShots);
    if(this.numShots>=this.ships.filter(s=>s.isLive).length){
      console.log('this.numShots = ', this.numShots);
      this.isFleatReadyShot = true;
      this.numShots = 0;
      //this.parseField();
      //this.plFieldEnemy?.parseServerData(this.renderCells);
      //this.renderCells = [];
    }
  }

  bulletOnTarget(bullet: Bullet){
    //console.log('bullet.cell.isFree = ', bullet.cell.id);
    const cell = store.getState().game.fieldShemaEnemy.find(c=>c.id===bullet.cell.id);
    //console.log('isFree = ', cell);
    if(!cell?.isFree){
      const rndX = this.game.Math.between(-10,10);
      const rndY = this.game.Math.between(-10,10);
      const boom = this.add.sprite('explosion', bullet.cell.pos.center.x+rndX, bullet.cell.pos.center.y+rndY, 40,40);
      boom.play();
      boom.on('onComplate', ()=>{this.add.remove(boom)});
    }
  }

  update(): void {
    if(this.isFleatReadyShot&&this.yorShots.length>0){
      this.isFleatReadyShot = false;
      const target = this.yorShots.splice(0,1)[0];
      const cell = this.plFieldEnemy?.findCellById(target.id);
      
      //console.log('setShotTarget = ', cell);
      if(cell){
        //this.renderCells.push(target);
        //this.targetCell = cell;
        this.ships.forEach(s=>s.setShotTarget(cell));
      }
    }
    this.ships.forEach(ship=>ship.update());
    this.shipsEnamy.forEach(ship=>ship.update());
  }
}