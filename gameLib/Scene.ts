import Game from './Game';
import LoaderManagerScene from './LoaderManagerScene';
import Manager from './Manager';
import { ISceneManager } from './ScenesManager';

export default class Scene{
  private _game: Game|null = null;
  key: string;
  canvas: HTMLCanvasElement|null = null;
  ctx: CanvasRenderingContext2D|null = null;
  load = new LoaderManagerScene(this);
  add: Manager = new Manager(this);
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

  init(){
    this.isActive = true;
  }

  preload(){}

  create(){}

  update(){}

  render(){
    //console.log('rizuu scenu = ', this.key);
    this.add.gameObjects.forEach(obj=>obj.render());
  }
}