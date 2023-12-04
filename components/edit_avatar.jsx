'use client'
import  { useState } from 'react'
import upload from './upload'
import { getCookie } from "cookies-next";
import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import EditIcon from '@mui/icons-material/Edit';
import { axiosInstance } from '@/redux/features/axioseInstance';



const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 300,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};


function Edit_avatar() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const[image,setImage]=useState('')
 console.log(image)
    const cookie=getCookie('token')
    const[avatar,setavatar]=useState(null)
    console.log(avatar)
    const handleupload= async()=>{
        try{
            const url=await upload(avatar)
            console.log(url)
            setImage(url)

            await axiosInstance.put('http://127.0.0.1:8000/api/user/profile/avatar',
            {
                avatar:url

            },
            {
           headers: {
                    Authorization: `Bearer ${cookie}`,
                  }
                }

            )
            // if(window){

            //   window.location.reload()
            // }

              


        }catch(error){
            console.log("from upload",error.message);
        }


    }
    const uploadavatar=  async (e)=>{
        setavatar(e.target.files[0])

    }
    const handleavatar=(e)=>{
        e.preventDefault()

    }

  return (
    <div>
    <Button onClick={handleOpen}><EditIcon/></Button>
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
      <form action="" onSubmit={handleavatar}>
        <img src={image} alt="" />
        <Button component="label" variant="contained" startIcon={<CloudUploadIcon />}  onChange={(e)=>uploadavatar(e)} >
      Upload file
      <VisuallyHiddenInput type="file" />
    </Button>
        <button type='submit' onClick={()=>handleupload()} >upload</button>
      </form>
      </Box>
      </Modal>
    </div>

  )
}

export default Edit_avatar
