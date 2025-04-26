import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    videoURL: null,
    uploadProgress: 0,
};

export const videoSlice = createSlice({
    name: 'video',
    initialState,
    reducers: {
        addVideo: (state, action) => {
            state.videoURL = action.payload.videoURL;
        },
        removeVideo: (state) => {
            state.videoURL = null;
            state.uploadProgress = 0;
        },
        setUploadProgress: (state, action) => {
            state.uploadProgress = action.payload;
        },
    },
});

export const { addVideo, removeVideo, setUploadProgress } = videoSlice.actions;
export default videoSlice.reducer;
