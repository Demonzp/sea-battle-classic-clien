import { useEffect, useRef, useState } from 'react';
import Battle from '../../game/scenes/BattleScene';
import FleatShema from '../../game/scenes/FleatShema';
import LoaderScene from '../../game/scenes/LoaderScene';
import Loading from '../../game/scenes/LoadingScene';
import Queue from '../../game/scenes/QueueScene';
import Shipyard from '../../game/scenes/Shipyard';
import Game from '../../gameLib/Game';
import { getUser, setDisconnect } from '../../store/actions/app';
import { gameErrorRes, gameOver, initGame, shotRes } from '../../store/actions/game';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { setConnected } from '../../store/slices/app';
import { IGameServerStateRes, IGameStatisticBasic, IQueue, IQueueUpdate, IShotRes, readBubbleMsg, setBubbleMsg, setScene, setToQueue, TGameError } from '../../store/slices/game';

import styles from '../../styles/GameUI.module.css';
import socketInst from '../../utils/socket';
import BattleTable from '../BattleTable';
import Modal from '../Modal';
import QueueComp from '../Queue';

const imgLoad = (blob: Blob)=>{
  return new Promise<HTMLImageElement>((resolve, reject)=>{
    const img = new Image();

    img.onload = ()=>{
      //console.log('render sprite!!!');
      resolve(img);
      URL.revokeObjectURL(img.src);
      //this.scene.ctx?.drawImage(img, this.x, this.y);
    }
    img.onerror = (err)=>reject(err);

    img.src = URL.createObjectURL(blob);
  });
}

const render = async (canvas: HTMLCanvasElement) => {
  let mask = null;
  const res = await fetch('./assets/ship-body-type-4.png');
  const blob = await res.blob();
  const res2 = await fetch('./assets/pixel.png');
  const blob2 = await res2.blob();
  const image = await imgLoad(blob2);

  mask = await imgLoad(blob);

  const res3 = await fetch('./assets/shipyard2.png');
  const blob3 = await res3.blob();
  const fon = await imgLoad(blob3);

  
  
  const angle = 0;
  const alpha = 1;
  
  const width = 300*0.8;
  const height = 76*0.8;
  const x = 200-width/2;
  const y = 100-height/2;
  const sx = 0;
  const sy = 0;
  const sWidth = 300;
  const sHeight = 76;
  canvas.width = 360 * 2 + 30;
  canvas.height = 360;
  canvas.style.backgroundColor = 'black';
  const ctx = canvas.getContext('2d')!;

  ctx.drawImage(fon, 0, 0, fon.width, fon.height, 0, 0, fon.width, fon.height);

  ctx.save();

  ctx.translate(x, y);
  ctx.rotate((Math.PI / 180) * angle);
  ctx.translate(-(x), -(y));
  ctx.globalAlpha = alpha;




  if (mask) {

    const canva = document.createElement('canvas');
    canva.width = mask.width;
    canva.height = mask.height;

    const ctx2 = canva.getContext('2d')!;

    //ctx2.save();

    //ctx2.translate(0, 0);
    //ctx2.rotate((Math.PI / 180) * angle);
    //ctx2.translate(-(0), -(0));
    //ctx2.globalAlpha = alpha;
    //this.scene.ctx!.globalCompositeOperation = 'source-in';

    ctx2.drawImage(mask, 0, 0, sWidth, sHeight, 0, 0, mask.width, mask.height);

    //ctx.globalCompositeOperation = 'destination-atop';
    ctx2.globalCompositeOperation = 'source-in';
    ctx2.drawImage(image, 0, 0, image.width, image.height, 0, 0, mask.width, mask.height);
    ctx.drawImage(canva, sx, sy, sWidth, sHeight, x, y, width, height);
  }

  
  ctx.restore();

  //ctx.drawImage(image, sx, sy, sWidth, sHeight, x, y, 300, 76);


  //this.scene.ctx?.drawImage(this.image, this.center.x, this.center.y, this.width, this.height);
  //ctx.globalCompositeOperation = 'destination-atop';
  
  ctx.drawImage(mask, sx, sy, sWidth, sHeight, x, y+60, width, height);

  ctx.drawImage(image, sx, sy, sWidth, sHeight, x+260, y, width, height);
}

