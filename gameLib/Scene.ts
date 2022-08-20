import Game from './Game';
import InputEvent from './InputEvent';
import LoaderManagerScene from './LoaderManagerScene';
import Manager from './Manager';
import { ISceneManager } from './ScenesManager';
import Timer from './Timer';

export default class Scene{
  private _game: Game|null = null;
  key: string;
  canvas: HTMLCanvasElement|null = null;
  ctx: CanvasRenderingContext2D|null = null;
  load = new LoaderManagerScene(this);
  add: Manager = new Manager(this);
  timer = new Timer(this);
  isActive: boolean = false;

  constructor(key?: string){
    if(key){
      this.key = key;
    }else{
      this.key = 'Scene';
    }
    
  }

  get game():Game{
    return this._game!;
  }

  get input():InputEvent{
    return this._game!.input;
  }

  get width():number{
    return this._game!.width;
  }

  get height():number{
    return this._game!.height;
  }

  get scene(): ISceneManager{
    return this._game!.scene;
  }

  baseInit(game: Game, canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D){
    this._game = game;
    this.canvas = canvas;
    this.ctx = ctx;
  }

  offScene(){
    this.timer.delAll();
    this.isActive = false;
  }

  init(){
    this.isActive = true;
  }

  preload(){}

  create(){}

  update(delta: number){}

  render(delat: number){
    this.timer.update(delat);
    //console.log('rizuu scenu = ', this.key);
    this.add.gameObjects.forEach(obj=>obj.render());
  }
}