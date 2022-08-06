import GameObject from './GameObject';
import Graphics from './Graphics';
import Scene from './Scene';
import Sprite from './Sprite';

export default class Manager{
  scene: Scene;
  gameObjects: (GameObject|Graphics)[] = [];

  constructor(scene: Scene){
    this.scene = scene;
  }
  
  graphics(): Graphics{
    console.log('register graphics');
    return new Graphics(this.scene);
  }

  sprite(key:string, x?:number, y?:number, width?:number, height?:number): Sprite{
    return new Sprite(this.scene, key, x, y, width, height);
    //this._sprite(scene, key, x, y);
  }

  registerGameObject(obj: GameObject|Graphics){
    this.gameObjects.push(obj);
  }
}