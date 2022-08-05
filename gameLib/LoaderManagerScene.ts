import { ILoadItemBase } from './Loader';
import Scene from './Scene';

export default class LoaderManagerScene{
  scene: Scene;
  private loadImages: ILoadItemBase[] = [];

  constructor(scene: Scene){
    this.scene = scene;
  }

  image(key:string, path:string){
    this.scene.game.load.image(key, this.scene.key, path);
    this.loadImages.push({key, path});
  }

  getImage(key: string):HTMLImageElement|undefined{
    //console.log('this.scene = ', this.scene);
    const image = this.scene.game.load.getImage(key);
    return image;
  }
}