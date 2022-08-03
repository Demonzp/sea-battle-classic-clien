import { useEffect, useRef } from 'react';
import LoaderScene from '../../game/scenes/LoaderScene';
import GameInstance from '../../gameLib/Game';

const GameComp = ()=>{
  const refCanvas = useRef<HTMLCanvasElement>(null);

  useEffect(()=>{
    if(refCanvas.current){
      GameInstance.init({
        canvas: refCanvas.current,
        width: 200,
        height: 200,
        scenes: [LoaderScene],
      })
    }
  }, [refCanvas]);
  
  return(
    <div>
      <canvas ref={refCanvas}/>
    </div>
  );
};

export default GameComp;