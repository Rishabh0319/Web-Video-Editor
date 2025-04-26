import { configureStore } from '@reduxjs/toolkit';
import videoReducer from './slices/VideoSlice';
import timelineReducer from './slices/timelineSlice';

export const store = configureStore({
    reducer: {
        video: videoReducer,
        timeline: timelineReducer,
    }
});