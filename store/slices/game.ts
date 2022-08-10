import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface IGame{
  isInitClienGame: boolean
}

const initialState: IGame = {
  isInitClienGame: false
};

const sliceGame = createSlice({
  name: 'game',
  initialState,
  reducers:{
    createGame(state){
      state.isInitClienGame = true;
    }
  },
  extraReducers:(builder)=>{

  }
});

export const { createGame } = sliceGame.actions;

export default sliceGame;