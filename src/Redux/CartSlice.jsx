import {createSlice} from '@reduxjs/toolkit'
import {toast} from 'react-toastify'
export const status=Object.freeze({
    loading:'LOADING',
    idle:'IDLE',
    error:'ERROR'
});



const initialState={
    loading:status?.idle,
    cart_items:[],
    error:'',
    length:0,
};





export const CartSlice=createSlice({
    name:'cart/users',
    initialState,
    reducers:{
            add_to_cart:(state,{payload})=>{
                localStorage.setItem('cart_status',JSON.stringify(true));
                state.cart_items.push(payload);
                state.length=state.cart_items?.length;
                localStorage.setItem('cart_items',JSON.stringify(state.cart_items));
                localStorage.setItem('length',JSON.stringify(state.length));
                
            },
            remove_cart:(state,{payload})=>{
                localStorage.setItem('cart_status',JSON.stringify(true));
                state.cart_items=state.cart_items.filter(record=>record?.id!==parseInt(payload));
                state.length=state.cart_items?.length;
                localStorage.setItem('cart_items',JSON.stringify(state.cart_items));
                localStorage.setItem('length',JSON.stringify(state.length));
            },
            check_cart:state=>{
                if(JSON.parse(localStorage.getItem('cart_status'))===true)
                {
                    state.cart_items=JSON.parse(localStorage.getItem('cart_items'));
                    state.length=JSON.parse(localStorage.getItem('length'));
                }
            },
            clear_cart:state=>
            {
                state.cart_items=[];
                state.length=0;
                localStorage.removeItem('cart_items');
                localStorage.removeItem('length');
                localStorage.removeItem('cart_status');
                toast.error('Thank you for clearing entire Add To Cart section!!!',{
                    theme:'colored'
                });
            }
    }
});

export const {add_to_cart,remove_cart,check_cart,clear_cart}=CartSlice.actions;
export default CartSlice.reducer;