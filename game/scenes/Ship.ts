import Container from '../../gameLib/Container';
import { TPoint } from '../../gameLib/Game';
import Scene from '../../gameLib/Scene';
import Sprite from '../../gameLib/Sprite';
import GunTower from './GunTower';

export type TShips = 4|3|2|1;

export default class Ship{
  scene: Scene;
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
  isRot = false;
  toDot: TPoint = {x:0,y:0};
  speed = 4;
  sx = 0;
  sy = 0;

  constructor(scene: Scene, x: number, y: number, type:TShips, angle=0, scale=1){
    this.scene = scene;
    this.x = x;
    this.y = y;
    this.angle = angle;
    this.scale = scale
    this.type = type;
    this.mainContainer = scene.add.container(x, y);

    this.create();
  }

  create(){
    const lineWidth = 2;
    const min = Math.min(this.scene.width, this.scene.height);
    const step = (min-lineWidth)/11;
    switch (this.type) {
      case 4:

        this.bodySprite = this.scene.add.sprite('ship-body-type-4', 0,0, (step*4)*this.scale, (step-2)*this.scale);
        this.detaliSprite = this.scene.add.sprite('ship-detail-type-4', 0,0, (step*4)*this.scale, (step-2)*this.scale);
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
        break;
      case 3:

        this.bodySprite = this.scene.add.sprite('ship-body-type-3', 0,0, (step*3)*this.scale, (step-5)*this.scale);
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
    console.log(this.sx, '||', this.sy);
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