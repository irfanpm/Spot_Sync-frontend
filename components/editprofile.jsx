'use client'
import React, { useState } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useSelector, useDispatch } from 'react-redux';

import axios from 'axios';
import { getCookie } from "cookies-next";
const EditModal = () => {
    const cookie=getCookie('token')
    const [isOpen, setIsOpen] = useState(false);
    const user = useSelector((state) => state.user.user.data);
console.log(user)

 
  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };
  const handleEdit=async (e)=>{
    e.preventDefault()
    const username=e.target.name.value
    const phone=e.target.mobile.value
    const email=e.target.email.value

    try{

        await axios.put('http://127.0.0.1:8000/api/user/profile/edit',
        {
            username:username,
            email:email,

            phone:phone,


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
        console.log(error.message);
    }
    handleClose();


  }

  
  return (
    <div>
      <Button onClick={handleOpen} style={{ color: 'white', background: 'transparent', color: "#040333", fontWeight: "bold", boxShadow: "none" }}>
        Edit profile
      </Button>

      <Modal
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="edit-modal"
        aria-describedby="edit-modal-description"
      >
       
     <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', boxShadow: 24, p: 4 }}>
         <form action="" onSubmit={handleEdit}>
     { user?.map((item)=>(      <>

        <TextField label="Username" id='name' defaultValue={item?.Username}  fullWidth margin="normal" />
          <TextField label="MobileNumber"  defaultValue={item?.MobileNumber} id='mobile' fullWidth margin="normal" />
          <TextField label="Email"  id='email'  defaultValue={item?.Email} fullWidth margin="normal" />

          <Button type='submit' style={{background:"green", color:"white" }} variant="contained"  sx={{ mt: 2 }}>
            Save
          </Button>
          </>
     ))
    }
    </form>
    
        </Box>
      </Modal>
    </div>
  );
};

export default EditModal;
