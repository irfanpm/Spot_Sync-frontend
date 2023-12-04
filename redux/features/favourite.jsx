import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { getCookie } from "cookies-next";
import { axiosInstance } from './axioseInstance';

const initialState = {
  loading: false,
  fav: [],
  error: null, 
};

const cookie = getCookie('token');

export const favourite = createAsyncThunk('user/favourite', async (id) => {
  // try {
    const res = await axiosInstance.put('/api/user/favourite',{
      serviceid:id
    },{
      headers: {
        Authorization: `Bearer ${cookie}`,
      },
    });
    return res.data;
 
});

const favouriteslice = createSlice({
  name: 'favourite',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(favourite.pending,(state) => {
        state.loading = true;
        state.error = null; // Reset error when a new request starts
      })
      .addCase(favourite.fulfilled, (state, action) => {
        state.loading = false;
        state.fav = action.payload;
        state.error = null; // Reset error on success
      })
      .addCase(favourite.rejected, (state, action) => {
        state.loading = true;
        state.fav = [];
        
        state.error = action.error.message;
      });
  },
});

export default favouriteslice.reducer;
