import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import jwtDecode from 'jwt-decode';
import { TGoogleAuthData, TGoogleAuthRes } from '../../components/SignInWithGoogleBtn/SignInWithGoogleBtn';
import { getUser, setDisconnect } from '../actions/app';

const between = (min:number, max:number)=>{
    return Math.floor(min + Math.random() * (max + 1 - min));
} 
const users = [
    {
        id: '1',
        name: 'Petya',
        firstName: 'Petya',
        secondName: 'Drisch',
        email: 'test@gma.com'
    },
    {
        id: '2',
        name: 'Vasya',
        firstName: 'Vasya',
        secondName: 'Vasya',
        email: 'Vasya@gma.com'
    }
];
const fackeUser: TUser = users[between(0, users.length-1)];

export type TUser = {
    name: string,
    firstName: string;
    secondName: string;
    email: string;
    id: string,
}

export interface IApp{
    token: string|null;
    user: TUser|null;
    initUser: boolean;
    isConnect: boolean;
    //isCanConnect: boolean; 
    isConnected: boolean;
}

const initialState: IApp = {
    token: null,
    user: null,
    initUser: false,
    isConnect: false,
    isConnected: false,
};

const sliceApp = createSlice({
    name: 'app',
    initialState,
    reducers:{
        setUser(state, action: PayloadAction<TGoogleAuthRes>){
            const token = action.payload.credential;
            //console.log('token = ', token);
            const googleData = jwtDecode<TGoogleAuthData>(token);

            const tempUser: TUser = {} as TUser;
            tempUser.name = googleData.name;
            tempUser.firstName = googleData.given_name;
            tempUser.secondName = googleData.family_name;
            tempUser.email = googleData.email;
            tempUser.id = googleData.sub;
            //console.log('user = ', action.payload);
            state.user = tempUser;
            state.token = token;
            state.isConnect = true;
            //state.user = fackeUser;
        },
        setGuest(state){
            state.user = null;
        },

        setConnect(state, action: PayloadAction<boolean>){
            state.isConnected = action.payload;
        },

        setConnected(state, action: PayloadAction<boolean>){
            state.isConnected = action.payload;
            state.isConnect = false;
        },
    },
    extraReducers:(builder)=>{
        builder.addCase(setDisconnect.fulfilled, (state)=>{
            state.isConnected = false;
        });

        builder.addCase(getUser.pending, ()=>{
            //console.log('go to server!!!');
        });

        builder.addCase(getUser.fulfilled, (state, {payload})=>{
            //console.log('getUser.fulfilled = ', payload);
            state.initUser = true;
        });

        builder.addCase(getUser.rejected, (state, {payload})=>{
            state.isConnect = false;
            state.isConnected = false;
            state.initUser = false;
            //console.log('getUser.rejected = ', payload);
        });
    }
});

export const { setUser, setGuest, setConnect, setConnected } = sliceApp.actions;

export default sliceApp;