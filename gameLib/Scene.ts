import { TGame } from './Game';

export default class Scene{
  private _game: TGame|null = null;
  name: string;
  canvas: HTMLCanvasElement|null = null;
  ctx: CanvasRenderingContext2D|null = null;

  constructor(name?: string){
    if(name){
      this.name = name;
    }else{
      this.name = 'Scene';
    }
    
  }

  get game():TGame{
    return this._game!;
  }

  baseInit(game: TGame, canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D){
    this._game = game;
    this.canvas = canvas;
    this.ctx = ctx;
  }

  preload(){}

  update(){}
}