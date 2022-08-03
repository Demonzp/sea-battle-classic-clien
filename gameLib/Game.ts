import Loader from './Loader';
import Scene from './Scene';

export type TGameInit = {
  canvas: HTMLCanvasElement;
  width: number; 
  height: number;
  scenes: typeof Scene[];
}

export type TGame = Game;

class Game{

  canvas: HTMLCanvasElement|null = null;
  ctx: CanvasRenderingContext2D|null = null;
  load = new Loader();
  width = 0;
  height = 0;
  scenes: Scene[] = [];

  init({canvas, width = 300, height = 200, scenes}:TGameInit){
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');

    this.scenes = scenes.map(ItemScene=>new ItemScene());
    this._initScenes();
    this.preload();
    this.setSize(width, height);
  }

  setWidth(val:number){
    this.width = val;
  }

  setHeight(val:number){
    this.height = val;
  }

  setSize(width: number, height?: number){
    this.width = width;
    if(height){
      this.height = height;
    }else{
      this.height = width;
    }
    this._resize();
  }

  private _resize(){
    if(!this.canvas){
      throw new Error('Game is not init call init() method!');
    }
    this.canvas.width = this.width;
    this.canvas.height = this.height;
  }

  private _initScenes(){
    this.scenes.forEach(scene=>{
      scene.baseInit(this, this.canvas!, this.ctx!);
      scene.preload();
    });
  }

  preload(){
    this.load.preload();
  }
}

const GameInstance = new Game();

export default GameInstance;