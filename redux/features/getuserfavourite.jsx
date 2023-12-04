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

export const userfavourite = createAsyncThunk('user/userfavourite', async () => {
  // try {
    const res = await axiosInstance.get('/api/user/userfavourite', {
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

const userfavouriteslice = createSlice({
  name: 'userfavourite',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(userfavourite.pending, (state) => {
        state.loading = true;
        state.error = null; // Reset error when a new request starts
      })
      .addCase(userfavourite.fulfilled, (state, action) => {
        state.loading = false;
        state.fav = action.payload;
        console.log(action.payload)
        state.error = null; // Reset error on success
      })
      .addCase(userfavourite.rejected, (state, action) => {
        state.loading = true;
        state.fav = [];
        state.error = action.error.message;
      });
  },
});

export default userfavouriteslice.reducer;
