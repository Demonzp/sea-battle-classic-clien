import GameObject from './GameObject';
import Scene from './Scene';

export default class Sprite extends GameObject{
  image: HTMLImageElement|undefined;
  constructor(scene: Scene, key:string, x=0, y=0, width?:number, height?:number){
    super(scene, key, x, y);
    this.image = scene.load.getImage(key);
    if(width){
      this.width = width;
    }else{
      if(this.image){
        this.width = this.image.width;
        this.height = this.image.height;
      }
      
    }
    if(height){
      this.height = height;
    }
    if(width&&!height){
      this.height = width;
    }
  }

  render(){
    
    if(this.image){
      console.log('renderSprite!');
      this.scene.ctx?.drawImage(this.image, this.x-this.width/2, this.y-this.height/2, this.width, this.height);
    }
  }
}