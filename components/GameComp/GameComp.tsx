import { useEffect, useRef, useState } from 'react';
import LoaderScene from '../../game/scenes/LoaderScene';
import MainScene from '../../game/scenes/MainScene';
import Game from '../../gameLib/Game';

const GameComp = ()=>{
  const refCanvas = useRef<HTMLCanvasElement>(null);
  const [game, setGame] = useState<Game|null>(null);

  useEffect(()=>{
    if(refCanvas.current&&!game){
      console.log('GameComp init game!');
      //const width = (document.documentElement.clientWidth)*0.9;
      //const height = (document.documentElement.clientHeight)*0.9;

      //try {
        const tempGame =new Game({
          canvas: refCanvas.current,
          width: 360*2+30,
          height: 360,
          scenes: [LoaderScene, MainScene],
        });
      //} catch (error) {}
      
      setGame(tempGame);
    }
  }, []);
  
  return(
    <div>
      <canvas ref={refCanvas}/>
    </div>
  );
};

export default GameComp;