const GameComp = () => {
  const refCanvas = useRef<HTMLCanvasElement>(null);
  const [game, setGame] = useState<Game | null>(null);
  const [isShowMainButtons, setIsShowMainButtons] = useState(false);
  const { gameScene, fleetShema, isLoadedGame, cursor, bubbleMsg, whoStep, enemyInfo } = useAppSelector(state => state.game);
  const { initUser, token, user } = useAppSelector(state => state.app);
  const dispatch = useAppDispatch();
  const [isModal, setIsModal] = useState(false);
  //const [message, setMessage] = useState('');
  //const [labelClass, setLabelClass] = useState(styles.msg);
  //console.log('rerender GameComp');

  // useEffect(()=>{
  //   const timer = setTimeout(()=>{
  //     setMessage('Yor Torn!');
  //   }, 1000);

  //   return ()=>clearTimeout(timer);
  // }, []);

  useEffect(() => {
    if (isLoadedGame) {
      console.log('try connect!');
      socketInst.init({ path: '/api/socket.io', token: JSON.stringify({ sub: user!.id }) });
      socketInst.on('connect', () => {
        //toShipyard();
        dispatch(setConnected(true));
      });
      socketInst.on('error', () => {
        console.log('connect error!');
        //toShipyard();
        //dispatch(setConnected(true));
      });
      socketInst.on<{ data: string }>('loged', (data) => {
        toShipyard();
        //console.log('loged = ', data?.data);
      });
      socketInst.on<IQueue>('to-queue', (data) => {
        //console.log('to-queue = ', data);
        dispatch(setToQueue(data));
      });
      socketInst.on<IQueue>('to-queue', (data) => {
        //console.log('to-queue = ', data);
        dispatch(setToQueue(data));
      });
      socketInst.on<IQueueUpdate>('update-queue', (data) => {
        //console.log('update-queue = ', data);
      });
      socketInst.on<IShotRes>('shot', (data) => {
        //console.log('shot = ', data);
        dispatch(shotRes(data));
      });
      socketInst.on<TGameError>('game-error', (data) => {
        //console.log('game-error = ', data);
        dispatch(gameErrorRes(data));
      });
      socketInst.on<IGameServerStateRes>('init-game', (data) => {
        //console.log('init-game = ', data);
        dispatch(initGame(data));
      });
      socketInst.on<IGameStatisticBasic>('game-over', (data) => {
        console.log('game-over = ', data);
        dispatch(gameOver(data));
        //dispatch(initGame(data));
      });
      socketInst.on('disconnect', (reason) => {
        console.log('reason = ', reason)
        dispatch(setDisconnect());
      });
    }

    // if(isLoadedGame){
    //   console.log('isLoadedGame');
    //   //dispatch(setScene('battle'));
    //   dispatch(setScene('shipyard'));
    // }

  }, [isLoadedGame]);

  useEffect(() => {
    //console.log('gameScene= ', gameScene);
    if (gameScene === 'loading' || gameScene === 'queue' || gameScene === 'battle' || gameScene === 'gameOver') {
      //console.log('setIsShowMainButtons= ', false);
      setIsShowMainButtons(false);
    } else {
      //console.log('setIsShowMainButtons= ', true);
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
      case 'gameOver':
        console.log('scene.start(gameOver)');
        setIsModal(true);
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
    dispatch(getUser());
    //axios.get('/api');
  }, []);

  useEffect(() => {
    return () => setGame(null);
  }, []);

  useEffect(() => {
    if (!game && initUser) {
      //console.log('new Game');
      //render(refCanvas.current!);
      setGame(new Game({
        canvas: refCanvas.current!,
        width: 360 * 2 + 30,
        height: 360,
        scenes: [LoaderScene, Shipyard, FleatShema, Queue, Loading, Battle],
      }));
    }
  }, [initUser]);

  useEffect(() => {
    return () => {
      if (game) {
        //console.log('killGame!!!');
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
    socketInst.emit('to-queue', fleetShema);
    //game?.scene.start('Loading');
  };

  const onAnimationEnd = (id: string) => {
    console.log('onTransitionEnd');
    dispatch(readBubbleMsg(id));
    //setMessage('');
  };

  const overBattle = () => {
    toShipyard();
    setIsModal(false);
  };

  return (
    //<canvas ref={refCanvas}/>
    <div className={styles.mainCont} style={{ cursor }}>
      <Modal
        isActive={isModal}
        setIsActive={setIsModal}
        isStaticBackground={true}
        onConfirm={overBattle}
      >
        <BattleTable />
      </Modal>
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
                  fleetShema.length >= 10 &&
                  <button style={{ height: 40 }} onClick={toBattle}>to battle!</button>
                }
                {/* <button style={{ height: 40 }} onClick={()=>setIsModal(true)}>modal</button> */}
              </> :
              null
          }
        </div>
        {
          gameScene === 'queue' &&
          <QueueComp />
        }
        {
          gameScene === 'battle' &&
          <div className={styles.contBtns}>{whoStep === 'you' ? 'is your turn' : `is ${enemyInfo?.name} turn`}</div>
        }
        {
          <div className={styles.contMsg}>
            {
              bubbleMsg.map((item) => {
                return (

                  <label
                    key={item.id}
                    className={styles.msg}
                    onAnimationEnd={() => onAnimationEnd(item.id)}
                  >
                    {item.message}
                  </label>
                );
              })
            }
          </div>
          // bubbleMsg.length>0&&
          //   <div className={styles.contMsg}>
          //     <label 
          //       className={styles.msg}
          //       onAnimationEnd={onAnimationEnd}
          //     >
          //       {bubbleMsg}
          //     </label>
          //   </div>
        }

      </div>
      <canvas ref={refCanvas} />
    </div>
  );
};

export default GameComp;