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
    this.load.image('ship-body-type-4', './assets/ship-body-type-4.png');
    this.load.image('ship-detail-type-4', './assets/ship-detail-type-4.png');
    this.load.image('ship-body-type-3', './assets/ship-body-type-3.png');
    this.load.image('ship-detail-type-3', './assets/ship-detail-type-3.png');
    this.load.image('ship-body-type-2', './assets/ship-body-type-2.png');
    this.load.image('ship-detail-type-2', './assets/ship-detail-type-2.png');
    this.load.image('ship-body-type-1', './assets/ship-body-type-1.png');
    this.load.image('ship-detail-type-1', './assets/ship-detail-type-1.png');

    this.load.image('gun-body-type-3', './assets/gun-body-type-4.png');
    this.load.image('gun-detail-type-3', './assets/gun-detail-type-4.png');
    this.load.image('gun-body-type-2', './assets/gun-body-type-2.png');
    this.load.image('gun-detail-type-2', './assets/gun-detail-type-2.png');
    this.load.image('gun-body-type-1', './assets/gun-body-type-1.png');
    this.load.image('gun-detail-type-1', './assets/gun-detail-type-1.png');
    
    this.load.image('shipyard', './assets/shipyard.png');
    this.load.image('shipyard2', './assets/shipyard2.png');
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
    console.log('render scene!!');
    //this.add.sprite('second');
    //this.add.sprite('first', 10,0, 40);
    this.scene.start('Shipyard');
    //this.scene.start('MainScene');
  }
}