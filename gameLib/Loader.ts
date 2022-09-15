export enum ELoadEvents {
  'progress',
  'complete'
};

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
      URL.revokeObjectURL(img.src);
      //this.scene.ctx?.drawImage(img, this.x, this.y);
    }
    img.onerror = (err)=>reject(err);

    img.src = URL.createObjectURL(blob);
  });
}

export default class Loader{
  private loadImages: ILoadItem[] = [];
  private loadedImages: TLoadedItem[] = [];
  private eventProgressCallbacks: ((value: number)=>void)[] = [];
  private eventComplateCallbacks: ((value: number)=>void)[] = [];

  image(key:string, keyScene: string, path:string){
    this.loadImages.push({key, keyScene, path});
  }

  getImage(key: string):HTMLImageElement|undefined{
    const image = this.loadedImages.find(el=>el.key===key);
    //console.log('image = ', key);
    return image?.file;
  }

  on(event: ELoadEvents, callback: (value:number)=>void, context?: any){
    switch (event) {
      case ELoadEvents.progress:
        this.eventProgressCallbacks.push(callback.bind(context));
        break;
      case ELoadEvents.complete:
        this.eventComplateCallbacks.push(callback.bind(context));
        break;
      default:
        break;
    }
  }

  async preloadImages(){
    let num = 0;
    let i = 0;
    for (const iterator of this.loadImages) {
      try {
        const res = await fetch(iterator.path);
        const blob = await res.blob();
        const img = await imgLoad(blob);
        //console.log('zagruzil = ', iterator.key);
        num = (1/100)*(100/(this.loadImages.length/i));
        this.loadedImages.push({key: iterator.key, keyScene: iterator.keyScene, file: img});
        this.eventProgressCallbacks.forEach(callback=>callback(num));
        i++;
      } catch (error) {
        console.error('loadError: ', (error as Error).message);
      }
    }
    this.eventProgressCallbacks = [];
    this.loadImages = [];
    this.eventComplateCallbacks.forEach(callback=>callback(1));
    console.log('konchil iterirovat!!!');
  }
}