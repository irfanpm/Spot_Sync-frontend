import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { getCookie } from "cookies-next";
import { axiosInstance } from './axioseInstance';

const initialState = {
  loading: false,
  search: [],
  error: null, 
};

const cookie = getCookie('token');

export const searchservice = createAsyncThunk('user/searchservice', async ({value,lat,long}) => {
  // try {
    const res = await axiosInstance.post('/api/user/search',{
        latitude:lat,
        longitude:long,
        category:value
     },{
      headers: {
        Authorization: `Bearer ${cookie}`,
      },
    }
    );
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
      .addCase(searchservice.pending, (state) => {
        state.loading = true;
        state.error = null; // Reset error when a new request starts
      })
      .addCase(searchservice.fulfilled, (state, action) => {
        state.loading = false;
        state.search = action.payload;
        console.log(action.payload)
        console.log(action.payload)
        state.error = null; // Reset error on success
      })
      .addCase(searchservice.rejected, (state, action) => {
        state.loading = true;
        state.search = [];
        state.error = action.error.message;
      });
  },
});

export default favouriteslice.reducer;
