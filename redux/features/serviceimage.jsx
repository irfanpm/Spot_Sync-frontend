import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  image: []
};

const Serviceimage = createSlice({
  name: 'serviceimage',
  initialState: initialState,
  reducers: {
    send: (state, action) => {
      state.image.push(action.payload);
    },
    deleteImage:(state,action)=>{
      console.log(action.payload)
      state.image.splice(action.payload,1)

    },
    deletearray: (state, action) => {
      state.image = [];
      console.log('ansad');
    }
  }
});

export const { send, deletearray,deleteImage } = Serviceimage.actions; 
export default Serviceimage.reducer;
