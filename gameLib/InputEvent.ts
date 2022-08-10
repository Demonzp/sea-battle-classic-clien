import Game from './Game';

export type TInputEvents = 'pointerdown' |'pointerup' | 'pointermove';

export type TPointer = {
  x:number,
  y:number
};

export type TCallbackData = {
  id: string,
  handler: (pointer:TPointer)=>void
}

export default class InputEvent{
  private game: Game;
  pointerDownCallbacks: TCallbackData[] = [];

  constructor(game: Game){
    this.game = game;
    this.game.canvas!.addEventListener('pointerdown', this.pointerDown.bind(this));
  }

  destroy(){
    this.game.canvas!.removeEventListener('pointerdown', this.pointerDown.bind(this));
  }

  on(event: TInputEvents, handler: (pointer:TPointer)=>void, context?:any): string{
    const id = this.game.createId();
    switch (event) {
      case 'pointerdown':
        this.pointerDownCallbacks.push({
          id,
          handler: handler.bind(context)
        });
        break;
    
      default:
        break;
    }

    return id;
  }

  off(id:string){
    this.pointerDownCallbacks = this.pointerDownCallbacks.filter(callFn=>callFn.id!==id);
  }

  private pointerDown(event: PointerEvent){
    //console.log('pointerDown = ', event.target);
    const data = (event.currentTarget as HTMLCanvasElement).getBoundingClientRect();
    //console.log('data = ', data);
    const canvasY = data.top + window.pageYOffset;
    const canvasX = data.left + window.pageXOffset;
    //console.log('x = ', x, ' || ', y);
    this.pointerDownCallbacks.forEach(callFn=>{
      callFn.handler({x:event.pageX - canvasX, y:event.pageY - canvasY});
    });
  }
}