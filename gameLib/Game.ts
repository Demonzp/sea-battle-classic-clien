import Loader from './Loader';
import Scene from './Scene';
import ScenesManager, { ISceneManager } from './ScenesManager';

export type TGameInit = {
  canvas: HTMLCanvasElement;
  width: number; 
  height: number;
  scenes: typeof Scene[];
}

export default class Game{

  canvas: HTMLCanvasElement|null = null;
  ctx: CanvasRenderingContext2D|null = null;
  load = new Loader();
  width = 0;
  height = 0;
  private _scenes = new ScenesManager(this);
  isInit = false;
  requestAnimateId: number|null = null;
  numFrames = 30;
  currentDelta = 60;
  timerFrames = 0;
  prevTime = 0;

  constructor({canvas, width = 300, height = 200, scenes}:TGameInit){
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.setSize(width, height);

    this._scenes.init(scenes);
    this.preload();
    this.prevTime = performance.now();
    this.currentDelta = Math.floor((1/this.numFrames)*1000);
    this.requestAnimateId = requestAnimationFrame(this.render.bind(this));
  }

  get scene():ISceneManager{
    return this._scenes;
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

  private async preload(){
    console.log('game width = ', this.width);
    await this.load.preloadImages();
    this._scenes.initFirstScene();
  }

  render(time: number){
    const delta = Math.floor(time-this.prevTime); 
    if(delta>=this.currentDelta){
      //console.log('requestAnimationFrame = ', delta, '||', this.currentDelta);
      this.ctx!.clearRect(0, 0, this.width, this.height);
      this._scenes.update();
      this.prevTime = time;
    }
    requestAnimationFrame(this.render.bind(this));
  }

}