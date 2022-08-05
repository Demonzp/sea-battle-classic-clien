import Scene from '../../gameLib/Scene';

export default class LoaderScene extends Scene{
  constructor(){
    super('LoadScene');
  }

  preload(){
    this.load.image('first', './assets/logo512.png');
    this.load.image('second', './assets/fon2.png');
  }

  create(){
    //console.log('render scene!!');
    //this.add.sprite('second');
    //this.add.sprite('first', 10,0, 40);
    this.scene.start('MainScene');
  }
}