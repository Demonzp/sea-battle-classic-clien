import { createSlice } from '@reduxjs/toolkit';

export type TUser = {
    name: string,
    id: string
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

    },
    extraReducers:(builder)=>{

    }
});

export default sliceApp;