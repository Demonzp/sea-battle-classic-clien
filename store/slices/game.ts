import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TShips } from '../../game/objects/Ship';

export type TGameScenes = 'shipyard'|'fleatShema';
export type TShipOnFleatShema = {
  type: TShips,
  angle: number,
  startPos: string
};

export interface IGame{
  isInitClienGame: boolean;
  gameScene: TGameScenes;
  fleatShema: TShipOnFleatShema[];
}

const initialState: IGame = {
  isInitClienGame: false,
  gameScene: 'shipyard',
  fleatShema: [],
};

const sliceGame = createSlice({
  name: 'game',
  initialState,
  reducers:{
    createGame(state){
      state.isInitClienGame = true;
    },

    setScene(state, action: PayloadAction<TGameScenes>){
      state.gameScene = action.payload;
    },

    setFleatShema(state, action:PayloadAction<TShipOnFleatShema[]>){
      console.log('FleatShema = ', action.payload);
      state.fleatShema = action.payload;
    },
  },
  extraReducers:(builder)=>{

  }
});

export const { createGame, setScene, setFleatShema } = sliceGame.actions;

export default sliceGame;