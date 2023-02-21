import Container from '../../gameLib/Container';
import Game, { TPoint } from '../../gameLib/Game';
import { TPointer } from '../../gameLib/InputEvent';
import Scene from '../../gameLib/Scene';
import Sprite from '../../gameLib/Sprite';
import { TCamo } from '../../store/slices/game';
import FleatShema from '../scenes/FleatShema';
import GunTower from './GunTower';
import { ICell } from './PlayerField';

export type TShips = 4 | 3 | 2 | 1;

type TCellObjId = { col: number, row: string };
type TCells = { main: TCellObjId[], sup: TCellObjId[] };

const initPos = {
  x: 0,
  y: 0
}

export default class Ship {
  scene: FleatShema;
  id: string;
  x: number;
  y: number;
  angle: number;
  type: TShips;
  scale: number;
  mainContainer: Container;
  bodySprite: Sprite | null = null;
  detaliSprite: Sprite | null = null;
  gunTowers: GunTower[] = [];
  isOnDot = true;
  isPointerDown = false;
  isRot = false;
  toDot: TPoint = { ...initPos };
  posOnField: TPoint = { ...initPos };
  targetPos: TPoint = {...initPos};
  isOnTarget = true;
  cellsOnField: TCells | null = null;
  cellTarget: ICell | null = null;
  startPos: TPoint;
  width = 0;
  height = 0;
  speed = 4;
  sx = 0;
  sy = 0;
  dx = 0;
  dy = 0;
  camo: TCamo;
  timerClick = 0;
  readonly timeIsClick = 140;
  isLive = false;
  isCanShot = false;
  numShutTowers = 0;

  constructor(scene: Scene, x: number, y: number, type: TShips, camo:TCamo, angle = 0, scale = 1) {
    this.scene = scene as FleatShema;
    this.id = Game.createId();
    this.camo = camo;
    this.startPos = {
      x,
      y
    };
    this.x = x;
    this.y = y;
    this.angle = angle;
    this.scale = scale
    this.type = type;
    this.mainContainer = scene.add.container(x, y);

    this.mainContainer.on('pointerdown', this.pointerDown, this);

    this.create();
  }

