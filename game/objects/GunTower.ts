import Container from '../../gameLib/Container';
import Graphics from '../../gameLib/Graphics';
import Scene from '../../gameLib/Scene';
import Sprite from '../../gameLib/Sprite';
import Ship, { TShips } from './Ship';

export default class GunTower {
  scene: Scene;
  x: number;
  y: number;
  type: TShips;
  angle: number;
  scale: number;
  mainContainer: Container;
  graphics: Graphics;
  bodySprite: Sprite | null = null;
  detailSprite: Sprite | null = null;
  _ship: Ship | null = null;
  speedRot = 2;
  rotCorect = 0;
  isOnTarget = true;

  constructor(scene: Scene, x: number, y: number, parent: Ship, angle = 0, scale = 1) {
    this.scene = scene;
    this.x = x;
    this.y = y;
    this.angle = angle;
    this.rotCorect = angle;
    this.scale = scale;
    this._ship = parent;
    this.type = parent.type;
    this.mainContainer = scene.add.container(x, y);
    this.graphics = scene.add.graphics();

    this.create();
  }

  get ship() {
    return this._ship!;
  }

  create() {
    switch (this.type) {
      case 4:
        this.bodySprite = this.scene.add.sprite('gun-body-type-3', -4 * this.scale, 0, 26 * this.scale, 14 * this.scale);
        this.detailSprite = this.scene.add.sprite('gun-detail-type-3', -4 * this.scale, 0, 26 * this.scale, 14 * this.scale);
        this.mainContainer.add([this.bodySprite, this.detailSprite]);
        this.mainContainer.angle = this.angle;
        break;
      case 3:
        this.bodySprite = this.scene.add.sprite('gun-body-type-2', -4.2 * this.scale, 0, 24 * this.scale, 12 * this.scale);
        this.detailSprite = this.scene.add.sprite('gun-detail-type-2', -4.2 * this.scale, 0, 24 * this.scale, 12 * this.scale);
        this.mainContainer.add([this.bodySprite, this.detailSprite]);
        this.mainContainer.angle = this.angle;
        break;

      case 2:
        this.bodySprite = this.scene.add.sprite('gun-body-type-2', -4.2 * this.scale, 0, 20 * this.scale, 10 * this.scale);
        this.detailSprite = this.scene.add.sprite('gun-detail-type-2', -4.2 * this.scale, 0, 20 * this.scale, 10 * this.scale);
        this.mainContainer.add([this.bodySprite, this.detailSprite]);
        this.mainContainer.angle = this.angle;
        break;

      case 1:
        this.bodySprite = this.scene.add.sprite('gun-body-type-1', -4.2 * this.scale, 0, 16 * this.scale, 6 * this.scale);
        this.detailSprite = this.scene.add.sprite('gun-detail-type-1', -4.2 * this.scale, 0, 16 * this.scale, 6 * this.scale);
        this.mainContainer.add([this.bodySprite, this.detailSprite]);
        this.mainContainer.angle = this.angle;
        break;

      default:
        break;
    }

    this.graphics.fillStyle('red');

    let kY = Math.sin(this.ship.angle * Math.PI / 180);
    let kX = Math.cos(this.ship.angle * Math.PI / 180);
    let realX = this.ship.x + this.x * kX - this.y * kY;
    let realY = this.ship.y + this.x * kY + this.y * kX;

    this.graphics.fillRect(realX-5, realY-5, 10,10);
  }

  rotate() {
    if (this.isOnTarget) {
      return;
    }
    const kY = Math.sin(this.ship.angle * Math.PI / 180);
    const kX = Math.cos(this.ship.angle * Math.PI / 180);

    const realX = this.ship.x + this.x * kX - this.y * kY;
    const realY = this.ship.y + this.x * kY + this.y * kX;
    
    //console.log(this.ship.targetPos);
    const mDx = realX - this.ship.targetPos.x;
    const mDy = realY - this.ship.targetPos.y;
    const mAngle = Math.atan2(mDy, mDx);
    const mAngle2 = mAngle / Math.PI * 180;
    let dAngle = this.ship.angle + this.angle - mAngle2;
    //console.log(mAngle2*-1);
    // if(this.rotCorect===180){
    //   dAngle = -360 + dAngle;
    // }
    // if (dAngle >= 180) {
    //   this.angle = -360 + this.angle;
    // } else if (dAngle <= -180) {
    //   this.angle = 360 + this.angle;
    // }
    // console.log(dAngle);
    if (Math.abs(dAngle) <= this.speedRot) {

      this.isOnTarget = true;
      this.angle = mAngle2-this.ship.angle;
      //this.angle -= this.speedRot;
      console.log(this.angle);
      //this.isCanShot();
      console.log('isOnTarget');
    } else if (dAngle > 0) {
      this.angle -= this.speedRot;
    } else if (dAngle < 0) {
      this.angle += this.speedRot;
    }

    // if (dAngle >= 180) {
    //   dAngle = -360 + dAngle;
    // } else if (dAngle < -180) {
    //   dAngle = 360 + dAngle;
    // }
    // //console.log('dAngle = ', dAngle);
    // if (Math.abs(dAngle) < this.speedRot) {
    //   //console.log("приехали");
    //   dAngle = 0;
    //   //this.parent.is_induced = true;

    //   this.speedRot -= dAngle;
    //   //console.log("this.obj.angle= ", this.obj.angle);
    // } else if (dAngle > 0) {
    //   //this.parent.is_induced = false;
    //   //trace("dAngleD2 > 0");
    //   this.angle -= this.speedRot;
    // } else if (dAngle < 0) {
    //   //this.parent.is_induced = false;
    //   //trace("dAngleD2 < 0");
    //   this.angle += this.speedRot;
    // }
  }

  update() {
    this.rotate();
    this.mainContainer.angle = this.angle;
  }
}