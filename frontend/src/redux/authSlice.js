import {createSlice} from '@reduxjs/toolkit';

const token = localStorage.getItem("token");

const initialState = {
    user:null,
    isAuthenticated:false,
    token: token || null
};

const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers:{
        login: (state, action) => {
            state.user = action.payload;
            state.isAuthenticated = true;
            state.token = action.payload.token;
            localStorage.setItem("token", action.payload.token);
        },
        
        logout:(state)=>{
            state.user = null;
            state.isAuthenticated = false;
            state.token = null;
            localStorage.removeItem("token");
        }
    }
});

export const {login,logout} = authSlice.actions;

export default authSlice.reducer;