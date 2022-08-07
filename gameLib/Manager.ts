import Container from './Container';
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

  container(x?:number, y?:number, width?:number, height?:number): Container{
    return new Container(this.scene, x, y, width, height);
  }

  remove(data: GameObject|Graphics|(GameObject|Graphics)[]){
    if(Array.isArray(data)){
      for (let i = 0; i < data.length; i++) {
        const obj = data[i];
        this.gameObjects = this.gameObjects.filter(obj2=>obj2.id!==obj.id);
      }
    }else{
      this.gameObjects = this.gameObjects.filter(obj=>obj.id!==data.id);
    }
  }

  registerGameObject(obj: GameObject|Graphics){
    this.gameObjects.push(obj);
  }
}