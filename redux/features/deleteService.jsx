import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { getCookie } from "cookies-next";
import { axiosInstance } from './axioseInstance';

const initialState = {
}

const cookie = getCookie('token');

export const deleteService = createAsyncThunk('service/delete', async(id) => {
  // try {
    const res = await axiosInstance.put('/api/service/deleteservice',{
      serviceid:id

    }
    );
    return res.data;
  // } catch (error) {
  //   console.error('Error fetching user:', error);
  //   throw error;
  // }
});

const deleteSlice = createSlice({
  name: 'service',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(deleteService.pending, (state) => {
        state.loading = true;
        state.error = null; // Reset error when a new request starts
      })
      .addCase(deleteService.fulfilled, (state) => {
        state.loading = false;
        state.error = null; // Reset error on success
      })
      .addCase(deleteService.rejected, (state, ) => {
        state.loading = true;
        state.service = [];
      });
  },
});

export default deleteSlice.reducer;
