import { createAsyncThunk } from '@reduxjs/toolkit';
import socketInst from '../../utils/socket';
import { IGameServerStateParseRes, IGameServerStateRes, IShotParseRes, IShotRes, setFleatShema, setStatusLoading, TGameError, TWhoStep } from '../slices/game';
import { AppState } from '../store';

const parseWhoStep = (userId: string, whoId: string): TWhoStep => {
    return whoId === userId ? 'you' : 'enemy';
};

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
                enemyInfo: serverData.enemyData,
                whoStep: parseWhoStep(getState().app.user!.id, serverData.whoStep)
            }

            dispatch(setFleatShema(serverData.fleetShema));

            return parseData;
        }
    );

export const shotRes = createAsyncThunk<IShotParseRes, IShotRes,
    {
        state: AppState
    }
>
    (
        'game/shotRes',
        async (serverData, { getState }) => {
            console.log('serverData = ', serverData);
            const parseData: IShotParseRes = {
                ...serverData,
                whoStep: parseWhoStep(getState().app.user!.id, serverData.whoStep)
            }

            //dispatch(setFleatShema(serverData.fleetShema));

            return parseData;
        }
    );

export const shot = createAsyncThunk<void, { cellId: string },
    {
        state: AppState
    }
>
    (
        'game/shot',
        async (data, { dispatch, getState }) => {
            if (!getState().game.isLoaded) {
                console.log('game is Locked by server!');
                throw Error('game is Locked by server!');
            }
            dispatch(setStatusLoading(false));
            console.log('Стреляю!!!');
            socketInst.emit('shot', data);
        }
    );

export const gameErrorRes = createAsyncThunk<void, TGameError,
    {
        state: AppState
    }
>
    (
        'game/gameErrorRes',
        async (_, { dispatch }) => {
            // if (!getState().game.isLoaded) {
            //     console.log('game is Locked by server!');
            //     throw Error('game is Locked by server!');
            // }
            dispatch(setStatusLoading(true));
            //console.log('Стреляю!!!');
            //socketInst.emit('shot', data);
        }
    );