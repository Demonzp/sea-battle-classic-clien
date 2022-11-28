import { TPoint } from '../../gameLib/Game';
import Scene from '../../gameLib/Scene';
import Ship from '../objects/Ship';

export default class Shipyard extends Scene{
  ship1: Ship|null = null;
  ship2: Ship|null = null;
  ship3: Ship|null = null;
  ship4: Ship|null = null;
  dotSecondSpip3: TPoint = {x: 380, y: 210};
  dotFirstShip3: TPoint = {x: 800, y: 100};
  dotFirstShip4: TPoint = {x: 450, y: -50};
  dotSecondShip4: TPoint = {x: 550, y: 400};

  constructor(){
    super('Shipyard');
  }

  create(): void {
    const fon = this.add.sprite('shipyard2', this.width/2, this.height/2);
    this.ship1 = new Ship(this, 320, 105, 4, -16, 1.3);
    this.ship2 = new Ship(this, 330, 144, 3, -18, 1.3);
    //this.ship3 = new Ship(this, 380, 210, 2, -18, 1.3);
    this.ship3 = new Ship(this, this.dotFirstShip3.x, this.dotFirstShip3.y, 2, -18, 1.3);
    this.ship4 = new Ship(this, this.dotFirstShip4.x, this.dotFirstShip4.y, 1, 70, 1.3);
    this.ship4.isRot = true;
    const time = this.game.Math.between(10, 20);
    const time2 = this.game.Math.between(20, 30);
    //console.log('time = ', time);
    this.timer.on(this.timerCallback, time, this);
    this.timer.on(this.timerCallback2, time2, this);
  }

  timerCallback2(){
    if(!this.ship4){
      return;
    }
    if(this.ship4.x===this.dotFirstShip4.x){
      //console.log('setDot');
      this.ship4.setDot(this.dotSecondShip4);
      this.timer.on(this.timerCallback2, this.game.Math.between(40, 60), this);
    }else{
      //console.log('setDot');
      this.ship4.setDot(this.dotFirstShip4);
      this.timer.on(this.timerCallback2, this.game.Math.between(40, 60), this);
    }
  }

  timerCallback(){
    if(!this.ship3){
      return;
    }
    if(this.ship3.x===this.dotFirstShip3.x){
      //console.log('setDot');
      this.ship3.setDot(this.dotSecondSpip3);
      this.timer.on(this.timerCallback, this.game.Math.between(20, 40), this);
    }else{
      //console.log('setDot');
      this.ship3.setDot(this.dotFirstShip3);
      this.timer.on(this.timerCallback, this.game.Math.between(20, 40), this);
    }
  }

  update(): void {
    //console.log('Shipyard');
    if(this.ship1){
      this.ship1.update();
    }
    if(this.ship2){
      this.ship2.update();
    }
    if(this.ship3){
      this.ship3.update();
    }
    if(this.ship4){
      this.ship4.update();
    }
  }
}