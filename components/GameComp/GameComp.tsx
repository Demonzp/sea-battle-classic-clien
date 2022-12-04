import { useEffect, useRef, useState } from 'react';
import FleatShema from '../../game/scenes/FleatShema';
import LoaderScene from '../../game/scenes/LoaderScene';
import Loading from '../../game/scenes/LoadingScene';
import Queue from '../../game/scenes/QueueScene';
import Shipyard from '../../game/scenes/Shipyard';
import Game from '../../gameLib/Game';
import { getUser } from '../../store/actions/app';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { createGame, setScene } from '../../store/slices/game';

import styles from '../../styles/GameUI.module.css';
import socketInst from '../../utils/socket';
import QueueComp from '../Queue';

const GameComp = () => {
  const refCanvas = useRef<HTMLCanvasElement>(null);
  const [game, setGame] = useState<Game | null>(null);
  const [isShowMainButtons, setIsShowMainButtons] = useState(false);
  const { gameScene, fleatShema, isLoadedGame } = useAppSelector(state => state.game);
  const { initUser, user } = useAppSelector(state => state.app);
  const dispatch = useAppDispatch();
  console.log('rerender GameComp');

  useEffect(() => {
    if (initUser) {
      socketInst.init({ path: '/api/socket.io', token: user?.id });
      socketInst.on('connect', () => {
        toShipyard();
      });
      socketInst.on<{ data: string }>('loged', (data) => {
        console.log('loged = ', data?.data);
      });
      socketInst.on<{ queue: number }>('to-queue', (data) => {
        console.log('to-queue = ', data);
        dispatch(setScene('queue'));
        game?.scene.start('Queue');
      });
      socketInst.on<{ queue: number, time: number }>('update-queue', (data) => {
        console.log('update-queue = ', data);
      });
      socketInst.on('disconnect', (reason) => { console.log('reason = ', reason) });
    }
  }, [isLoadedGame]);

  useEffect(() => {
    if (gameScene === 'loading' || gameScene === 'queue') {
      setIsShowMainButtons(false);
    } else {
      setIsShowMainButtons(true);
    }
  }, [gameScene]);

  // useEffect(()=>{
  //   if(initUser){
  //     socketInst.init({path:'/api/socket.io', token:user?.id});
  //     socketInst.on('connect', ()=>{console.log('socket connected!!!')});
  //     socketInst.on('disconnect', (reason)=>{console.log('reason = ', reason)});
  //   }
  // }, [initUser]);

  useEffect(() => {
    dispatch(getUser());
    //axios.get('/api');
  }, []);

  useEffect(() => {
    if (!game) {
      //document.addEventListener('pointerdown', ()=>console.log('click on document'))
      setGame(new Game({
        canvas: refCanvas.current!,
        width: 360 * 2 + 30,
        height: 360,
        scenes: [LoaderScene, Shipyard, FleatShema, Queue, Loading],
      }));
    }
  }, []);

  useEffect(() => {
    return () => {
      if (game) {
        console.log('killGame!!!');
        game.destroy();
      }
    }
  }, [game]);

  const toFleatShema = () => {
    dispatch(setScene('fleatShema'));
    game?.scene.start('FleatShema');
  };

  const toShipyard = () => {
    dispatch(setScene('shipyard'));
    game?.scene.start('Shipyard');
  };

  const toBattle = () => {
    socketInst.emit('to-queue', fleatShema);
    game?.scene.start('Loading');
  }

  return (
    //<canvas ref={refCanvas}/>
    <div className={styles.mainCont}>
      <div className={styles.cont}>
        <div className={styles.contBtns}>
          {
            isShowMainButtons ?
              <>
                {
                  gameScene === 'shipyard' &&
                  <button style={{ height: 40 }} onClick={toFleatShema}>razpologenie flota</button>
                }
                {
                  gameScene === 'fleatShema' &&
                  <button style={{ height: 40 }} onClick={toShipyard}>Shipyard</button>
                }
                {
                  fleatShema.length >= 10 &&
                  <button style={{ height: 40 }} onClick={toBattle}>to battle!</button>
                }
              </> :
              null
          }
        </div>
        {
          gameScene === 'queue' &&
          <QueueComp />
        }
      </div>
      <canvas ref={refCanvas} />
    </div>
  );
};

export default GameComp;