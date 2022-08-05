export interface ILoadItemBase{
  key: string;
  path: string;

}

export interface ILoadItem extends ILoadItemBase{
  keyScene: string
}

export type TLoadedItem = {
  key: string;
  keyScene: string;
  file: HTMLImageElement;
}

const imgLoad = (blob: Blob)=>{
  return new Promise<HTMLImageElement>((resolve, reject)=>{
    const img = new Image();

    img.onload = ()=>{
      //console.log('render sprite!!!');
      resolve(img);
      //this.scene.ctx?.drawImage(img, this.x, this.y);
    }
    img.onerror = (err)=>reject(err);

    img.src = URL.createObjectURL(blob);
  });
}

export default class Loader{
  private loadImages: ILoadItem[] = [];
  private loadedImages: TLoadedItem[] = [];

  image(key:string, keyScene: string, path:string){
    this.loadImages.push({key, keyScene, path});
  }

  getImage(key: string):HTMLImageElement|undefined{
    const image = this.loadedImages.find(el=>el.key===key);
    return image?.file;
  }

  async preloadImages(){
    for (const iterator of this.loadImages) {
      try {
        const res = await fetch(iterator.path);
        const blob = await res.blob();
        const img = await imgLoad(blob);
        console.log('zagruzil = ', iterator.key);
        this.loadedImages.push({key: iterator.key, keyScene: iterator.keyScene, file: img});
      } catch (error) {
        console.error('loadError: ', (error as Error).message);
      }
    }
    this.loadImages = [];
    console.log('konchil iterirovat!!!');
  }
}