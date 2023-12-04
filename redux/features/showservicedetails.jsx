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

export const Servicedetails = createAsyncThunk('user/Servicedetails', async (id) => {
  // try {
    const res = await axiosInstance.post('/api/user/findservice',{
      serviceid:id
    },{
      headers: {
        Authorization: `Bearer ${cookie}`,
      },
    });
    return res.data;
 
});

const servicedetailsslice = createSlice({
  name: 'Servicedetails',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(Servicedetails.pending,(state) => {
        state.loading = true;
        state.error = null; // Reset error when a new request starts
      })
      .addCase(Servicedetails.fulfilled, (state, action) => {
        state.loading = false;
        state.service = action.payload;
        state.error = null; // Reset error on success
      })
      .addCase(Servicedetails.rejected, (state, action) => {
        state.loading = true;
        state.service = [];
        state.error = action.error.message;
      });
  },
});

export default servicedetailsslice.reducer;
