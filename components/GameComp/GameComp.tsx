import { useEffect, useMemo, useRef, useState } from 'react';
import useSWR from 'swr';
import LoaderScene from '../../game/scenes/LoaderScene';
import Shipyard from '../../game/scenes/Shipyard';
import Game from '../../gameLib/Game';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { createGame } from '../../store/slices/game';


const GameComp = ()=>{
  const refCanvas = useRef<HTMLCanvasElement>(null);
  const [game, setGame] = useState<Game|null>(null);
  const {isInitClienGame} = useAppSelector(state=>state.game);
  const dispatch = useAppDispatch();
//750
  useEffect(()=>{
    if(!game){
      setGame(new Game({
        canvas: refCanvas.current!,
        width: 360*2+30,
        height: 360,
        scenes: [LoaderScene, Shipyard],
      }));
    }
  }, []);

  useEffect(()=>{
    return ()=>{
      if(game){
        console.log('killGame!!!');
        game.destroy();
      }
    }
  }, [game]);
  
  return(
    <div>
      <canvas ref={refCanvas}/>
    </div>
  );
};

export default GameComp;