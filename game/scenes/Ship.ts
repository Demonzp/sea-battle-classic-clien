import Container from '../../gameLib/Container';
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
          const gunTower = new GunTower(this.scene, gunPos.x, gunPos.y, 3, gunPos.angle, this.scale);
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
          const gunTower = new GunTower(this.scene, gunPos.x, gunPos.y, 2, gunPos.angle, this.scale);
          this.mainContainer.add(gunTower.mainContainer);
          this.gunTowers.push(gunTower);
        }
        break;
    
      default:
        break;
    }
  }

  update(){
    this.gunTowers.forEach((tower)=>tower.update());
  }
}