import {createAsyncThunk,createSlice} from '@reduxjs/toolkit'
import {axiosCrud} from '../Api/apiUrl'


const initialState={
    loading:false,
    error:'',
    student_data:[]
};


//Custom Api....

export const addStudent=async stuData=>{
    try{
            const {data}=await axiosCrud.post('student',stuData);
            return data;
    }catch(error)
    {
        console.log('Error while calling Add Student API',error?.message);
    }
}

export const editStudent=async (id)=>{
    try{
            const {data}=await axiosCrud.get(`edit/${id}`);
            return data;
    }catch(error)
    {
        console.log('Error while calling Edit Student API',error?.message);
    }
}

export const updateStudent=async(id,stuData)=>{
    try{
            const {data}=await axiosCrud.post(`update/${id}`,stuData);
            return data;
    }catch(error)
    {
        console.log('Error while calling Update Student API',error?.message);
    }
}

export const deleteStudent=async id=>{
    try{
        const {data}=await axiosCrud.delete(`delete/${id}`);
        return data;
    }catch(error)
    {
        console.log('Error while  Deleting Student API',error?.message);
    }
}
//Thunk Middleware..
export const fetchStudents=createAsyncThunk('students/fetch',
async()=>{
    try{
            const {data}=await axiosCrud.get('allstudent');
            return data;
    }catch(error)
    {
        console.log(error);
    }
});


//Slice...

export const StudentSlice=createSlice({
    name:'fetch/students',
    initialState,
    reducers:{
        clear_student_data:(state,{payload})=>{
            state.student_data=[];
        }
    },
    extraReducers:builder=>{
        builder.addCase(fetchStudents.pending,state=>{
            state.loading=true;
            state.error='';
        })
        .addCase(fetchStudents.fulfilled,(state,{payload})=>{
            state.loading=false;
            state.error='';
            if(payload?.ststus==='success')
            {
                state.student_data=payload?.data;
            }
        })
        .addCase(fetchStudents.rejected,(state,{payload})=>{
            state.loading=payload;
            state.error=payload;
        })
    }
});

export const {clear_student_data}=StudentSlice.actions;
export default StudentSlice;