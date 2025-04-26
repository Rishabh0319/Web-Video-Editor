import { configureStore } from '@reduxjs/toolkit';
import videoReducer from './slices/VideoSlice';


export const store = configureStore({
    reducer: {
        video: videoReducer
    }
});