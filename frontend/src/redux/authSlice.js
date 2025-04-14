import { createSlice } from '@reduxjs/toolkit';

const token = localStorage.getItem("token");
let user = localStorage.getItem("user");

const initialState = {
    user: user || null,
    isAuthenticated: !!token,
    token: token || null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action) => {
            state.user = action.payload.user;
            state.isAuthenticated = true;
            state.token = action.payload.token;
            localStorage.setItem("token", action.payload.token);
            localStorage.setItem("user", JSON.stringify(action.payload.user));
        },

        logout: (state) => {
            state.user = null;
            state.isAuthenticated = false;
            state.token = null;
            localStorage.removeItem("token");
            localStorage.removeItem("user");
        }
    }
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
