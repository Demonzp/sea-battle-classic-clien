import Scene from '../../gameLib/Scene';

export default class MainScene extends Scene{
  constructor(){
    super('MainScene');
  }

  create(): void {
    console.log('scene:', this.key);
    this.add.sprite('second');
  }
}