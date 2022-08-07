import GameObject from './GameObject';
import Graphics from './Graphics';
import Scene from './Scene';

export default class Container extends GameObject{

  children: (GameObject|Graphics)[] = [];

  constructor(scene: Scene, x=0, y=0, width?:number, height?:number){
    super(scene, 'container', x, y, width, height);
  }

  add(data: GameObject|Graphics|(GameObject|Graphics)[]){
    this.scene.add.remove(data);
    if(Array.isArray(data)){
      data.forEach((obj)=>{
        this._add(obj);
      });
      this.children = this.children.concat(data);
    }else{
      this._add(data);
      this.children.push(data);
    }
  }

  _add(obj: GameObject|Graphics){
    if(obj instanceof GameObject){
      obj.x = obj.x + this.x;
      obj.y = obj.y + this.y;
    }
  }

  render(): void {
    this.children.forEach((obj)=>{
      obj.render();
    });
  }
}