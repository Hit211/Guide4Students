import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const fetchMentors = createAsyncThunk(
    "mentors/fetchAll",
    async()=>{
    const reponse = await axios.get(`${BASE_URL}/mentors/all`);
    return reponse.data.mentor;
});

export const updateAvailability = createAsyncThunk(
    "mentors/updateAvailability",
    async({id,currentStatus})=>{
        const newStatus = currentStatus === "Available"? "Not Available": "Available";
        await axios.patch(`${BASE_URL}/mentors/${id}/updateState`,{available:newStatus});
        return {id,newStatus};
    }
)
const mentorSlice = createSlice({
    name:"mentors",
    initialState:{
        mentors:[],
        loading:false,
        error:null
    },
    reducers: {},
    extraReducers:(builder)=>{
        builder
        .addCase(fetchMentors.pending,(state)=>{
            state.loading = true;
        })
        .addCase(fetchMentors.fulfilled,(state,action)=>{
            state.loading=false;
            state.mentors = action.payload;
        })
        .addCase(fetchMentors.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.error.message;
        })
        .addCase(updateAvailability.fulfilled,(state,action)=>{
            const {id,newStatus} = action.payload;
            state.mentors = state.mentors.map((mentor)=>
            mentor._id === id? {...mentor,available:newStatus}:mentor);
        })
    }
})



export default mentorSlice.reducer;