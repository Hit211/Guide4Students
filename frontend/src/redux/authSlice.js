import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';

const token = localStorage.getItem("token");

export const signupUser = createAsyncThunk("signUp",async(data,{rejectWithValue})=>{
   try {
    const response = await axios.post("http://localhost:3000/api/user/signup",data,{
        headers:{
            "Content-Type":"application/json"
        },
            withCredentials:true
    });
    if(response.data.success){
        return response.data;
    }else{
        return rejectWithValue(response.data.message);
    }
   } catch (error) {
    return rejectWithValue(error);
   }
})



export const loginUser = createAsyncThunk("login", async(data,{rejectWithValue})=>{
    try {
        const response = await axios.post("http://localhost:3000/api/user/login",data,{
            headers:{"Content-Type": "application/json"},
            withCredentials: true,
        });
        if(response.data.success){
            return response.data;
        }else{
            return rejectWithValue(response.data.message);
        }
    } catch (error) {
        return rejectWithValue(error.response?.data?.message);
    }
})


const initialState = {
    user:null,
    isAuthenticated:false,
    token: token || null,
    loading: false,
    error: null
};

const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers:{
        logout:(state)=>{
            state.user = null;
            state.isAuthenticated = false;
            state.token = null;
            localStorage.removeItem("token");
        }
    },
    extraReducers: (builder)=>{
        builder
        .addCase(loginUser.pending, (state)=>{
            state.loading = true;
            state.error = null;
        })
        .addCase(loginUser.fulfilled,(state,action)=>{
            state.user = action.payload.user;
            state.isAuthenticated = true;
            state.token = action.payload.token;
            state.loading = false;
        })
        .addCase(loginUser.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.payload;
        })

        .addCase(signupUser.pending,(state)=>{
            state.loading = true;
            state.error =  null;
        })
        .addCase(signupUser.fulfilled,(state,action)=>{
            state.loading = false;
            state.user = action.payload.user;
            state.isAuthenticated = true;
        })
        .addCase(signupUser.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.payload;
        })
    }
});

export const {logout} = authSlice.actions;

export default authSlice.reducer;