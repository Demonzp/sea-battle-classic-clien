import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TShips } from '../../game/objects/Ship';
import { initGame } from '../actions/game';

export type TEnemy = {
  id: string;
  name: string;
}

export interface IGameServerStateParseRes extends IGameServerStateBase{
  whoStep: typeof initialState.whoStep;
}

export interface IGameServerStateRes extends IGameServerStateBase{
  whoStep: string;
}

export interface IGameServerStateBase{
  id: string;
  cells: TFieldShemaCell [];
  whoStep: string;
  fleatShema: TShipOnFleatShema [];
  enemyCells: TFieldShemaCell [];
  enemyShips: [];
  timeToBegin: number;
  enemyInfo: TEnemy;
}

export interface IQueueUpdate extends IQueue {
  time: number;
}

export interface IQueue {
  online: number;
  queue: number;
};

export type TGameScenes = 'queue' | 'loading' | 'shipyard' | 'fleatShema' | 'battle';
export type TShipOnFleatShema = {
  type: TShips;
  angle: number;
  startPos: string;
};

export type TFieldShemaCell = {
  id: string;
  isLive: boolean;
  isFree: boolean;
};

export interface IGame {
  id: string;
  isInitClienGame: boolean;
  isLoadedGame: boolean;
  gameScene: TGameScenes;
  fleatShema: TShipOnFleatShema[];
  fieldShema: TFieldShemaCell[];
  fieldShemaEnemy: TFieldShemaCell[];
  queue: IQueueUpdate;
  cursor: 'none'|'auto'|'grab';
  whoStep: 'you'|'enemy';
  isLoaded: boolean;
  timeToBegin: number;
  enemyInfo: TEnemy|null;
}

const initialState: IGame = {
  id: '',
  isLoaded: false,
  enemyInfo: null,
  timeToBegin: 0,
  isInitClienGame: false,
  isLoadedGame: false,
  gameScene: 'loading',
  fleatShema: [
    { type: 4, angle: 0, startPos: 'A-7' },
    { type: 3, angle: 0, startPos: 'A-3' },
    { type: 3, angle: 0, startPos: 'C-8' },
    { type: 2, angle: 0, startPos: 'C-5' },
    { type: 2, angle: 0, startPos: 'C-2' },
    { type: 2, angle: 0, startPos: 'E-9' },
    { type: 1, angle: 0, startPos: 'A-1' },
    { type: 1, angle: 0, startPos: 'E-7' },
    { type: 1, angle: 0, startPos: 'E-5' },
    { type: 1, angle: 0, startPos: 'E-3' }
  ],
  fieldShemaEnemy:[],
  fieldShema:[],
  cursor:'auto',
  queue: {
    time: 0,
    online: 0,
    queue: 0
  },
  whoStep: 'enemy',
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

    updateQueue(state, action: PayloadAction<IQueueUpdate>) {
      state.queue = action.payload;
    },

    setCursor(state, action: PayloadAction<typeof initialState.cursor>){
      state.cursor = action.payload;
    },

    setScene(state, action: PayloadAction<TGameScenes>) {
      state.gameScene = action.payload;
    },

    setFleatShema(state, action: PayloadAction<TShipOnFleatShema[]>) {
      //console.log('FleatShema = ', action.payload);
      state.fleatShema = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(initGame.fulfilled, (state, {payload})=>{
      console.log('getUser.fulfilled = ', payload);
      state.whoStep = payload.whoStep;
      state.id = payload.id;
      state.enemyInfo = payload.enemyInfo;
      state.fieldShema = payload.cells;
      state.fieldShemaEnemy = payload.enemyCells;
      state.timeToBegin = payload.timeToBegin;
      state.isLoaded = true;
      state.gameScene = 'battle';
      //state.initUser = true;
  });
  }
});

export const { createGame, setScene, setFleatShema, setLoadedGame, setToQueue, setCursor } = sliceGame.actions;

export default sliceGame;