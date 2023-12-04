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

export const fetchService = createAsyncThunk('user/fetchService', async () => {
  // try {
    const res = await axiosInstance.get('/api/service/showservice',{
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

const serviceSlice = createSlice({
  name: 'service',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchService.pending, (state) => {
        state.loading = true;
        state.error = null; // Reset error when a new request starts
      })
      .addCase(fetchService.fulfilled, (state, action) => {
        state.loading = false;
        state.service = action.payload;
        state.error = null; // Reset error on success
      })
      .addCase(fetchService.rejected, (state, action) => {
        state.loading = true;
        state.service = [];
        state.error = action.error.message;
      });
  },
});

export default serviceSlice.reducer;
