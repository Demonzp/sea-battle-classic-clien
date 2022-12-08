import { createAsyncThunk } from '@reduxjs/toolkit';
import socketInst from '../../utils/socket';
import { IGameServerStateParseRes, IGameServerStateRes, setFleatShema, setStatusLoading } from '../slices/game';
import { AppState } from '../store';

export const initGame = createAsyncThunk<IGameServerStateParseRes, IGameServerStateRes,
    {
        state: AppState
    }
>
    (
        'game/initGame',
        async (serverData, { dispatch, getState }) => {
            console.log('serverData = ', serverData);
            const parseData: IGameServerStateParseRes = {
                ...serverData,
                whoStep: serverData.whoStep === getState().app.user?.id ? 'you' : 'enemy'
            }

            dispatch(setFleatShema(serverData.fleetShema));

            return parseData;
        }
    );

export const shot = createAsyncThunk<null, {cellId: string},
    {
        state: AppState
    }
>
    (
        'game/shot',
        async (data, { dispatch }) => {
            dispatch(setStatusLoading(false));
            console.log('Стреляю!!!');
            socketInst.emit('shot', data);
            return null;
        }
    );