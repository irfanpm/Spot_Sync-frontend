import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { adminaxiosInstance } from '../axioseInstance';

const initialState = {
  loading: false,
  user: [],
  service:[],
  Userblock:[],
  Serviceblock:[],
  byuser:[],
  byuserservice:[],
  byservice:[],
  unapproved:[],
  error: null, 
};








export const adminfetchUser = createAsyncThunk('admin/adminfetchUser', async (page) => {
  // try {
    const res = await adminaxiosInstance.get(`/api/admin/getusers?page=${page}`,
    );
    return res.data;
  
});
export const adminfetchService = createAsyncThunk('admin/adminfetchService', async () => {
  // try {
    const res = await adminaxiosInstance.get('/api/admin/getservices',);
    return res.data;
  
});
export const adminfetchUserbyid = createAsyncThunk('admin/adminfetchuserbyid', async (id) => {
  // try {
    const res = await adminaxiosInstance.post('/api/admin/getuser',{
      id:id
    });
    // console.log(res)
    return res.data;
  
});
export const adminfetchUserservice = createAsyncThunk('admin/adminfetchuserservice', async (id) => {
  // try {
    const res = await adminaxiosInstance.post('/api/admin/getuserservice',{
      id:id
    });
    return res.data;
  
});
export const adminfetchservicebyid = createAsyncThunk('admin/adminfetchservicebyid', async (id) => {
  // try {
    const res = await adminaxiosInstance.post('/api/admin/getservice',{
      id:id
    });
    console.log(res)
    return res.data;
  
});


export const adminBlockUser = createAsyncThunk('admin/adminBlockUser', async (id) => {
  // try {
    const res = await adminaxiosInstance.post('/api/admin/userblock',{
      id:id
});
    console.log(res)
    return res.data;
  
});

export const adminBlockService = createAsyncThunk('admin/adminBlockService', async (id) => {
  // try {
    const res = await adminaxiosInstance.post('/api/admin/serviceblock',{
      id:id
    });
    console.log(res)
    return res.data;
  
});
export const adminGetBlockuser = createAsyncThunk('admin/adminGetBlockuser', async () => {
  // try {
    const res = await adminaxiosInstance.get('/api/admin/getblockuser',);
    console.log(res)
    return res.data;
  
});
export const adminGetBlockService = createAsyncThunk('admin/adminGetBlockService', async () => {
  // try {
    const res = await adminaxiosInstance.get('/api/admin/getblockservice',);
    console.log(res)
    return res.data;
  
});
export const adminUnApprovedService = createAsyncThunk('admin/adminUnApprovedService', async () => {
  // try {
    const res = await adminaxiosInstance.get('/api/admin/unapproved',);
    console.log(res)
    return res.data;
  
});

export const adminApprovedService= createAsyncThunk('admin/adminApprovedService', async (id) => {
  // try {
    const res = await adminaxiosInstance.post('/api/admin/approved',{
      id:id
    });
  
    return res.data;
  
});





















const adminSlice = createSlice({
  name: 'user',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(adminfetchUser.pending, (state) => {
        state.loading = true;
        state.error = null; 
      })
      .addCase(adminfetchUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.error = null; 
      })
      .addCase(adminfetchUser.rejected, (state, action) => {
        state.loading = true;
        state.user = [];
        state.error = action.error.message;
      })
      .addCase(adminfetchService.fulfilled, (state, action) => {
        state.loading = false;
        state.service = action.payload;
        state.error = null; 
      })
      .addCase(adminBlockUser.fulfilled, (state) => {
        state.loading = false;
        state.error = null; 
      })
      .addCase(adminBlockService.fulfilled, (state) => {
        state.loading = false;
        state.error = null; 
      })
      .addCase(adminGetBlockuser.fulfilled, (state, action) => {
        state.loading = false;
        state.Userblock = action.payload;
        state.error = null; 
      })
      .addCase(adminGetBlockService.fulfilled, (state, action) => {
        state.loading = false;
        state.Serviceblock = action.payload;
        state.error = null; 
      })
      .addCase(adminfetchUserbyid.fulfilled, (state, action) => {
        state.loading = false;
        state.byuser = action.payload;
        state.error = null; 
      })
      .addCase(adminfetchUserservice.fulfilled, (state, action) => {
        state.loading = false;
        state.byuserservice = action.payload;
        console.log(action.payload)
        state.error = null; 
      })
      .addCase(adminfetchservicebyid.fulfilled, (state, action) => {
        state.loading = false;
        state.byservice = action.payload;
        state.error = null; 
      })
      .addCase(adminUnApprovedService.fulfilled, (state, action) => {
        state.loading = false;
        state.unapproved = action.payload;
        console.log(action.payload)
        state.error = null; 
      })
      .addCase(adminApprovedService.fulfilled, (state, action) => {
        state.loading = false;
        console.log(action.payload)
        state.error = null; 
      })
  },
});



export default adminSlice.reducer;
