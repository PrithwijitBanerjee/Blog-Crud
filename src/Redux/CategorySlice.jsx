import {createAsyncThunk,createSlice} from '@reduxjs/toolkit'
import {axiosInstance} from '../Api/apiUrl'
export const status=Object.freeze({
    loading:'LOADING',
    idle:'IDLE',
    error:'ERROR'
}); //Read Only....

const initialState={
    loadingCat:status?.idle,
    all_category_data:[],
    error:''
};

//Thunk Middleware....

export const fetchAllCategory=createAsyncThunk('allCategory/user/blog',
async ()=>{
    try{
        const {data}=await axiosInstance.get('showallcategory');
        return data;
    }catch(error)
    {
        console.log(error);
    }    
});


//Slice...

export const CategorySlice=createSlice({
    name:'user/fetch/allCategory',
    initialState,
    extraReducers:builder=>{
        builder.addCase(fetchAllCategory.pending,state=>{
            state.loadingCat=status?.loading;
            state.error='';
        })
        .addCase(fetchAllCategory.fulfilled,(state,{payload})=>{
            state.loadingCat=status?.idle;
            state.error='';
            if(payload?.status==='success')
            {
                state.all_category_data=payload?.data;
            }
        })
        .addCase(fetchAllCategory.rejected,(state,{payload})=>{
            state.loadingCat=status?.error;
            state.error=payload;
        })
    }
});

export default CategorySlice;