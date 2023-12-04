'use client'
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
  Box,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Serviceupload from './serviceimageupload';
import { getCookie } from "cookies-next";
import { send } from '@/redux/features/serviceimage';
import { useDispatch } from 'react-redux';
import { styled } from '@mui/material/styles';


const style = {
  // position: 'absolute',
  // top: '50%',
  // left: '50%',
  // transform: 'translate(-50%, -50%)',
  width: 700,
  bgcolor: 'background.paper',
  // border: '2px solid #000',
  // boxShadow: 24,
  p: 4,
};
const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});


const ImageUploader = () => {
  const cookie = getCookie('token')
  const dispatch=useDispatch()
  const [selectedImages, setSelectedImages] = useState([]);
  const [viewedImage, setViewedImage] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleImageChange = async (event) => {
    const files = event.target.files;
    if (files.length > 0) {
      const imageArray = Array.from(files); 
      setSelectedImages([...selectedImages, ...imageArray]);

  };

}
  const handleupload=(e)=>{
    e.preventDefault()
    selectedImages.map( async(item)=>{
      try{
        const url=await Serviceupload(item)
        console.log(url)
        dispatch(send(url))

  
    }catch(error){
        console.log("from upload",error.message);
    }
    setSelectedImages([])

    
    
    
  })

    

  }
  

  const removeImage = (index) => {
    const updatedImages = [...selectedImages];
    updatedImages.splice(index, 1);
    setSelectedImages(updatedImages);

  };

  const handleImageClick = (image) => {
    setViewedImage(image);
    setOpenModal(true);
  };


  const handleCloseModal = () => {
    setOpenModal(false);
  };
  useEffect(() => {
    if (openModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    // Ensure that the overflow property is reset when the component unmounts
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [openModal]);



  useEffect(() => {
    if (openModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [openModal]);

  return (
    <div >
       {/* <Button onClick={handleOpen}>Open modal</Button> */}
      {/* <Modal
        keepMounted
        open={open}
        onClose={handleClose}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      > */}
                <Box sx={style} className="d-flex flex-column align-items-center">

      
          <Button component="label" variant="contained" startIcon={<CloudUploadIcon />} className='w-50'  >
      Upload file
      <VisuallyHiddenInput type="file"   onChange={handleImageChange} multiple/>
    </Button>


       
            {/* <div
              style={{
                width: "90%",
                maxWidth: "400px",
                minHeight: "100px",
                border: "2px dashed #ccc",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                margin: "auto",
                padding: "20px",
              }}
            >
          
              {/* {imageURL ? ( */}
              

                   
              
              {/* )} */}
{/* /</div> */} 
          
      <div className='row '>
        
        {selectedImages.slice(0, 5).map((image, index) => (
          <Grid item key={index}   className='col-md-4 mt-5'      >
            <Card variant="outlined" className='text-center'>
              <CardMedia
                component="img"
                alt={`Uploaded Image ${index + 1}`}
                image={URL.createObjectURL(image)}
                onClick={() => handleImageClick(image)}
                style={{ cursor: 'pointer' }}
              />
                {/* <Typography variant="body2" color="textSecondary">
                   file uploaded {index + 1}
                </Typography> */}
                <IconButton
                  onClick={() => removeImage(index)}
                  color="secondary"
                 
                >
                  <DeleteIcon />
                </IconButton>
            </Card>
          </Grid>
        ))}
        
      </div>

      <Modal
        open={openModal}
        onClose={handleCloseModal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
       
              bgcolor: 'background.paper',
              boxShadow: 24,
              // p: 3,
            }}
          >
            {viewedImage && (
              <img
                src={URL.createObjectURL(viewedImage)}
                alt="Viewed Image"
                style={{ maxWidth: '100%', maxHeight: '100%', cursor: 'pointer' }}
                onClick={handleCloseModal}
              />
            )}
          </Box>
      </Modal>

      {(selectedImages.length!=0)?<Button onClick={handleupload} className='mt-5' style={{background:"green" ,color:"white"}}>Submit</Button>:null}

      </Box>

      {/* </Modal> */}

    </div>
  );
};

export default ImageUploader
