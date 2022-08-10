import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import sliceApp from './slices/app';
import sliceGame from './slices/game';

export function makeStore(){
    return configureStore({
        reducer: {
            app: sliceApp.reducer,
            game: sliceGame.reducer
        }
    });
}

const store = makeStore();

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    AppState,
    unknown,
    Action<string>
>;

export default store;