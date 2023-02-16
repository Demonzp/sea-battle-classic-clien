import Game, { TPoint } from './Game';
import GameObject, { TGameObjectEvents } from './GameObject';
import { ILoadSpritesheet } from './Loader';
import Scene from './Scene';

export type TEventsSprite = 'onComplate';

export interface ICallbackSpriteData {
  id: string;
  handler: ()=>void;
}

export default class Sprite extends GameObject{
  image: HTMLImageElement|undefined;
  spritesheet: ILoadSpritesheet| undefined;
  sx = 0;
  sy = 0;
  sWidth = 0;
  sHeight = 0;
  rows = 0;
  cols = 0;
  isPlay = false;
  frameIdx = 0;
  framesPos: TPoint [] = [];
  isCallbacks = false;
  callbacks: ICallbackSpriteData[] = [];
  repeat = -1;
  numFrames = 0;

  constructor(scene: Scene, key:string, x=0, y=0, width?:number, height?:number){
    super(scene, key, 'Sprite', x, y);
    this.image = scene.load.getImage(key);
    this.spritesheet = this.scene.load.getSpritesheet(key);

    if(this.image){
      if(this.spritesheet){
        const w = this.image.width;
        const h = this.image.height;
        this.cols = w/this.spritesheet.frameWidth;
        this.rows = h/this.spritesheet.frameHeight;
        this.numFrames = this.spritesheet.endFrame-1;
        let n = 0;
        let x = 0;
        let y = 0;
        for (let i = 0; i < this.rows; i++) {
          y = i * this.spritesheet.frameHeight;
          for (let j = 0; j < this.cols; j++) {
            if(n>=this.spritesheet.endFrame){
              break;
            }
            
            x = j * this.spritesheet.frameWidth;
            this.framesPos.push({
              x,
              y
            });
            n++;
          }
          
        }
        //console.log('this.framesPos = ', this.framesPos);
        this.sWidth = this.spritesheet.frameWidth;
        this.sHeight = this.spritesheet.frameHeight;
      }else{
        this.sWidth = this.image.width;
        this.sHeight = this.image.height;
      } 
    }

    if(width){
      this.width = width;
      //this.sWidth = width;
    }else{
      if(this.image){
        if(this.spritesheet){
          //this.sWidth = this.spritesheet.frameWidth;
          //this.sHeight = this.spritesheet.frameHeight;
          this.width = this.spritesheet.frameWidth;
          this.height = this.spritesheet.frameHeight;
        }else{
          //this.sWidth = this.image.width;
          //this.sHeight = this.image.height;
          this.width = this.image.width;
          this.height = this.image.height;
        }
        
      }
      
    }
    if(height){
      this.height = height;
    }
    if(width&&!height){
      this.height = width;
    }

    super.setInteractiveRect(this.width, this.height);
    
    this.center = {
      x: this.x-this.width/2,
      y: this.y-this.height/2
    };
    //console.log(key, ' = ', this.image);
  }

  setFrame(idx: number){
    //const spritesheet = this.scene.load.getSpritesheet(this.key);
    if(this.spritesheet&&idx<this.spritesheet.endFrame){
      this.frameIdx = idx;
      this.sx = this.framesPos[idx].x;
      this.sy = this.framesPos[idx].y;
    }
  }

  on(event:TEventsSprite|TGameObjectEvents , handler: ()=>void, context?: any):string{
    if(event==='pointerdown'||event==='pointermove'||event==='pointerup'){
      return super._on(event, handler, context);
    }else{
      //console.log('register TEventsSprite');
      const id = Game.createId();
      this.callbacks.push({
        id,
        handler: handler.bind(context)
      });
      return id;
    }
  }

  play(){
    if(this.framesPos.length<=0){
      return;
    }
    this.isPlay = true;
  }

  stop(){
    this.isPlay = false;
  }

  setDisplaySize(width: number, height: number){
    this.width = width;
    this.height = height;
  }

  private _play(){
    if(!this.isPlay){
      return;
    }

    let idx = this.frameIdx+1;
    //console.log('idx = ', idx);
    if(idx===this.framesPos.length){
      //this.callbacks.forEach(el=>el.handler());
      //this.stop();
      idx=0;
      //return;
    }
    this.setFrame(idx);
  }

  render(){
    
    if(this.image){
      //console.log('renderSprite!');
      this._play();
      this.scene.ctx?.save();

      this.scene.ctx?.translate(this.x, this.y);
      this.scene.ctx?.rotate(this.pi*this.angle);
      this.scene.ctx?.translate(-(this.x), -(this.y));
      this.scene.ctx!.globalAlpha = this.alpha;
      this.scene.ctx?.drawImage(this.image, this.sx, this.sy, this.sWidth, this.sHeight, this.center.x, this.center.y, this.width, this.height);
      //this.scene.ctx?.drawImage(this.image, this.center.x, this.center.y, this.width, this.height);
      
      this.scene.ctx?.restore();

      if(this.isPlay&&this.frameIdx===this.numFrames){
        this.callbacks.forEach(el=>el.handler());
      }
    }
  }
}