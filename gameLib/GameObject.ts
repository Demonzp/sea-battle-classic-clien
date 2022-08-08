import { TPoint } from './Game';
import Scene from './Scene';

export default class GameObject{
  scene: Scene;
  key: string;
  id: string;
  private _x: number;
  private _y: number;
  private _halfWidth: number;
  private _halfHeight: number;
  center: TPoint;
  private _width: number;
  private _height: number;
  angle: number;

  constructor(scene: Scene, key: string, x=0, y=0, width=0, height=0, angle=0){
    this.scene = scene;
    this.id = scene.game.createId();
    this.key = key;
    this._x = x;
    this._y = y;
    this._width = width;
    this._height = height;
    this.angle = angle;
    this._halfHeight = this.height/2;
    this._halfWidth = this.width/2;

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
    this.changeCenter();
  }

  get height(): number{
    return this._height;
  }

  set height(val: number){
    this._height = val;
    this._halfHeight = val/2;
    this.changeCenter();
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