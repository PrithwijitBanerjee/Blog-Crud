import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const status=Object.freeze({
    idle:'IDLE',
    loading:'LOADING',
    error:'ERROR'
});//Read Only...


const baseUrl='https://api.escuelajs.co/api/v1'

//Redux Thunk MIddleware...
export const fetchingProducts=createAsyncThunk('fetch/products',
async()=>{
    try{
        const {data}=await axios.get(`${baseUrl}/products`);
        return data;
    }catch(error)
    {
        console.log(error);
    }
});

//creating slice as reducer...

export const ProductSlice=createSlice({
    name:'products/fetch',
    initialState:{
        products_data:[],
        loading:status?.idle,
        error:''
    },
    reducers:{
            clear_products:state=>{
                state.loading=status?.idle;
                state.products_data=[];
            }
    },
    extraReducers:builder=>{
        builder.addCase(fetchingProducts.pending,state=>{
            state.loading=status?.loading;
        })
        .addCase(fetchingProducts.fulfilled,(state,{payload})=>{
            state.loading=status?.idle;
            state.products_data=payload;
        })
        .addCase(fetchingProducts.rejected,(state,{payload})=>{
            state.loading=status?.error;
            state.error=payload;
        })
    }
});

export const {clear_products}=ProductSlice.reducer;
export default ProductSlice;