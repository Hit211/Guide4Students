import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice.js";
import mentorReducer from "./mentorSlice.js";
import serviceReducer from "./serviceSlice.js";

export const store = configureStore({
    reducer:{
        auth: authReducer,
        mentors: mentorReducer,
        service: serviceReducer
    }
})