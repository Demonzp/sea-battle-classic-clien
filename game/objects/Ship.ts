import Container from '../../gameLib/Container';
import { TPoint } from '../../gameLib/Game';
import { TPointer } from '../../gameLib/InputEvent';
import Scene from '../../gameLib/Scene';
import Sprite from '../../gameLib/Sprite';
import FleatShema from '../scenes/FleatShema';
import GunTower from './GunTower';

export type TShips = 4|3|2|1;

const initPos = {
  x:0,
  y:0
}

export default class Ship{
  scene: FleatShema;
  id: string;
  x: number;
  y: number;
  angle: number;
  type: TShips;
  scale: number;
  mainContainer: Container;
  bodySprite: Sprite|null = null;
  detaliSprite: Sprite|null = null;
  gunTowers: GunTower[] = [];
  isOnDot = false;
  isPointerDown = false;
  isRot = false;
  toDot: TPoint = initPos;
  posOnField:TPoint = initPos;
  cellOnField = {i:-1,j:-1};
  startPos:TPoint;
  speed = 4;
  sx = 0;
  sy = 0;
  dx = 0;
  dy = 0;
  timerClick = 0;
  readonly timeIsClick = 140;

  constructor(scene: FleatShema, x: number, y: number, type:TShips, angle=0, scale=1){
    this.scene = scene;
    this.id = scene.createId();
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

  create(){
    const lineWidth = 2;
    const min = Math.min(this.scene.width, this.scene.height);
    const step = (min-lineWidth)/11;
    switch (this.type) {
      case 4:

        this.bodySprite = this.scene.add.sprite('ship-body-type-4', 0,0, (step*4)*this.scale, (step-4)*this.scale);
        this.mainContainer.setInteractiveRect((step*4)*this.scale, (step-3)*this.scale);
        this.detaliSprite = this.scene.add.sprite('ship-detail-type-4', 0,0, (step*4)*this.scale, (step-4)*this.scale);
        this.mainContainer.add([this.bodySprite, this.detaliSprite]);
        this.mainContainer.angle = this.angle;
        const arrPosGuns = [
          {x:-42*this.scale,y:0,angle:0},
          {x:-25*this.scale, y:0, angle: 0},
          {x:52*this.scale, y:0, angle:180},
          {x:38*this.scale, y:0, angle:180},
        ];
        for (let i = 0; i < arrPosGuns.length; i++) {
          const gunPos = arrPosGuns[i];
          const gunTower = new GunTower(this.scene, gunPos.x, gunPos.y, 4, gunPos.angle, this.scale);
          this.mainContainer.add(gunTower.mainContainer);
          this.gunTowers.push(gunTower);
        }
        console.log(this.mainContainer.interactiveRect);
        break;
      case 3:

        this.bodySprite = this.scene.add.sprite('ship-body-type-3', 0,0, (step*3)*this.scale, (step-5)*this.scale);
        this.mainContainer.setInteractiveRect((step*3)*this.scale, (step-4)*this.scale);
        this.detaliSprite = this.scene.add.sprite('ship-detail-type-3', 0,0, (step*3)*this.scale, (step-5)*this.scale);
        this.mainContainer.add([this.bodySprite, this.detaliSprite]);
        this.mainContainer.angle = this.angle;
        const arrPosGuns2 = [
          {x:-24*this.scale,y:0,angle:0},
          {x:-12*this.scale, y:0, angle: 0},
          {x:38*this.scale, y:0, angle:180},
        ];
        for (let i = 0; i < arrPosGuns2.length; i++) {
          const gunPos = arrPosGuns2[i];
          const gunTower = new GunTower(this.scene, gunPos.x, gunPos.y, 3, gunPos.angle, this.scale);
          this.mainContainer.add(gunTower.mainContainer);
          this.gunTowers.push(gunTower);
        }
        break;
      case 2:

        this.bodySprite = this.scene.add.sprite('ship-body-type-2', 0,0, (step*2)*this.scale, (step-8)*this.scale);
        this.detaliSprite = this.scene.add.sprite('ship-detail-type-2', 0,0, (step*2)*this.scale, (step-8)*this.scale);
        this.mainContainer.setInteractiveRect((step*2)*this.scale, (step-6)*this.scale);
        this.mainContainer.add([this.bodySprite, this.detaliSprite]);
        this.mainContainer.angle = this.angle;
        const arrPosGuns3 = [
          {x:-16*this.scale,y:0,angle:0},
          {x:23*this.scale, y:0, angle: 180},
        ];
        for (let i = 0; i < arrPosGuns3.length; i++) {
          const gunPos = arrPosGuns3[i];
          const gunTower = new GunTower(this.scene, gunPos.x, gunPos.y, 2, gunPos.angle, this.scale);
          this.mainContainer.add(gunTower.mainContainer);
          this.gunTowers.push(gunTower);
        }
        break;
      case 1:

        this.bodySprite = this.scene.add.sprite('ship-body-type-1', 0,0, (step*1)*this.scale, (step-16)*this.scale);
        this.detaliSprite = this.scene.add.sprite('ship-detail-type-1', 0,0, (step*1)*this.scale, (step-16)*this.scale);
        this.mainContainer.setInteractiveRect((step*1)*this.scale, (step-14)*this.scale);
        this.mainContainer.add([this.bodySprite, this.detaliSprite]);
        this.mainContainer.angle = this.angle;
        let arrPosGuns4 = [
          {x:-6*this.scale, y:0, angle: 0},
        ];
        for (let i = 0; i < arrPosGuns4.length; i++) {
          const gunPos = arrPosGuns4[i];
          const gunTower = new GunTower(this.scene, gunPos.x, gunPos.y, 1, gunPos.angle, this.scale);
          this.mainContainer.add(gunTower.mainContainer);
          this.gunTowers.push(gunTower);
        }
        break;
      
      default:
        break;
    }
  }

  setOnPlayerField(pos:TPoint){
    this.posOnField = pos;
    this.x = pos.x;
    this.y = pos.y;
  }

  setCellOnField(cellIdx:{i:number,j:number}){
    this.cellOnField = cellIdx;
  }

  dropShip(){
    if(this.scene.plField?.isOnField(this) && this.posOnField.x!==initPos.x){
      console.log('this.posOnField');
      this.x = this.posOnField.x;
      this.y = this.posOnField.y;
      //this.scene.plField?.renderShipCells(this);
    }else{
      console.log('remove From Field!');
      this.x = this.startPos.x;
      this.y = this.startPos.y;
      this.posOnField = initPos;
      this.scene.plField?.removeShip(this);
    }
  }

  pointerDown(point:TPointer){
    console.log('pointerdown!!!!');
    this.isPointerDown = true;
    this.dx = this.x-point.x;
    this.dy = this.y-point.y;
    this.timerClick = Date.now();
    this.scene.plField?.getShip(this);
  }

  pointerUp(){
    if(this.isPointerDown){
      if(Date.now()-this.timerClick<=this.timeIsClick){
        console.log('ROTATE!!!');
        if(this.angle===90){
          if(!this.scene.plField?.isHasShip(this)){
            this.angle = 0;
            this.dropShip();
          }else{
            this.scene.plField?.rotateShip(this);
            // this.angle = 0;
            // const isCanRotate = this.scene.plField?.calcFromStartCell({...this.cellOnField,typeShip:this.type,angle:this.angle}, this);
            // if(!isCanRotate){
            //   this.angle = 90;
            //   this.scene.plField?.getShip(this);
            //   this.scene.plField?.calcFromStartCell({...this.cellOnField,typeShip:this.type,angle:this.angle}, this);
            // }else{
            //   //this.scene.plField?.calcFromStartCell({...this.cellOnField,typeShip:this.type,angle:this.angle}, this);
            //   this.scene.plField?.dropShip(this);
            // }
          }
        }else{
          if(!this.scene.plField?.isHasShip(this)){
            this.angle = 90;
            this.dropShip();
          }else{
            this.scene.plField?.rotateShip(this);
            // this.angle = 90;
            // const isCanRotate = this.scene.plField?.calcFromStartCell({...this.cellOnField,typeShip:this.type,angle:this.angle}, this);
            // if(!isCanRotate){
            //   this.angle = 0;
            //   this.scene.plField?.getShip(this);
            //   this.scene.plField?.calcFromStartCell({...this.cellOnField,typeShip:this.type,angle:this.angle}, this);
            // }else{
            //   //this.scene.plField?.getShip(this);
            //   //this.scene.plField?.calcFromStartCell({...this.cellOnField,typeShip:this.type,angle:this.angle}, this);
            //   this.scene.plField?.dropShip(this);
            // }
          }
        }
      }else{
        console.log('pointerUp dropShip');
        //this.scene.plField?.calcFromStartCell({...this.cellOnField,typeShip:this.type,angle:this.angle}, this);
        this.scene.plField?.dropShip(this);
      }
    }
    this.isPointerDown = false;
  }

  pointerMove(point: TPoint){
    //console.log('this.isPointerDown = ', this.isPointerDown);
    if(this.isPointerDown){
      this.x=point.x+this.dx;
      this.y=point.y+this.dy;
      this.scene.plField?.colligionShip(this);
    }
  }

  setDot(dot: TPoint){
    this.toDot = dot;
    const dX = dot.x - this.x;
    const dY = dot.y - this.y;
    const angle = Math.atan2(dY, dX);
    const grad = angle/Math.PI*180;
    if(this.isRot){
      this.angle = grad+180;
    }
    this.sx = this.speed*Math.cos(angle);
    this.sy = this.speed*Math.sin(angle);
    setTimeout(()=>this.isOnDot = false);
    //console.log(this.sx, '||', this.sy);
  }

  goToDot(){
    if(this.isOnDot){
      return;
    }
    const speed = Math.abs(this.speed);

    if((this.x>=this.toDot.x-speed&&this.x<=this.toDot.x+speed)&&(this.y>=this.toDot.y-speed&&this.y<=this.toDot.y+speed)){
      this.isOnDot = true;
      this.x = this.toDot.x;
      this.y = this.toDot.y;
      return;
    }

    this.x+=this.sx;
    this.y+=this.sy;
  }

  update(){
    this.goToDot();
    this.mainContainer.x = this.x;
    this.mainContainer.y = this.y;
    this.mainContainer.angle = this.angle;
    this.gunTowers.forEach((tower)=>tower.update());
  }
}