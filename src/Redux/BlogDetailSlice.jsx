import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../Api/apiUrl";

export const status=Object.freeze({
    idle:'IDLE',
    loading:'LOADING',
    error:'ERROR'
}); //Read Only

const initialState={
    loading:status?.loading,
    error:'',
    blogDetail_data:{},
};

//Thunk Middleware...

export const fetchBlogDetails=createAsyncThunk('fetch/blog/details',
async id=>{
    try{
        const {data}=await axiosInstance.get(`blogdetails/${id}`);
        return data;
    }catch(error)
    {
        console.log(error);
    }
});


//Slice...
export const BlogDetailSlice=createSlice({
    name:'blog/details/fetch',
    initialState,
    reducers:{
            clear_blog_details:state=>{
                state.blogDetail_data={};
                state.loading=status?.idle;
            }
    },
    extraReducers:builder=>{
        builder.addCase(fetchBlogDetails.pending,state=>{
            state.loading=status?.loading;
            state.error='';
        })
        .addCase(fetchBlogDetails.fulfilled,(state,{payload})=>{
            state.loading=status?.idle;
            state.error='';
            if(payload?.status==='success')
            {
                state.blogDetail_data=payload?.data;
            }
        })
        .addCase(fetchBlogDetails.rejected,(state,{payload})=>{
            state.loading=status?.error;
            state.error=payload;
        })
    }
});


export const {clear_blog_details}=BlogDetailSlice.actions;
export default BlogDetailSlice;