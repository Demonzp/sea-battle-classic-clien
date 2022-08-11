import Container from './Container';
import { TPoint } from './Game';
import { TCallbackData, TPointer } from './InputEvent';
import Scene from './Scene';

export type TGameObjectEvents = 'pointerdown';

export type TBodyRect = {
  width: number,
  height: number,
  halfWidth: number,
  halfHeight: number,
  x:number,
  y:number
};

export type TGameObjectNames = 'Sprite'|'Container';
export type TParetGameObject = Scene | Container;

export default class GameObject{
  scene: Scene;
  name: TGameObjectNames;
  key: string;
  id: string;
  private _x: number;
  private _y: number;
  private _halfWidth: number;
  private _halfHeight: number;
  center: TPoint;
  private _width: number;
  private _height: number;
  private _interactiveBodyRect: TBodyRect;
  angle: number;
  private _parent: TParetGameObject;
  pointerDownCallbacks: TCallbackData[] = [];


  constructor(scene: Scene, key: string, name: TGameObjectNames, x=0, y=0, width=0, height=0, angle=0){
    this.scene = scene;
    this._parent = scene;
    this.id = scene.game.createId();
    this.key = key;
    this.name = name;
    this._x = x;
    this._y = y;
    this._width = width;
    this._height = height;
    this.angle = angle;
    this._halfHeight = this.height/2;
    this._halfWidth = this.width/2;
    this._interactiveBodyRect = {
      width,
      height,
      halfHeight: this._halfHeight,
      halfWidth: this._halfWidth,
      x:0,
      y:0
    }
    this.center = {
      x: this._x - this.width/2,
      y: this._y - this.height/2
    }

    this.init();
  }

  get x():number{
    return this._x;
  }

  set x(val: number){
    this._x = val;
    this.changeCenter();
  }

  get y():number{
    return this._y;
  }

  set y(val: number){
    this._y = val;
    this.changeCenter();
  }

  get width(): number{
    return this._width;
  }

  set width(val: number){
    this._width = val;
    this._halfWidth = val/2;
    if(this.name==='Sprite'){
      this.setInteractiveRect(this._width, this._height, this._interactiveBodyRect.x, this._interactiveBodyRect.y);
      this.changeCenter();
    }
  }

  get height(): number{
    return this._height;
  }

  set height(val: number){
    this._height = val;
    this._halfHeight = val/2;
    if(this.name==='Sprite'){
      this.setInteractiveRect(this._width, this._height, this._interactiveBodyRect.x, this._interactiveBodyRect.y);
      this.changeCenter();
    }
  }

  get parent(): TParetGameObject{
    return this._parent;
  }

  set parent(parent: Scene|Container){
    this._parent = parent;
  }

  setInteractiveRect(width: number, height: number, x?:number, y?: number){
    const x0 = x?x:0;
    let y0 = y?y:0;
    if(x&&!y){
      y0 = x0;
    }
    this._interactiveBodyRect = {
      width,
      height,
      halfHeight: height/2,
      halfWidth: width/2,
      x: x0,
      y: y0
    };
  }

  on(event: TGameObjectEvents, handler: (pointer: TPointer)=>void, context?:any){
    switch (event) {
      case 'pointerdown':
        const id = this.scene.input.on(event, this.onPointerdown, this);
        this.pointerDownCallbacks.push({
          id,
          handler: handler.bind(context)
        });
        break;
    
      default:
        break;
    }
  }

  getGlobalPos():TPoint{
    if(this._parent instanceof Container){
      const parentPos = this._parent.getGlobalPos();
      return {
        x: parentPos.x + this.x,
        y: parentPos.y + this.y
      }
    }else{
      return{
        x: this.x,
        y: this.y
      }
    }
  } 

  off(id: string){
    this.scene.input.off(id);
    this.pointerDownCallbacks = this.pointerDownCallbacks.filter(callData=>callData.id!==id);
  }

  isOnPointerDown(pointer: TPointer): GameObject|undefined{
    if(this.pointerDownCallbacks.length<=0){
      return;
    }

    if(this._parent instanceof Container){
      const globalPos = this.getGlobalPos();
      const x0 = globalPos.x - this._interactiveBodyRect.halfWidth;
      const y0 = globalPos.y - this._interactiveBodyRect.halfHeight;
      const x1 = globalPos.x + this._interactiveBodyRect.halfWidth;
      const y1 = globalPos.y + this._interactiveBodyRect.halfHeight;

      if((pointer.x>=x0&&pointer.x<=x1)&&(pointer.y>=y0&&pointer.y<=y1)){
        return this;
      }
    }else{
      if((pointer.x>=this.x-this._interactiveBodyRect.halfWidth&&pointer.x<=this.x+this._interactiveBodyRect.halfWidth)&&(pointer.y>=this.y-this._interactiveBodyRect.halfHeight&&pointer.y<=this.y+this._interactiveBodyRect.halfHeight)){
        return this;
      }
    }
  }

  onPointerdown(pointer: TPointer){
    // if(this.pointerDownCallbacks.length<=0){
    //   return;
    // }
    // if(this._parent instanceof Container){
    //   const globalPos = this.getGlobalPos();
    //   const x0 = globalPos.x - this._interactiveBodyRect.halfWidth;
    //   const y0 = globalPos.y - this._interactiveBodyRect.halfHeight;
    //   const x1 = globalPos.x + this._interactiveBodyRect.halfWidth;
    //   const y1 = globalPos.y + this._interactiveBodyRect.halfHeight;

    //   if((pointer.x>=x0&&pointer.x<=x1)&&(pointer.y>=y0&&pointer.y<=y1)){
    //     this.pointerDownCallbacks.forEach(callData=>{
    //       callData.handler(pointer);
    //     });
    //   }
    // }else{
    //   if((pointer.x>=this.x-this._interactiveBodyRect.halfWidth&&pointer.x<=this.x+this._interactiveBodyRect.halfWidth)&&(pointer.y>=this.y-this._interactiveBodyRect.halfHeight&&pointer.y<=this.y+this._interactiveBodyRect.halfHeight)){
    //     this.pointerDownCallbacks.forEach(callData=>{
    //       callData.handler(pointer);
    //     });
    //   }
    // }

    this.pointerDownCallbacks.forEach(callData=>{
      callData.handler(pointer);
    });
    
  }

  init(){
    this.scene.add.registerGameObject(this);
  }

  private changeCenter(){
    this.center.x = this._x - this._halfWidth;
    this.center.y = this._y - this._halfHeight;
  }

  render(){

  }
}