import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const fetchServices = createAsyncThunk(
    "services/all",async(_,{rejectWithValue})=>{
        try {
            const response = await axios.get(`${BASE_URL}/advice/allservices`);
            return response.data.contact;
        } catch (error) {
            toast.error("Failed to fetch services");
            return rejectWithValue(error.response?.data || error.message);
        }
    }
)

export const updateStatus = createAsyncThunk(
    "services/updateStatus",
    async(id,{rejectWithValue})=>{
      try {
        await axios.patch(`${BASE_URL}/advice/${id}/status`,{status:"completed"});
        toast.success("Service marked as completed");
        return id;
      } catch (error) {
        toast.error("Failed to update status");
        return rejectWithValue(error.message);
      }
    }
);

export const deleteService = createAsyncThunk(
    "services/delete",
    async(id,{rejectWithValue})=>{
        try {
            await axios.delete(`${BASE_URL}/advice/${id}/delete`);
            toast.success("Service deleted successfully");
            return id;
        } catch (error) {
            toast.error("Failed to delete service");
            return rejectWithValue(error.message);
        }
    }
)

const serviceSlice = createSlice({
    name:"Service",
    initialState:{
        services:[],
        loading:false,
        error:null
    },
    reducers:{},
    extraReducers:(builder)=>{
    builder
      .addCase(fetchServices.pending,(state)=>{
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchServices.fulfilled,(state,action)=>{
        state.loading = false;
        state.services = action.payload;
      })
      .addCase(fetchServices.rejected,(state,action)=>{
        state.loading = false;
        state.error = action.payload;
      })
      
      .addCase(updateStatus.fulfilled,(state,action)=>{
        state.services = state.services.map((service)=>
        service._id === action.payload ? {...service,status:"completed"}:service)
      })
      .addCase(deleteService.fulfilled,(state,action)=>{
        state.services = state.services.filter((service)=> service._id !== action.payload);
      })
    }
})


export default serviceSlice.reducer;