  create() {
    //console.log('Ship create');
    this.isLive = true;
    const lineWidth = 2;
    const min = Math.min(this.scene.width, this.scene.height);
    const step = (min - lineWidth) / 11;
    //const dispatch = useAppDispatch();
    //const camo = await store.dispatch(getCamo()).unwrap();
    //const camo = getCamo();
    //console.log('camo = ', camo.name);
    //const camo = await dispatch(getCamo()).unwrap();
    switch (this.type) {
      case 4:
        this.width = (step * 4) * this.scale;
        this.height = (step - 4) * this.scale;

        const bodySprite0 = this.scene.add.sprite('ship-body-type-4', 0, 0, this.width, this.height);
        
        //this.bodySprite.angle = 180;
        this.mainContainer.setInteractiveRect(this.width, this.height);
        this.detaliSprite = this.scene.add.sprite('ship-detail-type-4', 0, 0, this.width, this.height);
        this.mainContainer.add(bodySprite0);
        if(this.camo.name!=='none'){
          this.bodySprite = this.scene.add.sprite(this.camo.name, 0, 0, this.width, this.height);
          this.bodySprite.setMask('ship-body-type-4');
          this.mainContainer.add(this.bodySprite);
        }
        this.mainContainer.add(this.detaliSprite);
        //this.mainContainer.add([bodySprite0, this.bodySprite, this.detaliSprite]);
        this.mainContainer.angle = this.angle;
        const arrPosGuns = [
          { x: -42 * this.scale, y: 0, angle: 0 },
          { x: -25 * this.scale, y: 0, angle: 0 },
          { x: 52 * this.scale, y: 0, angle: 180 },
          { x: 38 * this.scale, y: 0, angle: 180 },
        ];
        for (let i = 0; i < arrPosGuns.length; i++) {
          const gunPos = arrPosGuns[i];
          const gunTower = new GunTower(this.scene, gunPos.x, gunPos.y, this, gunPos.angle, this.scale);
          this.mainContainer.add(gunTower.mainContainer);
          this.gunTowers.push(gunTower);
        }
        //console.log(this.mainContainer.interactiveRect);
        break;
      case 3:

        this.width = (step * 3) * this.scale;
        this.height = (step - 5) * this.scale;

        const bodySprite1 = this.scene.add.sprite('ship-body-type-3', 0, 0, this.width, this.height);
        this.mainContainer.setInteractiveRect(this.width, this.height);
        this.detaliSprite = this.scene.add.sprite('ship-detail-type-3', 0, 0, this.width, this.height);
        this.mainContainer.add(bodySprite1);
        if(this.camo.name!=='none'){
          this.bodySprite = this.scene.add.sprite(this.camo.name, 0, 0, this.width, this.height);
          this.bodySprite.setMask('ship-body-type-3');
          this.mainContainer.add(this.bodySprite);
        }
        this.mainContainer.add(this.detaliSprite);
        //this.mainContainer.add([this.bodySprite, this.detaliSprite]);
        this.mainContainer.angle = this.angle;
        const arrPosGuns2 = [
          { x: -24 * this.scale, y: 0, angle: 0 },
          { x: -12 * this.scale, y: 0, angle: 0 },
          { x: 38 * this.scale, y: 0, angle: 180 },
        ];
        for (let i = 0; i < arrPosGuns2.length; i++) {
          const gunPos = arrPosGuns2[i];
          const gunTower = new GunTower(this.scene, gunPos.x, gunPos.y, this, gunPos.angle, this.scale);
          this.mainContainer.add(gunTower.mainContainer);
          this.gunTowers.push(gunTower);
        }
        break;
      case 2:

        this.width = (step * 2) * this.scale;
        this.height = (step - 8) * this.scale;
        const bodySprite2 = this.scene.add.sprite('ship-body-type-2', 0, 0, this.width, this.height);
        this.detaliSprite = this.scene.add.sprite('ship-detail-type-2', 0, 0, this.width, this.height);
        this.mainContainer.setInteractiveRect(this.width, this.height);
        this.mainContainer.add(bodySprite2);
        if(this.camo.name!=='none'){
          this.bodySprite = this.scene.add.sprite(this.camo.name, 0, 0, this.width, this.height);
          this.bodySprite.setMask('ship-body-type-2');
          this.mainContainer.add(this.bodySprite);
        }
        this.mainContainer.add(this.detaliSprite);
        //this.mainContainer.add([this.bodySprite, this.detaliSprite]);
        this.mainContainer.angle = this.angle;
        const arrPosGuns3 = [
          { x: -16 * this.scale, y: 0, angle: 0 },
          { x: 23 * this.scale, y: 0, angle: 180 },
        ];
        for (let i = 0; i < arrPosGuns3.length; i++) {
          const gunPos = arrPosGuns3[i];
          const gunTower = new GunTower(this.scene, gunPos.x, gunPos.y, this, gunPos.angle, this.scale);
          this.mainContainer.add(gunTower.mainContainer);
          this.gunTowers.push(gunTower);
        }
        break;
      case 1:
        this.width = (step * 1) * this.scale;
        this.height = (step - 16) * this.scale;
        const bodySprite3 = this.scene.add.sprite('ship-body-type-1', 0, 0, this.width, this.height);
        this.detaliSprite = this.scene.add.sprite('ship-detail-type-1', 0, 0, this.width, this.height);
        this.mainContainer.setInteractiveRect(this.width, this.height);
        this.mainContainer.add(bodySprite3);
        if(this.camo.name!=='none'){
          this.bodySprite = this.scene.add.sprite(this.camo.name, 0, 0, this.width, this.height);
          this.bodySprite.setMask('ship-body-type-1');
          this.mainContainer.add(this.bodySprite);
        }
        this.mainContainer.add(this.detaliSprite);
        //this.mainContainer.add([this.bodySprite, this.detaliSprite]);
        this.mainContainer.angle = this.angle;
        let arrPosGuns4 = [
          { x: -6 * this.scale, y: 0, angle: 0 },
        ];
        for (let i = 0; i < arrPosGuns4.length; i++) {
          const gunPos = arrPosGuns4[i];
          const gunTower = new GunTower(this.scene, gunPos.x, gunPos.y, this, gunPos.angle, this.scale);
          this.mainContainer.add(gunTower.mainContainer);
          this.gunTowers.push(gunTower);
        }
        break;

      default:
        break;
    }
  }

  destroy(){
    this.setDead();
    this.scene.add.remove(this.mainContainer);
  }

  setDead(){
    this.isLive = false;
  }

  isHasPrevPosField() {
    if (this.posOnField.x !== initPos.x) {
      return true;
    }

    return false;
  }

  private fnFindCell(cId:TCellObjId, cellId:TCellObjId){
    if(cId.col===cellId.col&&cId.row===cellId.row){
      return true;
    }
    return false;
  }

  findCell(cellId:TCellObjId){
    let findedId = undefined;
    if(this.cellsOnField){
      findedId = this.cellsOnField.main.find(cId=>this.fnFindCell(cId, cellId));
      if(!findedId){
        findedId = this.cellsOnField.sup.find(cId=>this.fnFindCell(cId, cellId));
      }
      //return this.cellsOnField.main.find(cId=>this.fnFindCell(cId, cellId));
    }
    return findedId;
  }

