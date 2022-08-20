import { useEffect, useRef, useState } from 'react';
import useSWR from 'swr';
import FleatShema from '../../game/scenes/FleatShema';
import LoaderScene from '../../game/scenes/LoaderScene';
import MainScene from '../../game/scenes/MainScene';
import Shipyard from '../../game/scenes/Shipyard';
import Game from '../../gameLib/Game';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { createGame, setScene } from '../../store/slices/game';

import styles from '../../styles/GameUI.module.css';

const GameComp = ()=>{
  const refCanvas = useRef<HTMLCanvasElement>(null);
  const [game, setGame] = useState<Game|null>(null);
  const {gameScene} = useAppSelector(state=>state.game);
  const dispatch = useAppDispatch();
//750
  useEffect(()=>{
    if(!game){
      setGame(new Game({
        canvas: refCanvas.current!,
        width: 360*2+30,
        height: 360,
        scenes: [LoaderScene, Shipyard, FleatShema],
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
  
  const toFleatShema = ()=>{
    dispatch(setScene('fleatShema'));
    game?.scene.start('FleatShema');
  };

  const toShipyard = ()=>{
    dispatch(setScene('shipyard'));
    game?.scene.start('Shipyard');
  };

  return(
    <div style={{position: 'relative'}}>
      <div className={styles.cont}>
        <div className={styles.contBtns}>
          {
            gameScene==='shipyard'&&
            <button style={{height: 40}} onClick={toFleatShema}>razpologenie flota</button>
          }
          {
            gameScene==='fleatShema'&&
            <button style={{height: 40}} onClick={toShipyard}>Shipyard</button>
          }
          <button style={{height: 40}}>to battle!</button>
        </div>
      </div>
      <canvas ref={refCanvas}/>
    </div>
  );
};

export default GameComp;