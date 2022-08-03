import Scene from '../../gameLib/Scene';

export default class LoaderScene extends Scene{
  constructor(){
    super('LoadScene');
  }

  preload(){
    this.game.load.image('first', './assets/logo512.png');
  }
}