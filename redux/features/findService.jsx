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

export const findService = createAsyncThunk('user/findService', async (id) => {
  // try {
    const res = await axiosInstance.post('/api/service/findservice',{
      serviceid:id
    },{
      headers: {
        Authorization: `Bearer ${cookie}`,
      },
    });
    return res.data;
 
});

const findserviceslice = createSlice({
  name: 'findservice',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(findService.pending,(state) => {
        state.loading = true;
        state.error = null; // Reset error when a new request starts
      })
      .addCase(findService.fulfilled, (state, action) => {
        state.loading = false;
        state.service = action.payload;
        state.error = null; // Reset error on success
      })
      .addCase(findService.rejected, (state, action) => {
        state.loading = true;
        state.service = [];
        state.error = action.error.message;
      });
  },
});

export default findserviceslice.reducer;
