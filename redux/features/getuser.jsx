import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { getCookie } from "cookies-next";
import { axiosInstance } from './axioseInstance';

const initialState = {
  loading: false,
  user: [],
  error: null, 
};

const cookie = getCookie('token');

export const fetchUser = createAsyncThunk('user/fetchUser', async () => {
  // try {
    const res = await axiosInstance.get('/api/user/profile', {
      
      
      headers: {
        Authorization: `Bearer ${cookie}`,
      },
    });
    console.log(res)
    return res.data;
  // } catch (error) {
  //   console.error('Error fetching user:', error);
  //   throw error;
  // }
});

const userSlice = createSlice({
  name: 'user',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
        state.error = null; // Reset error when a new request starts
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.error = null; // Reset error on success
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.loading = true;
        state.user = [];
        state.error = action.error.message;
      });
  },
});

export default userSlice.reducer;
