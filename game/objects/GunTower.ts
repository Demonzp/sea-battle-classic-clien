import Container from '../../gameLib/Container';
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
  bodySprite: Sprite | null = null;
  detailSprite: Sprite | null = null;
  _ship: Ship | null = null;
  speedRot = 2;
  rotCorect = 0;

  constructor(scene: Scene, x: number, y: number, parent: Ship, angle = 0, scale = 1) {
    this.scene = scene;
    this.x = x;
    this.y = y;
    this.angle = angle;
    this.scale = scale;
    this._ship = parent;
    this.type = parent.type;
    this.mainContainer = scene.add.container(x, y);

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
  }

  rotate() {
    if(this.ship.isOnTarget){
      return;
    }
    let kY = Math.sin(this.ship.angle);
    let kX = Math.cos(this.ship.angle);

    let real_x = this.ship.x + this.x * kX + this.y * kY;
    let real_y = this.ship.y + this.x * kY + this.y * kX;

    let mDx2 = real_x - this.ship.targetPos.x;
    let mDy2 = real_y - this.ship.targetPos.y;
    let mAngle = Math.atan2(mDy2, mDx2);
    let mAngle2 = mAngle / Math.PI * 180;
    let dAngle = this.ship.angle + this.angle - mAngle2 + this.rotCorect;

    if (dAngle !== 0) {
      if (Math.abs(dAngle) !== 360) {
        //trace('??????');
        if (dAngle > 180) {
          dAngle = -360 + dAngle;
        } else if (dAngle < -180) {
          dAngle = 360 + dAngle;
        }
    
        if (Math.abs(dAngle) <= this.speedRot) {
          //dAngle = 0;
          this.ship.isOnTarget = true;
          this.angle -= dAngle;
        } else if (dAngle > 0) {
          this.angle -= this.speedRot;
        } else if (dAngle < 0) {
          this.angle += this.speedRot;
        }
      }
    }

    // if (dAngle >= 180) {
    //   dAngle = -360 + dAngle;
    // } else if (dAngle < -180) {
    //   dAngle = 360 + dAngle;
    // }
    // //console.log('dAngle = ', dAngle);
    // if (Math.abs(dAngle) < this.speedRot) {
    //   //console.log("????????????????");
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

  update(){
    this.rotate();
    this.mainContainer.angle = this.angle;
  }
}