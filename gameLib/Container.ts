import GameObject, { TGameObjectEvents } from './GameObject';
import Graphics from './Graphics';
import { TPointer } from './InputEvent';
import Scene from './Scene';

export default class Container extends GameObject{

  children: GameObject[] = [];
  pi = Math.PI/180;
  constructor(scene: Scene, x=0, y=0, width?:number, height?:number){
    super(scene, 'container', 'Container', x, y, width, height);
  }

  add(data: GameObject|GameObject[]){
    this.scene.add.remove(data);
    if(Array.isArray(data)){
      data.forEach(obj=>{
        obj.parent = this;
      })
      this.children = this.children.concat(data);
    }else{
      data.parent = this;
      this.children.push(data);
    }

    this.render();
  }

  on(event: TGameObjectEvents, handler: (pointer: TPointer)=>void, context?:any){
    return super._on(event, handler, context);
  }

  setInteractiveRect(width: number, height: number, x?:number, y?:number){
    super.setInteractiveRect(width, height, x, y);
  }

  isOnPointer(pointer: TPointer): GameObject|undefined{
    let colligionObj = super.isOnPointer(pointer);
    if(colligionObj){
      return this;
    }

    for (let i = this.children.length-1; i >= 0; i--) {
      const obj = this.children[i];
      if(obj instanceof GameObject){
        colligionObj = obj.isOnPointer(pointer);
        if(colligionObj){
          return colligionObj;
        }
      }
    }
  }

  render(): void {
    this.children.forEach((obj)=>{
      if(obj instanceof GameObject){
        const prevX = obj.x;
        const prevY = obj.y;
        const prevAngle = obj.angle;

        // obj.x = obj.x + this.x;
        // obj.y = obj.y + this.y;
        //const x = obj.x + this.x;
        //const y = obj.y + this.y;
        //console.log('x,y = ', x, ' || ', y);
        const kX = Math.cos(this.angle*this.pi);
        const kY = Math.sin(this.angle*this.pi);
        //console.log('obj prev = ',y + obj.x*kY+obj.y*kX);
        const realX = this.x+obj.x*kX+obj.y*kY;
        const realY = this.y+obj.x*kY+obj.y*kX;
        obj.x = realX;
        obj.y = realY;
        //console.log('obj = ', obj.x, ' || ', obj.y);
        obj.angle = this.angle+prevAngle;
        obj.render();
        //this.scene.ctx?.restore();
        obj.x = prevX;
        obj.y = prevY;
        
        //console.log('obj befor = ', obj.x, ' || ', obj.y);
        obj.angle = prevAngle;
        obj.alpha = obj.alpha*this.alpha;
      }
    });
  }
}