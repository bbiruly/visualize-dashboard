import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface  Filter {
    from: string | null;
    to: string | null;
    gender: string | null;
    age:string | null 
}

const initialState: Filter ={
    from: null,
    to:null,
    gender:null,
    age:null,
}

const filterSlice =  createSlice({
    name: "filter",
    initialState,
    reducers:{
        filter: (state, action: PayloadAction<{
            from:string,
            to:string,
            gender:string,
            age:string
        }>)=>{
            state.from = action.payload.from;
            state.to = action.payload.to;
            state.gender = action.payload.gender;
            state.age = action.payload.age;
        }
    }
})

export const {
    filter
} = filterSlice.actions

export default filterSlice.reducer 