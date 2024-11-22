import {createSlice} from "@reduxjs/toolkit";

const initialState={
    videos:[],
    videoCount:0
}

const videoSlicer=createSlice({
    name:'video',
    initialState,
    reducers:{
        addToSaveList:(state,action)=>{
            state.videos.push(action.payload);
            state.videoCount=state.videos.length;
        }
    }
})

export const {addToSaveList}=videoSlicer.actions
export default videoSlicer.reducer
