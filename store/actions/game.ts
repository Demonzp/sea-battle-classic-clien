import { createAsyncThunk } from '@reduxjs/toolkit';
import { IGameServerStateParseRes, IGameServerStateRes, setFleatShema } from '../slices/game';
import { AppState } from '../store';

export const initGame = createAsyncThunk<IGameServerStateParseRes, IGameServerStateRes,
    {
        state: AppState
    }
>
    (
        'game/initGame',
        async (serverData, { dispatch, getState }) => {
            const parseData: IGameServerStateParseRes = {
                ...serverData,
                whoStep: serverData.whoStep === getState().app.user?.id ? 'you' : 'enemy'
            }

            dispatch(setFleatShema(serverData.fleatShema));

            return parseData;
        }
    );