import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { TGoogleAuthData } from '../../components/SignInWithGoogleBtn/SignInWithGoogleBtn';
import { TUser } from '../slices/app';
import { AppState } from '../store';

type TAny = any;

export const getUser = createAsyncThunk<TUser, undefined, 
    {
        state: AppState,
        rejectValue: TAny
    }
>
    (
        'app/getUser',
        async (_, { getState, rejectWithValue }) => {
            try {
                //console.log('data = ');
                //const res = await axios.post('http://localhost:4000/api/auth/',{},
                const res = await axios.post('https://sea-battle-classic.onrender.com/api/auth/',{},
                {
                    headers:{
                        //Authorization:JSON.stringify(getState().app.user)
                        Authorization:getState().app.token
                    }
                });
                //const res = await axios.get(`https://oauth2.googleapis.com/tokeninfo?id_token=${getState().app.token}`);
                const data = res.data as TGoogleAuthData;
                
                const user = {} as TUser;
                return user;
            } catch (error) {
                //const err = error as Error;
                return rejectWithValue(error);
            }
        }
    );

export const setDisconnect = createAsyncThunk<void, undefined, 
    {
        state: AppState,
        rejectValue: TAny
    }
>
    (
        'app/setDisconnect',
        async () => {
        }
    );