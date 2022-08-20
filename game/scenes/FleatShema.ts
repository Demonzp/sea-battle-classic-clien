import Scene from '../../gameLib/Scene';
import PlayerField from '../objects/PlayerField';

export default class FleatShema extends Scene{
  plField: PlayerField|null = null;
  constructor(){
    super('FleatShema');
  }

  create(): void {
    this.plField = new PlayerField(this);
  }
}