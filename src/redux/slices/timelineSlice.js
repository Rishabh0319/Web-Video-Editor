import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    scenes: [], // [{ id: 1, name: "Scene 1" }]
};


export const timelineSlice = createSlice({
    name: 'timeline',
    initialState,
    reducers: {
        addScene: (state) => {
            const newId = state.scenes.length + 1;
            state.scenes.push({ id: newId, name: `Scene ${newId}` });
        },
        removeScene: (state, action) => {
            state.scenes = state.scenes.filter(scene => scene.id !== action.payload);
        }
    }
});


export const { addScene, removeScene } = timelineSlice.actions;
export default timelineSlice.reducer;