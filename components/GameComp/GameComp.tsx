import { useEffect, useRef, useState } from 'react';
import Battle from '../../game/scenes/BattleScene';
import FleatShema from '../../game/scenes/FleatShema';
import LoaderScene from '../../game/scenes/LoaderScene';
import Loading from '../../game/scenes/LoadingScene';
import Queue from '../../game/scenes/QueueScene';
import Shipyard from '../../game/scenes/Shipyard';
import Game from '../../gameLib/Game';
import { getUser } from '../../store/actions/app';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { IQueue, IQueueUpdate, setScene, setToQueue } from '../../store/slices/game';

import styles from '../../styles/GameUI.module.css';
import socketInst from '../../utils/socket';
import QueueComp from '../Queue';

const GameComp = () => {
  const refCanvas = useRef<HTMLCanvasElement>(null);
  const [game, setGame] = useState<Game | null>(null);
  const [isShowMainButtons, setIsShowMainButtons] = useState(false);
  const { gameScene, fleatShema, isLoadedGame, cursor } = useAppSelector(state => state.game);
  const { initUser, user } = useAppSelector(state => state.app);
  const dispatch = useAppDispatch();
  console.log('rerender GameComp');

  useEffect(() => {
    // if (initUser) {
    //   socketInst.init({ path: '/api/socket.io', token: user?.id });
    //   socketInst.on('connect', () => {
    //     toShipyard();
    //   });
    //   socketInst.on<{ data: string }>('loged', (data) => {
    //     console.log('loged = ', data?.data);
    //   });
    //   socketInst.on<IQueue>('to-queue', (data) => {
    //     console.log('to-queue = ', data);
    //     dispatch(setToQueue(data!));
    //   });
    //   socketInst.on<IQueueUpdate>('update-queue', (data) => {
    //     console.log('update-queue = ', data);
    //   });
    //   socketInst.on('disconnect', (reason) => { console.log('reason = ', reason) });
    // }
    
    if(isLoadedGame){
      console.log('isLoadedGame');
      dispatch(setScene('battle'));
      //dispatch(setScene('fleatShema'));
    }
    
  }, [isLoadedGame]);

  useEffect(() => {
    if (gameScene === 'loading' || gameScene === 'queue') {
      setIsShowMainButtons(false);
    } else {
      setIsShowMainButtons(true);
    }

    switch (gameScene) {
      case 'fleatShema':
        game?.scene.start('FleatShema');
        break;
      case 'loading':
        game?.scene.start('Loading');
        break;
      case 'queue':
        game?.scene.start('Queue');
        break;
      case 'shipyard':
        game?.scene.start('Shipyard');
        break;
      case 'battle':
        console.log('scene.start(Battle)');
        game?.scene.start('Battle');
        break;
      default:
        break;
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
    //dispatch(getUser());
    //axios.get('/api');
  }, []);

  useEffect(() => {
    if (!game) {
      setGame(new Game({
        canvas: refCanvas.current!,
        width: 360 * 2 + 30,
        height: 360,
        scenes: [LoaderScene, Shipyard, FleatShema, Queue, Loading, Battle],
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
    //game?.scene.start('FleatShema');
  };

  const toShipyard = () => {
    dispatch(setScene('shipyard'));
    //game?.scene.start('Shipyard');
  };

  const toBattle = () => {
    socketInst.emit('to-queue', fleatShema);
    //game?.scene.start('Loading');
  }

  return (
    //<canvas ref={refCanvas}/>
    <div className={styles.mainCont} style={{cursor}}>
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