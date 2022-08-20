import Game from './Game';
import Scene from './Scene';

export interface ISceneManager{
  start: (key: string)=>void;
}

export default class ScenesManager{
  game: Game;
  scenes: Scene[] = [];

  constructor(game: Game){
    this.game  = game;
  }

  init(scenes:typeof Scene[]):void{
    scenes.forEach((ItemScene)=>{
      const newScene = new ItemScene();
      newScene.baseInit(this.game, this.game.canvas!, this.game.ctx!);
      this.scenes.push(newScene);
    });
    this.scenes[0].init();
    this.scenes[0].preload();
  }

  initFirstScene():void{
    this.scenes[0].init();
    this.scenes[0].create(); 
  }

  getScene(key: string){
    return this.scenes.find(scene=>scene.key===key);
  }

  getActiveScenes(){
    return this.scenes.filter(scene=>scene.isActive);
  }

  setStopAllScenes(){
    this.scenes.forEach(scene=>scene.offScene());
  }

  start(key: string):void{
    const scene = this.getScene(key);
    if(scene){
      this.setStopAllScenes();
      scene.create();
      scene.init();
    }else{
      throw new Error(`Scene by key "${key}" not found!`);
    }
  }

  update(delta: number):void{
    this.scenes.forEach(scene=>{
      if(scene.isActive){
        scene.update(delta);
        scene.render(delta);
      }
    });
  }
}