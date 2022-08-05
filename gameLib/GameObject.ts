import Scene from './Scene';

export default class GameObject{
  scene: Scene;
  key: string;
  x: number;
  y: number;
  width: number;
  height: number;
  angle: number;

  constructor(scene: Scene, key: string, x=0, y=0, width=0, height=0, angle=0){
    this.scene = scene;
    this.key = key;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.angle = angle;

    this.init();
  }

  init(){
    this.scene.add.registerGameObject(this);
  }

  render(){

  }
}