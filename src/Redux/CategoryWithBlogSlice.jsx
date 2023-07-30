import {createAsyncThunk,createSlice} from '@reduxjs/toolkit'
import { axiosInstance } from '../Api/apiUrl';

export const status=Object.freeze({
    loading:'LOADING',
    error:'ERROR',
    idle:'IDLE'
});


const initialState={
    loading:status?.idle,
    category_blog_data:[],
    error:''
};

//Thunk Middleware...

export const fetchCategoryWithBlog=createAsyncThunk('category/blog/fetch',
async id=>{
    try{
        const {data}=await axiosInstance.get(`/category/post/${id}`);
        return data;
    }catch(error)
    {
        console.log(error);
    }
});


//Slice...
export const CategoryWithBlogSlice=createSlice({
    name:'blog/category/fetch/user',
    initialState,
    reducers:{
            clear_categoryWithBlog:state=>{
                state.category_blog_data=[];
                state.loading=status?.idle;
            }
    },
    extraReducers:builder=>{
        builder.addCase(fetchCategoryWithBlog.pending,state=>{
            state.loading=status?.loading;
            state.error='';
        })
        .addCase(fetchCategoryWithBlog.fulfilled,(state,{payload})=>{
            state.loading=status?.idle;
            state.error='';
            if(payload?.status==='success')
            {
                state.category_blog_data=payload?.data;
            }
        })
        .addCase(fetchCategoryWithBlog.rejected,(state,{payload})=>{
            state.loading=status?.error;
            state.error=payload;
        })
    }
});


export const {clear_categoryWithBlog}=CategoryWithBlogSlice.actions;
export default CategoryWithBlogSlice;