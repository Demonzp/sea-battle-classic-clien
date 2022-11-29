import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// const user: TUser = {
//     id: '1',
//     name: 'Petya',
//     firstName: 'Petya',
//     secondName: 'Drisch',
//     email: 'test@gma.com'
// };

export type TUser = {
    name: string,
    firstName: string;
    secondName: string;
    email: string;
    id: string,
}

export interface IApp{
    user: TUser|null
}

const initialState: IApp = {
    user: null
};

const sliceApp = createSlice({
    name: 'app',
    initialState,
    reducers:{
        setUser(state, action: PayloadAction<TUser>){
            state.user = action.payload;
        },
        setGuest(state){
            state.user = null;
        }
    },
    extraReducers:(builder)=>{

    }
});

export const { setUser, setGuest } = sliceApp.actions;

export default sliceApp;