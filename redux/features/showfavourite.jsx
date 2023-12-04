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

export const showfavourite = createAsyncThunk('user/showfavourite', async () => {
  // try {
    const res = await axiosInstance.get('/api/user/favourite', {
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

const favouriteslice = createSlice({
  name: 'service',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(showfavourite.pending, (state) => {
        state.loading = true;
        state.error = null; // Reset error when a new request starts
      })
      .addCase(showfavourite.fulfilled, (state, action) => {
        state.loading = false;
        state.fav = action.payload;
        console.log(action.payload)
        console.log(action.payload)
        state.error = null; // Reset error on success
      })
      .addCase(showfavourite.rejected, (state, action) => {
        state.loading = true;
        state.fav = [];
        state.error = action.error.message;
      });
  },
});

export default favouriteslice.reducer;
