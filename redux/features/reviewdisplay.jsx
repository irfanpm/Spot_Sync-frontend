import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { getCookie } from "cookies-next";
import { axiosInstance } from './axioseInstance';

const initialState = {
  loading: false,
  review: [],
  error: null, 
   reviews:[]
};

const cookie = getCookie('token');

export const getReview = createAsyncThunk('user/review', async (id) => {
  // try {
    const res = await axiosInstance.post('/api/user/displayreview',{
      serviceid:id
    },{
      headers: {
        Authorization: `Bearer ${cookie}`,
      },
    });
    return res.data;
 
});
export const servicereviews = createAsyncThunk('service/review', async () => {
  // try {
    const res = await axiosInstance.get('/api/service/servicereviews',{
      headers: {
        Authorization: `Bearer ${cookie}`,
      },
    });
    return res.data;
 
});


const reviewSlice = createSlice({
  name: 'getReview',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getReview.pending,(state) => {
        state.loading = true;
        state.error = null; 
      })
      .addCase(getReview.fulfilled, (state, action) => {
        state.loading = false;
        state.review = action.payload;
        state.error = null; 
      })
      .addCase(getReview.rejected, (state, action) => {
        state.loading = true;
        state.review = [];
        state.error = action.error.message;
      })
      .addCase(servicereviews.fulfilled, (state, action) => {
        state.loading = false;
        console.log(action.payload);
        state.reviews = action.payload;
        state.error = null; 
      });

  },
});

export default reviewSlice.reducer;
