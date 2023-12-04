'use client';
import React, { useState, useEffect } from 'react';
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Typography,
  IconButton,
  Grid,
  Modal,
  Backdrop,
  Fade,
  ImageList,
  Stack,
  ImageListItem,
  Box,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import Serviceupload from './serviceimageupload';
import { getCookie } from "cookies-next";
import { send } from '@/redux/features/serviceimage';
import { useDispatch, useSelector } from 'react-redux';
import { deleteserviceimage } from '@/redux/features/deleteimageservice';
import { findService } from '@/redux/features/findService';
import { fetchService } from '@/redux/features/getService';
import { Servicedetails } from '@/redux/features/showservicedetails';


const style = {
  // position: 'absolute',

  
  // transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  width: "50%",
  

  // border: '2px solid #000',
  // boxShadow: 24,
  // p: 4,
};

const EditServiceimg = ({id}) => {
  const service = useSelector((state) => state.findservie.service.data);
  console.log(service);

  const cookie = getCookie('token');
  const dispatch = useDispatch();

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const removeImage = (id,imageUrl) => {
    console.log(imageUrl);
    const element={id,imageUrl}
    dispatch(deleteserviceimage(element));
    dispatch(findService(id));
    dispatch(findService(id));





  };
  const refresh=()=>{
    dispatch(findService(id));


  }

  return (
    <div>
      {/* <Button onClick={handleOpen}> edit image</Button> */}
      <Box sx={style}>
         <Button style={{background:"red",color:"white"}} onClick={()=>refresh}> refresh</Button>
        <ImageList sx={{ width: '100%' }} cols={1} rowHeight="auto" style={{ cursor: 'pointer' }} >

          {service?.map((data, dataIndex) => (
            <Stack key={dataIndex} spacing={{ xs: 1, sm: 1 }} direction="row" useFlexGap flexWrap="wrap">
              {data.Image.map((imageUrl, imageIndex) => (
                <ImageListItem key={imageIndex} className='w-25'>
                  <img src={imageUrl} alt={`Draft Image ${imageIndex}`} loading="lazy" />
                  <IconButton
                    onClick={() => removeImage(data._id,imageUrl)}
                    color="secondary"
                    style={{
                      position: 'absolute',
                      top: '10px',
                      right: '10px',
                      visibility:  'visible',
                    }}
                  >
                    <DeleteIcon style={{ color: 'red' }} />
                  </IconButton>
                </ImageListItem>
              ))}
            </Stack>
          ))}
        </ImageList>

      
      </Box>
    </div>
  );
};

export default EditServiceimg;
