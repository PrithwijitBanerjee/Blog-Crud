import {createAsyncThunk,createSlice} from '@reduxjs/toolkit'
import { axiosInstance } from '../Api/apiUrl';


export const status=Object.freeze({
    idle:'IDLE',
    loading:'Loading',
    error:'ERROR'
}); //Read Only...

const initialState={
    loadingArt:status?.idle,
    error:'',
    blog_articles_data:[],
    pageCount:0,
    articles:[],
};

//Thunk Middleware...

export const fetchAllBlogArticles=createAsyncThunk('fetch/allBlogs',
async ()=>{
    try{
            const {data}=await axiosInstance.get('allBlog');
            return data;
    }catch(error)
    {
        console.log(error);
    }
});


//Slice...

export const BlogSlice=createSlice({
        name:'allBlogs/data/fetch',
        initialState,
        reducers:{
                clear_blog_articles:state=>{
                    state.blog_articles_data=[];
                    state.loadingArt=status?.idle;
                    state.pageCount=0;
                    state.articles=[];
                },
                paginate_articles:(state,{payload})=>
                {
                    const lastIndex=payload?.currentPage*payload?.limit;
                    const firstIndex=lastIndex-payload?.limit;
                    state.articles= state?.blog_articles_data?.slice(firstIndex,lastIndex);
                }
        },
        extraReducers:builder=>{
            builder.addCase(fetchAllBlogArticles.pending,state=>{
                state.loadingArt=status?.loading;
                state.error='';
            })
            .addCase(fetchAllBlogArticles.fulfilled,(state,{payload})=>{
                state.loadingArt=status?.idle;
                state.error='';
                if(payload?.status==='success')
                {
                    state.blog_articles_data=payload?.data;
                    state.pageCount=payload?.data?.length;
                }
            })
            .addCase(fetchAllBlogArticles.rejected,(state,{payload})=>{
                state.loadingArt=status?.error;
                state.error=payload;
            })
        }
});


export const {clear_blog_articles,paginate_articles}=BlogSlice.actions;
export default BlogSlice;

