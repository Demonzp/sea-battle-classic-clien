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
  mainContainer: Container;
  bodySprite: Sprite|null = null;
  guns: GunTower|null = null;

  constructor(scene: Scene, x: number, y: number, type:TShips, angle=0){
    this.scene = scene;
    this.x = x;
    this.y = y;
    this.angle = angle;
    this.type = type;
    this.mainContainer = scene.add.container(x, y);

    this.create();
  }

  create(){
    switch (this.type) {
      case 3:
        const lineWidth = 2;
        const min = Math.min(this.scene.width, this.scene.height);
        const step = (min-lineWidth)/11;
        this.bodySprite = this.scene.add.sprite('ship-type-3', 0,0, step*3, step-2);
        this.mainContainer.add(this.bodySprite);
        this.mainContainer.angle = this.angle;
        break;
    
      default:
        break;
    }
  }
}