import Scene from '../../gameLib/Scene';

export default class LoaderScene extends Scene{
  constructor(){
    super('LoadScene');
  }

  preload(){
    //const graphics = this.add.graphics();
    // this.load.on(ELoadEvents.progress, (value)=>{
    //     graphics.fillStyle(0xffffff);
    //     graphics.fillRect(10,10,this.width*value,20);
    // });
    // graphics.fillStyle(0xffffff);
    // graphics.fillRect(10,10,this.width,20);

    this.load.image('first', './assets/logo512.png');
    this.load.image('second', './assets/fon2.png');
    this.load.image('ship-type-3', './assets/ship-type-3.png');
    this.load.image('gun-type-3', './assets/gun-type-3.png');
    
    // this.load.image('first', './assets/logo512.png');
    // this.load.image('second', './assets/fon2.png');
    // this.load.image('first', './assets/logo512.png');
    // this.load.image('second', './assets/fon2.png');
    // this.load.image('first', './assets/logo512.png');
    // this.load.image('second', './assets/fon2.png');
    // this.load.image('first', './assets/logo512.png');
    // this.load.image('second', './assets/fon2.png');
    // this.load.image('first', './assets/logo512.png');
    // this.load.image('second', './assets/fon2.png');
    // this.load.image('first', './assets/logo512.png');
    // this.load.image('second', './assets/fon2.png');
    // this.load.image('first', './assets/logo512.png');
    // this.load.image('second', './assets/fon2.png');
    // this.load.image('first', './assets/logo512.png');
    // this.load.image('second', './assets/fon2.png');
    // this.load.image('first', './assets/logo512.png');
    // this.load.image('second', './assets/fon2.png');
    // this.load.image('first', './assets/logo512.png');
    // this.load.image('second', './assets/fon2.png');
    // this.load.image('first', './assets/logo512.png');
    // this.load.image('second', './assets/fon2.png');
    // this.load.image('first', './assets/logo512.png');
    // this.load.image('second', './assets/fon2.png');
    // this.load.image('first', './assets/logo512.png');
    // this.load.image('second', './assets/fon2.png');
    // this.load.image('first', './assets/logo512.png');
    // this.load.image('second', './assets/fon2.png');
    // this.load.image('first', './assets/logo512.png');
    // this.load.image('second', './assets/fon2.png');
    // this.load.image('first', './assets/logo512.png');
    // this.load.image('second', './assets/fon2.png');
    // this.load.image('first', './assets/logo512.png');
    // this.load.image('second', './assets/fon2.png');
    // this.load.image('first', './assets/logo512.png');
    // this.load.image('second', './assets/fon2.png');
    // this.load.image('first', './assets/logo512.png');
    // this.load.image('second', './assets/fon2.png');
    // this.load.image('first', './assets/logo512.png');
    // this.load.image('second', './assets/fon2.png');
    // this.load.image('first', './assets/logo512.png');
    // this.load.image('second', './assets/fon2.png');
    // this.load.image('first', './assets/logo512.png');
    // this.load.image('second', './assets/fon2.png');
    // this.load.image('first', './assets/logo512.png');
    // this.load.image('second', './assets/fon2.png');
    // this.load.image('first', './assets/logo512.png');
    // this.load.image('second', './assets/fon2.png');
    // this.load.image('first', './assets/logo512.png');
    // this.load.image('second', './assets/fon2.png');
    // this.load.image('first', './assets/logo512.png');
    // this.load.image('second', './assets/fon2.png');
    // this.load.image('first', './assets/logo512.png');
    // this.load.image('second', './assets/fon2.png');
    // this.load.image('first', './assets/logo512.png');
    // this.load.image('second', './assets/fon2.png');
    // this.load.image('first', './assets/logo512.png');
    // this.load.image('second', './assets/fon2.png');
    // this.load.image('first', './assets/logo512.png');
    // this.load.image('second', './assets/fon2.png');
    // this.load.image('second', './assets/fon2.png');
    // this.load.image('first', './assets/logo512.png');
    // this.load.image('second', './assets/fon2.png');
    // this.load.image('first', './assets/logo512.png');
    // this.load.image('second', './assets/fon2.png');
    // this.load.image('first', './assets/logo512.png');
    // this.load.image('second', './assets/fon2.png');
    // this.load.image('first', './assets/logo512.png');
    // this.load.image('second', './assets/fon2.png');
    // this.load.image('first', './assets/logo512.png');
    // this.load.image('second', './assets/fon2.png');
    // this.load.image('first', './assets/logo512.png');
    // this.load.image('second', './assets/fon2.png');
    // this.load.image('first', './assets/logo512.png');
    // this.load.image('second', './assets/fon2.png');
    // this.load.image('first', './assets/logo512.png');
    // this.load.image('second', './assets/fon2.png');
    // this.load.image('first', './assets/logo512.png');
    // this.load.image('second', './assets/fon2.png');
    // this.load.image('first', './assets/logo512.png');
    // this.load.image('second', './assets/fon2.png');
    // this.load.image('first', './assets/logo512.png');
    // this.load.image('second', './assets/fon2.png');
    // this.load.image('second', './assets/fon2.png');
    // this.load.image('first', './assets/logo512.png');
    // this.load.image('second', './assets/fon2.png');
    // this.load.image('first', './assets/logo512.png');
    // this.load.image('second', './assets/fon2.png');
    // this.load.image('first', './assets/logo512.png');
    // this.load.image('second', './assets/fon2.png');
    // this.load.image('first', './assets/logo512.png');
    // this.load.image('second', './assets/fon2.png');
    // this.load.image('first', './assets/logo512.png');
    // this.load.image('second', './assets/fon2.png');
    // this.load.image('first', './assets/logo512.png');
    // this.load.image('second', './assets/fon2.png');
    // this.load.image('first', './assets/logo512.png');
    // this.load.image('second', './assets/fon2.png');
    // this.load.image('first', './assets/logo512.png');
    // this.load.image('second', './assets/fon2.png');
    // this.load.image('first', './assets/logo512.png');
    // this.load.image('second', './assets/fon2.png');
    // this.load.image('first', './assets/logo512.png');
    // this.load.image('second', './assets/fon2.png');
    // this.load.image('first', './assets/logo512.png');
    // this.load.image('second', './assets/fon2.png');
  }

  create(){
    //console.log('render scene!!');
    //this.add.sprite('second');
    //this.add.sprite('first', 10,0, 40);
    this.scene.start('MainScene');
  }
}