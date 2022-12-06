import Scene from '../../gameLib/Scene';
import store from '../../store/store';
import PlayerField from '../objects/PlayerField';
import Ship from '../objects/Ship';

export default class Battle extends Scene{
  plField: PlayerField|null = null;
  plFieldEnemy: PlayerField|null = null;
  ships: Ship[] = [];

  constructor(){
    super('Battle');
  }

  create(): void {
    console.log('Battle create');
    this.input.on('pointerup', (point)=>{
      //console.log('pointerup');
      //this.ships.forEach(ship=>ship.pointerUp());
    });

    this.input.on('pointerdown', (point)=>{
      //console.log('pointerdown');
      this.plFieldEnemy?.pointerMove(point);
      //console.log('pointerup');
      //this.ships.forEach(ship=>ship.pointerUp());
    });

    this.plField = new PlayerField(this, 0,0);
    const stepX = Math.trunc(this.game.width-(this.plField.width*2));
    this.plFieldEnemy = new PlayerField(this, this.plField.width+stepX,0);
    this.plFieldEnemy.setType('enemy');

    this.input.on('pointermove', (point)=>{
      this.plFieldEnemy?.pointerMove(point);
      //this.ships.forEach(ship=>ship.pointerMove(point));
      //console.log('pointermove');
    });
    // const graphics = this.add.graphics();
    // graphics.fillStyle('#ff0004');
    // graphics.fillRect(300, 400, 5,5);
    const shipFour = new Ship(this, 0, 0, 4);
    const shipTreeOne = new Ship(this, 0, 0, 3);
    const shipTreeTwo = new Ship(this, 0, 0, 3);
    const shipTwoOne = new Ship(this, 0, 0, 2);
    const shipTwoTwo = new Ship(this, 0, 0, 2);
    const shipTwoTree = new Ship(this, 0, 0, 2);
    const shipOneOne = new Ship(this, 0, 0, 1);
    const shipOneTwo = new Ship(this, 0, 0, 1);
    const shipOneTree = new Ship(this, 0, 0, 1);
    const shipOneFour = new Ship(this, 0, 0, 1);
    //shipFour.angle = 40;
    this.ships.push(
      shipFour, 
      shipTreeOne, 
      shipTreeTwo, 
      shipTwoOne, 
      shipTwoTwo, 
      shipTwoTree,
      shipOneOne,
      shipOneTwo,
      shipOneTree,
      shipOneFour,
    );
    //console.log('gameObjects = ', this.add.gameObjects);
    const fleatShema = store.getState().game.fleatShema;
    //this.parserFleatShema(fleatShema);
  }

  update(): void {

  }
}