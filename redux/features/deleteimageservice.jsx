import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { getCookie } from "cookies-next";
import { axiosInstance } from './axioseInstance';

const initialState = {
  loading: false,
  service: '',
  error: null, 
};

const cookie = getCookie('token');

export const deleteserviceimage = createAsyncThunk('user/deleteserviceimage', async (element) => {
  console.log(imageUrl)
  const {id,imageUrl}=element
  console.log(imageUrl)

  // try {
    const res = await axiosInstance.put('/api/service/deleteimage',{
      serviceid:id,
      url:imageUrl,
      
    }
    );
    return res.data;
 
});

const deleteserviceimglice = createSlice({
  name: 'deleteserviceimage',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(deleteserviceimage.pending,(state) => {
        state.loading = true;
        state.error = null; // Reset error when a new request starts
      })
      .addCase(deleteserviceimage.fulfilled, (state, action) => {
        state.loading = false;
        state.service = action.payload;
        console.log(action.payload)
        state.error = null; // Reset error on success
      })
      .addCase(deleteserviceimage.rejected, (state, action) => {
        state.loading = true;
        state.service = '';
        state.error = action.error.message;
      });
  },
});

export default deleteserviceimglice.reducer;
