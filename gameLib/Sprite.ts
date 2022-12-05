import GameObject from './GameObject';
import Scene from './Scene';

export default class Sprite extends GameObject{
  image: HTMLImageElement|undefined;
  pi = Math.PI/180;
  constructor(scene: Scene, key:string, x=0, y=0, width?:number, height?:number){
    super(scene, key, 'Sprite', x, y);
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

    super.setInteractiveRect(this.width, this.height);
    
    this.center = {
      x: this.x-this.width/2,
      y: this.y-this.height/2
    };
    //console.log(key, ' = ', this.image);
  }

  setDisplaySize(width: number, height: number){
    this.width = width;
    this.height = height;
  }

  render(){
    
    if(this.image){
      //console.log('renderSprite!');
      this.scene.ctx?.save();

      this.scene.ctx?.translate(this.x, this.y);
      this.scene.ctx?.rotate(this.pi*this.angle);
      this.scene.ctx?.translate(-(this.x), -(this.y));
      this.scene.ctx!.globalAlpha = this.alpha;
      this.scene.ctx?.drawImage(this.image, this.center.x, this.center.y, this.width, this.height);
      
      this.scene.ctx?.restore();
    }
  }
}