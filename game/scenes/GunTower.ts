import Container from '../../gameLib/Container';
import Scene from '../../gameLib/Scene';
import Sprite from '../../gameLib/Sprite';
import { TShips } from './Ship';

export default class GunTower{
  scene: Scene;
  x: number;
  y: number;
  type: TShips;
  angle: number;
  scale: number;
  mainContainer: Container;
  bodySprite: Sprite|null = null;
  detailSprite: Sprite|null = null;

  constructor(scene: Scene, x: number, y: number, type: TShips, angle=0, scale=1){
    this.scene = scene;
    this.x = x;
    this.y = y;
    this.angle = angle;
    this.scale = scale;
    this.type = type;
    this.mainContainer = scene.add.container(x, y);

    this.create();
  }

  create(){
    switch (this.type) {
      case 4:
        this.bodySprite = this.scene.add.sprite('gun-body-type-3', -4*this.scale,0, 26*this.scale, 14*this.scale);
        this.detailSprite = this.scene.add.sprite('gun-detail-type-3', -4*this.scale,0, 26*this.scale, 14*this.scale);
        this.mainContainer.add([this.bodySprite, this.detailSprite]);
        this.mainContainer.angle = this.angle;
        break;
      case 3:
          this.bodySprite = this.scene.add.sprite('gun-body-type-2', -4.2*this.scale,0, 24*this.scale, 12*this.scale);
          this.detailSprite = this.scene.add.sprite('gun-detail-type-2', -4.2*this.scale,0, 24*this.scale, 12*this.scale);
          this.mainContainer.add([this.bodySprite, this.detailSprite]);
          this.mainContainer.angle = this.angle;
          break;
    
      case 2:
        this.bodySprite = this.scene.add.sprite('gun-body-type-2', -4.2*this.scale,0, 20*this.scale, 10*this.scale);
        this.detailSprite = this.scene.add.sprite('gun-detail-type-2', -4.2*this.scale,0, 20*this.scale, 10*this.scale);
        this.mainContainer.add([this.bodySprite, this.detailSprite]);
        this.mainContainer.angle = this.angle;
        break;

      case 1:
        this.bodySprite = this.scene.add.sprite('gun-body-type-1', -4.2*this.scale,0, 16*this.scale, 6*this.scale);
        this.detailSprite = this.scene.add.sprite('gun-detail-type-1', -4.2*this.scale,0, 16*this.scale, 6*this.scale);
        this.mainContainer.add([this.bodySprite, this.detailSprite]);
        this.mainContainer.angle = this.angle;
        break;
      
      default:
        break;
    }
  }

  update(){
    this.mainContainer.angle+=1;
  }
}