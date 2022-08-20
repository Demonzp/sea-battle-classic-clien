import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type TGameScenes = 'shipyard'|'fleatShema';

export interface IGame{
  isInitClienGame: boolean;
  gameScene: TGameScenes;
}

const initialState: IGame = {
  isInitClienGame: false,
  gameScene: 'shipyard'
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
    }
  },
  extraReducers:(builder)=>{

  }
});

export const { createGame, setScene } = sliceGame.actions;

export default sliceGame;