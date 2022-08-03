export type TLoadItem = {
  key: string,
  path: string;
}

export type TLoadedItem = {
  key: string;
  file: File|Blob;
}

export default class Loader{
  private loadImages: TLoadItem[] = [];
  private loadedImages: TLoadedItem[] = [];

  image(key:string, path:string){
    this.loadImages.push({key, path});
  }

  preload(){
    this.loadImages.forEach(item=>{
      console.log('item = ', item.key);
    });
  }
}