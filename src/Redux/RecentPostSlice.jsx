import {createAsyncThunk,createSlice} from '@reduxjs/toolkit'
import { axiosInstance } from '../Api/apiUrl';


export const statusRecent=Object.freeze({
    idle:'IDLE',
    loading:'LOADING',
    error:'ERROR'
}); //Read Only...


const initialState={
    loading:statusRecent?.idle,
    recent_post_data:[],
    error:'',
};

//Thunk Middleware...

export const fetchRecentPosts=createAsyncThunk('fetch/letest-post/user',
async ()=>{
    try{
        const {data}=await axiosInstance.get('letest-post');
        return data;
    }catch(error)
    {
        console.log(error);
    }
});

//Slice...

export const RecentPostSlice=createSlice({
    name:'letest-post/user/fetch',
    initialState,
    reducers:{
            clear_recent_post:state=>{
                state.loading=statusRecent?.idle;
                state.recent_post_data=[];
            }
    },
    extraReducers:builder=>{
        builder.addCase(fetchRecentPosts.pending,state=>{
            state.loading=statusRecent?.loading;
            state.error='';
        })
        .addCase(fetchRecentPosts.fulfilled,(state,{payload})=>{
            state.loading=statusRecent?.idle;
            state.error='';
            if(payload?.status==='success')
            {
                state.recent_post_data=payload?.data;
            }
        })
        .addCase(fetchRecentPosts.rejected,(state,{payload})=>{
            state.loading=statusRecent?.error;
            state.error=payload;
        })
        
    }
});

export const {clear_recent_post}=RecentPostSlice.actions;

export default RecentPostSlice;