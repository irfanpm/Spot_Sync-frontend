import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { getCookie } from "cookies-next";
import { axiosInstance } from './axioseInstance';

const initialState = {
  loading: false,
  service: [],
  error: null, 
};

const cookie = getCookie('token');

export const showservice = createAsyncThunk('user/showservice', async (category) => {
  // try {
    const res = await axiosInstance.post('/api/user/showservice',{
      
    category:category
    } , {
      headers: {
        Authorization: `Bearer ${cookie}`,
      },
    });
    return res.data;
  // } catch (error) {
  //   console.error('Error fetching user:', error);
  //   throw error;
  // }
});

const userserviceSlice = createSlice({
  name: 'service',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(showservice.pending, (state) => {
        state.loading = true;
        state.error = null; // Reset error when a new request starts
      })
      .addCase(showservice.fulfilled, (state, action) => {
        state.loading = false;
        state.service = action.payload;
        state.error = null; // Reset error on success
      })
      .addCase(showservice.rejected, (state, action) => {
        state.loading = true;
        state.service = [];
        state.error = action.error.message;
      });
  },
});

export default userserviceSlice.reducer;
