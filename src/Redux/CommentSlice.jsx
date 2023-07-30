import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../Api/apiUrl";

export const status=Object.freeze({
    idle:'IDLE',
    loading:'LOADING',
    error:'ERROR'
});//Read Only...

const initialState={
    comments:[],
    loading:status?.idle,
    error:'',
}

//Thunk Middleware in Redux Toolkit...

export const fetchComments=createAsyncThunk('user/comments/fetch',
async postId=>{
    try{
        try {
            const response = await axiosInstance.get(`comment/${postId}`);
            return response?.data
        } catch (error) {
           console.log(error);
        }
    }
    catch(error)
    {
        console.log(error);
    }
});


//Slice ...

export const CommentSlice=createSlice({
    name:'fetch/comments/user',
    initialState,
    reducers:{
            clear_comments:state=>{
                state.comments=[];
            },
    },
    extraReducers:builder=>{
        builder.addCase(fetchComments.pending,state=>{
            state.loading=status?.loading;
            state.error='';
        })
        .addCase(fetchComments.fulfilled,(state,{payload})=>{
            state.loading=status?.idle;
            state.error='';
            if(payload?.status==='success')
            {
                state.comments=payload?.post?.comment?.cooments;
            }
        })
        .addCase(fetchComments.rejected,(state,{payload})=>{
            state.loading=status?.error;
            state.error=payload;
        })
    }
});

export const {clear_comments}=CommentSlice.actions;
export default CommentSlice;

