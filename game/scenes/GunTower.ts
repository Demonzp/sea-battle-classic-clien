import Container from '../../gameLib/Container';
import Scene from '../../gameLib/Scene';
import Sprite from '../../gameLib/Sprite';
import { TShips } from './Ship';

export default class GunTower{
  scene: Scene;
  x: number;
  y: number;
  type: TShips;
  mainContainer: Container;
  bodySprite: Sprite|null = null;

  constructor(scene: Scene, x: number, y: number, type: TShips){
    this.scene = scene;
    this.x = x;
    this.y = y;
    this.type = type;
    this.mainContainer = scene.add.container(x, y);

    this.create();
  }

  create(){
    
  }
}