  pointerDown(point: TPointer) {
    //console.log('pointerdown!!!!');
    if(!this.isPointerDown){
      this.isPointerDown = true;
      this.dx = this.x - point.x;
      this.dy = this.y - point.y;
      this.timerClick = Date.now();
      //console.log('this.timerClick = ', this.timerClick);
      this.mainContainer.setZindex(2);
      this.scene.plField?.upShip(this);
    }
    
  }

  pointerUp() {
    if (this.isPointerDown) {
      //console.log('this.timerClick = ', Date.now() - this.timerClick, ' || ', this.timeIsClick);
      if (Date.now() - this.timerClick <= this.timeIsClick) {
        if (this.angle === 90) {
          if (!this.scene.plField?.isOnField(this)) {
            this.angle = 0;
            this.setOnStart();
          }else{
            this.scene.plField?.rotateShip(this);
          }
        }else{
          if (!this.scene.plField?.isOnField(this)) {
            this.angle = 90;
            this.setOnStart();
          }else{
            this.scene.plField?.rotateShip(this);
          }
        }
      } else {
        
        this.scene.plField?.dropShip(this);
      }
      this.mainContainer.setZindex(0);
      //this.dropShip();
      //console.log('pointerUp set false');
      this.isPointerDown = false;
    }
  }

  pointerMove(point: TPoint) {
    if (this.isPointerDown) {
      this.x = point.x + this.dx;
      this.y = point.y + this.dy;
      this.scene.plField?.colligionShip(this);
    }
  }

  pointerSet(point: TPointer){
    if(this.isCanShot){
      return;
    }
    this.setTarget(point);
  }

  setTarget(point: TPointer){
    //setTimeout(()=>this.isOnTarget = false);
    
    this.targetPos.x = point.x;
    this.targetPos.y = point.y;
    this.gunTowers.forEach(g=>g.isOnTarget = false);
    //this.isOnTarget = false;
  }

  setShotTarget(cell: ICell){
    this.isCanShot = true;
    this.cellTarget = cell;
    this.setTarget({x:cell.pos.center.x, y:cell.pos.center.y});
  }

  setOnField() {
    //console.log('posOnField = ', this.posOnField, '||', initPos);
    if (this.posOnField.x !== initPos.x) {
      //console.log('setOnField');
      this.x = this.posOnField.x;
      this.y = this.posOnField.y;
      //console.log(this.mainContainer.x,'||',this.mainContainer.y);
    } else {
      this.setOnStart();
    }
  }

  setOnStart() {
    //console.log('setOnStart');
    this.x = this.startPos.x;
    this.y = this.startPos.y;
    this.cellsOnField = null;
    this.posOnField = { ...initPos };
  }

  setCellsOnField(cells: TCells) {
    this.cellsOnField = cells;
  }

  setPosOnField(pos: TPoint) {
    this.posOnField.x = pos.x;
    this.posOnField.y = pos.y;
  }

  setDot(dot: TPoint) {
    this.toDot = dot;
    const dX = dot.x - this.x;
    const dY = dot.y - this.y;
    const angle = Math.atan2(dY, dX);
    const grad = angle / Math.PI * 180;
    if (this.isRot) {
      this.angle = grad + 180;
    }
    this.sx = this.speed * Math.cos(angle);
    this.sy = this.speed * Math.sin(angle);
    setTimeout(() => this.isOnDot = false);
    //console.log(this.sx, '||', this.sy);
  }

  gunShot(_: GunTower){
    this.numShutTowers++;
    if(this.numShutTowers>=this.gunTowers.length){
      this.isCanShot = false;
      this.numShutTowers = 0;
      this.scene.shipShot(this);
    }
  }

  goToDot() {
    if (this.isOnDot) {
      return;
    }
    //console.log('goToDot!!!');
    const speed = Math.abs(this.speed);

    if ((this.x >= this.toDot.x - speed && this.x <= this.toDot.x + speed) && (this.y >= this.toDot.y - speed && this.y <= this.toDot.y + speed)) {
      this.isOnDot = true;
      this.x = this.toDot.x;
      this.y = this.toDot.y;
      return;
    }

    this.x += this.sx;
    this.y += this.sy;
  }

  update() {
    if(!this.isLive){
      return;
    }
    //console.log('id = ', this.id);
    //console.log(this.angle);
    this.goToDot();
    this.mainContainer.x = this.x;
    this.mainContainer.y = this.y;
    this.mainContainer.angle = this.angle;
    this.gunTowers.forEach((tower) => tower.update());
  }
}