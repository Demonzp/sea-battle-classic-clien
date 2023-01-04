import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TShips } from '../../game/objects/Ship';
import { gameOver, initGame, shotRes } from '../actions/game';

export type TGameError = {
  message: string;
}

export interface IGameStatistic extends IGameStatisticBasic{
  text: string;
}

export interface IGameStatisticBasic{
  winnerId: string;
  time: number;
  shots: number;
  you: TUserStatistic;
  enemy: TUserStatistic;
}

export type TUserStatistic = {
  shots: number;
  hits: number;
  miss: number;
  lossesShips: number;
  killShips: number;
}

export interface IShotParseRes extends IShotResBase{
  whoStep: typeof initialState.whoStep;
}

export interface IShotRes extends IShotResBase {
  whoStep: string,
}

export interface IShotResBase {
  whoShot: string,
  enemyShips: TShipOnFleetShema[],
  cell: TFieldShemaCell
}

export type TEnemy = {
  id: string;
  name: string;
}

export type TItemMsg = {
  id:string;
  message: string;
}

export interface IGameServerStateParseRes extends IGameServerStateBase {
  whoStep: typeof initialState.whoStep;
  enemyInfo: TEnemy;
}

export interface IGameServerStateRes extends IGameServerStateBase {
  whoStep: string;
  enemyData: TEnemy;
}

export interface IGameServerStateBase {
  id: string;
  cells: TFieldShemaCell[];
  whoStep: string;
  fleetShema: TShipOnFleetShema[];
  enemyCells: TFieldShemaCell[];
  enemyShips: TShipOnFleetShema[];
  timeToBegin: number;
}

export interface IQueueUpdate extends IQueue {
  time: number;
}

export interface IQueue {
  online: number;
  queue: number;
};

export type TGameScenes = 'queue' | 'loading' | 'shipyard' | 'fleatShema' | 'battle' | 'gameOver';
export type TShipOnFleetShema = {
  id: string;
  type: TShips;
  angle: number;
  startPos: string;
};

export type TFieldShemaCell = {
  id: string;
  isLive: boolean;
  isFree: boolean;
};

export type TWhoStep = 'you' | 'enemy';

export interface IGame {
  id: string;
  bubbleMsg: TItemMsg [];
  isInitClienGame: boolean;
  isLoadedGame: boolean;
  gameScene: TGameScenes;
  fleetShema: TShipOnFleetShema[];
  fleetShemaEnemy: TShipOnFleetShema[];
  fieldShema: TFieldShemaCell[];
  fieldShemaEnemy: TFieldShemaCell[];
  queue: IQueueUpdate;
  cursor: 'none' | 'auto' | 'grab';
  whoStep: TWhoStep;
  isLoaded: boolean;
  timeToBegin: number;
  enemyInfo: TEnemy | null;
  gameStatistic: IGameStatistic | null;
}

const initialState: IGame = {
  id: '',
  bubbleMsg: [],
  isLoaded: false,
  enemyInfo: null,
  timeToBegin: 0,
  isInitClienGame: false,
  isLoadedGame: false,
  gameScene: 'loading',
  fleetShema: [
    { type: 4, angle: 0, startPos: 'A-7', id: '1' },
    { type: 3, angle: 0, startPos: 'A-3', id: '2' },
    { type: 3, angle: 0, startPos: 'C-8', id: '3' },
    { type: 2, angle: 0, startPos: 'C-5', id: '4' },
    { type: 2, angle: 0, startPos: 'C-2', id: '5' },
    { type: 2, angle: 0, startPos: 'E-9', id: '6' },
    { type: 1, angle: 0, startPos: 'A-1', id: '7' },
    { type: 1, angle: 0, startPos: 'E-7', id: '8' },
    { type: 1, angle: 0, startPos: 'E-5', id: '9' },
    { type: 1, angle: 0, startPos: 'E-3', id: '10' }
  ],
  fleetShemaEnemy: [],
  fieldShemaEnemy: [],
  fieldShema: [],
  cursor: 'auto',
  queue: {
    time: 0,
    online: 0,
    queue: 0
  },
  whoStep: 'enemy',
  gameStatistic: null
};

const sliceGame = createSlice({
  name: 'game',
  initialState,
  reducers: {
    createGame(state) {
      state.isInitClienGame = true;
    },

    setLoadedGame(state) {
      state.isLoadedGame = true;
    },

    setToQueue(state, action: PayloadAction<IQueue>) {
      state.gameScene = 'queue';
      state.queue = {
        ...state.queue,
        ...action.payload
      }
    },

    setStatusLoading(state, action: PayloadAction<boolean>) {
      state.isLoaded = action.payload;
    },

    updateQueue(state, action: PayloadAction<IQueueUpdate>) {
      state.queue = action.payload;
    },

    setCursor(state, action: PayloadAction<typeof initialState.cursor>) {
      state.cursor = action.payload;
    },

    setScene(state, action: PayloadAction<TGameScenes>) {
      state.gameScene = action.payload;
    },

    setFleatShema(state, action: PayloadAction<TShipOnFleetShema[]>) {
      //console.log('FleatShema = ', action.payload);
      state.fleetShema = action.payload;
    },

    readBubbleMsg(state, action: PayloadAction<string>){
      state.bubbleMsg = state.bubbleMsg.filter(msg=>msg.id!==action.payload);
    },

    setBubbleMsg(state, action: PayloadAction<TItemMsg>){
      state.bubbleMsg.push(action.payload);
    },

    updateAfterShot(state, action: PayloadAction<IShotParseRes>){
      state.whoStep = action.payload.whoStep;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(gameOver.fulfilled, (state, { payload }) => {
      console.log('gameOver payload = ', payload);
      state.gameStatistic = payload;
      state.gameScene = 'gameOver';
      state.cursor = 'auto';
    });

    builder.addCase(initGame.fulfilled, (state, { payload }) => {
      //console.log('getUser.fulfilled = ', payload);
      state.whoStep = payload.whoStep;
      state.id = payload.id;
      state.enemyInfo = payload.enemyInfo;
      state.fieldShema = payload.cells;
      state.fieldShemaEnemy = payload.enemyCells;
      state.timeToBegin = payload.timeToBegin;
      state.isLoaded = true;
      state.gameScene = 'battle';
      // if(payload.whoStep==='enemy'){
      //   state.bubbleMsg.push(`is '${state.enemyInfo?.name}' turn!`);
      // }else{
      //   state.bubbleMsg.push(`is Your turn!`);
      // }
      //state.initUser = true;
    });

    builder.addCase(shotRes.fulfilled, (state, { payload }) => {
      //console.log('shotRes.fulfilled = ', payload);
      state.whoStep = payload.whoStep;
      state.fleetShemaEnemy = payload.enemyShips;
      //console.log('enemyInfo = ', state.enemyInfo?.id);
      
      if(payload.whoShot!==state.enemyInfo?.id){
        state.fieldShemaEnemy.forEach(cell=>{
          if(cell.id===payload.cell.id){
            cell.isLive = payload.cell.isLive;
            cell.isFree = payload.cell.isFree;
          }
        });
      }else{
        state.fieldShema.forEach(cell=>{
          if(cell.id===payload.cell.id){
            cell.isLive = payload.cell.isLive;
            cell.isFree = payload.cell.isFree;
          }
        });
      }
      state.isLoaded = true;
      //state.initUser = true;
    });
  }
});

export const { createGame, setScene, setFleatShema, setLoadedGame, setToQueue, setCursor, setStatusLoading, setBubbleMsg, readBubbleMsg } = sliceGame.actions;

export default sliceGame;