import GameObject from './GameObject';
import Graphics from './Graphics';
import Scene from './Scene';

export default class Container extends GameObject{

  children: (GameObject|Graphics)[] = [];
  pi = Math.PI/180;
  constructor(scene: Scene, x=0, y=0, width?:number, height?:number){
    super(scene, 'container', x, y, width, height);
  }

  add(data: GameObject|Graphics|(GameObject|Graphics)[]){
    this.scene.add.remove(data);
    if(Array.isArray(data)){
      this.children = this.children.concat(data);
    }else{
      this.children.push(data);
    }
    this.render();
  }

  render(): void {
    this.children.forEach((obj)=>{
      if(obj instanceof GameObject){
        const prevX = obj.x;
        const prevY = obj.y;
        const prevAngle = obj.angle;
        obj.x = obj.x + this.x;
        obj.y = obj.y + this.y;
        // const kX = Math.sin(this.angle*this.pi);
        // const kY = Math.cos(this.angle*this.pi);

        // obj.x = this.x+obj.x*kX+obj.y*kY;
        // obj.y = this.y+obj.x*kY+obj.y*kX;
        obj.angle = this.angle;
        obj.render();
        //this.scene.ctx?.restore();
        obj.x = prevX;
        obj.y = prevY;
        obj.angle = prevAngle;
      }
    });
  }
}