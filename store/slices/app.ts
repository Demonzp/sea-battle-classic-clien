import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import jwtDecode from 'jwt-decode';
import { TGoogleAuthData, TGoogleAuthRes } from '../../components/SignInWithGoogleBtn/SignInWithGoogleBtn';
import { getUser } from '../actions/app';

const between = (min:number, max:number)=>{
    return Math.floor(min + Math.random() * (max + 1 - min));
} 
const fackeUser: TUser = {
    id: String(between(10,1000)),
    name: 'Petya',
    firstName: 'Petya',
    secondName: 'Drisch',
    email: 'test@gma.com'
};

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
}

const initialState: IApp = {
    token: null,
    user: fackeUser,
    initUser: false,
    isConnect: false
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
            //state.user = fackeUser;
        },
        setGuest(state){
            state.user = null;
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(getUser.pending, ()=>{
            //console.log('go to server!!!');
        });

        builder.addCase(getUser.fulfilled, (state, {payload})=>{
            //console.log('getUser.fulfilled = ', payload);
            state.initUser = true;
        });

        builder.addCase(getUser.rejected, (state, {payload})=>{
            //console.log('getUser.rejected = ', payload);
        });
    }
});

export const { setUser, setGuest } = sliceApp.actions;

export default sliceApp;