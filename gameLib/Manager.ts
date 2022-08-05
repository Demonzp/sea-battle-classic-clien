import GameObject from './GameObject';
import Scene from './Scene';
import Sprite from './Sprite';

export default class Manager{
  scene: Scene;
  gameObjects: GameObject[] = [];

  constructor(scene: Scene){
    this.scene = scene;
  }

  // _sprite(scene:Scene , key:string, x?:number, y?:number){
  //   const sprite = new Sprite(scene, key, x, y);
  // }

  sprite(key:string, x?:number, y?:number, width?:number, height?:number){
    new Sprite(this.scene, key, x, y, width, height);
    //this._sprite(scene, key, x, y);
  }

  registerGameObject(obj: GameObject){
    this.gameObjects.push(obj);
  }
}