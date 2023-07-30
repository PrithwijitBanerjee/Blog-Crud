import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";
import {axiosInstance} from '../Api/apiUrl'
import {toast} from 'react-toastify'
const initialState=Object.freeze({
        loading:false,
        error:'',
        redirectReg:null,
        name:'',
        msg:''
});//Read Only...


//Thunk Middleware...

export const userRegister=createAsyncThunk('user/signUp',
async(data)=>{
    try{    
            const res=await axiosInstance.post('register',data);
            console.log('res from register end point:', res?.data);
            return res?.data;
    }catch(error)
    {
        toast.error(error?.response?.data?.msg,{
            theme:'colored'
        });
    }
});



//slice...

export const RegistrationSlice=createSlice({
    name:'signUp/user',
    initialState,
    reducers:{
        clearLog:(state,{payload})=>{
            localStorage.removeItem('name');
        },
        redirect_to_reg:(state,{payload})=>{
            state.redirectReg=payload;
        }

    },
    extraReducers:builder=>{
        builder.addCase(userRegister.pending,state=>{
            state.loading=true;
            state.error='';
        })
        .addCase(userRegister.fulfilled,(state,{payload})=>{
            state.loading=false;
            state.error='';
            if(payload?.success===true)
            {
                    state.msg=payload?.message;
                    state.name=payload?.data?.name;
                    state.redirectReg='/login';
                    localStorage.setItem('name',state.name);
                    toast.success(state.msg,{
                        theme:'colored'
                    });
            }
        })
    }
});

export const {clearLog,redirect_to_reg}=RegistrationSlice.actions;
export default RegistrationSlice;