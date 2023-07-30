import {createAsyncThunk,createSlice} from '@reduxjs/toolkit'
import axios from 'axios';

export const status=Object.freeze({
    idle:'IDLE',
    loading:'LOADING',
    error:'ERROR'
});

const initialState={
    loading:status?.idle,
    error:'',
    single_product_data:{}
};

const baseUrl='https://api.escuelajs.co/api/v1';
//Thunk Middleware...
export const fetchSingleProduct=createAsyncThunk('fetch/singleProduct',
async id=>{
    try{
            const {data}=await axios.get(`${baseUrl}/products`);
            const res=data.find(record=>record?.id===parseInt(id));
            return res;
    }catch(error)
    {
        console.log(error);
    }
});


//Slice....

export const MoreProductSlice=createSlice({
    name:'singleProduct/fetch',
    initialState,
    reducers:{
            clear_single_product:(state,{payload})=>{
                state.loading=status?.idle;
                state.single_product_data={};
            }
    },
    extraReducers:builder=>{
        builder.addCase(fetchSingleProduct.pending,state=>{
            state.loading=status?.loading;
            state.error='';
        })
        .addCase(fetchSingleProduct.fulfilled,(state,{payload})=>{
            state.loading=status?.idle;
            state.error='';
            state.single_product_data=payload;
        })
        .addCase(fetchSingleProduct.rejected,(state,{payload})=>{
            state.loading=status?.error;
            state.error=payload;
        })
    }
});


export const {clear_single_product}=MoreProductSlice.actions;
export default MoreProductSlice;
