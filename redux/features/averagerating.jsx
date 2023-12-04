import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { axiosInstance } from './axioseInstance';
import { getCookie } from "cookies-next";


const initialState = {
  loading: false,
  review: '',
  error: null, 
};

const cookie = getCookie('token');

export const Avgreview = createAsyncThunk('user/avgreview', async (id) => {
     const res = await axiosInstance.post('/api/user/avgreview',{     
      serviceid:id
    },{
      headers: {
        Authorization: `Bearer ${cookie}`,
      },
    });
    return res.data;
 
});

const avgreviewSlice = createSlice({
  name: 'Avgreview',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(Avgreview.pending,(state) => {
        state.loading = true;
        state.error = null; // Reset error when a new request starts
      })
      .addCase(Avgreview.fulfilled, (state, action) => {
        state.loading = false;
        state.review = action.payload;
        console.log(action.payload)
        state.error = null; // Reset error on success
      })
      .addCase(Avgreview.rejected, (state, action) => {
        state.loading = true;
        state.review = [];
        state.error = action.error.message;
      });
  },
});

export default avgreviewSlice.reducer;
