import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import CloseIcon from '@mui/icons-material/Close';
import axios from "axios";
import { useDispatch } from 'react-redux';
import { isLoggin } from "../redux/features/auth";
import { setCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import { fetchUser } from '@/redux/features/getuser';
import {  ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 390,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 40,
  p: 4,
};

const stylereg = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 40,
  p: 4,
  
};

const regcontentstyle = {
};

const contentStyle = {
  my: 4,
  mx: 4,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  color: '#040333',
  fontWeight: "bold",
};

export default function RegisterOrLogin() {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [signup, setsignup] = useState(true);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const router = useRouter();
  const [selectedCard, setSelectedCard] = useState(null);
  const handleCardClick = (cardType) => {
    setSelectedCard(cardType);
  };

   

  const handleregister = async (event) => {
    event.preventDefault();
 
    const Username = event.target.username.value;
    const Email = event.target.email.value;
    const Password = event.target.password.value;

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/user/register', {
        username: Username,
        email: Email,
        password: Password,
      });
      handleClose()
      toast.success(response.data.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    } catch (error) {
      handleClose()

      toast.error("please provide fulldetails", {
        position: toast.POSITION.TOP_RIGHT,
      });
           
    }
    event.target.reset();
  }

  const handleLogin = async (event) => {
    event.preventDefault();

    const Username = event.target.username.value;
    const Password = event.target.password.value;
    console.log(Username);


    try {
      const response = await axios.post('http://127.0.0.1:8000/api/user/login', {
        username: Username,
        password: Password
      });
      console.log(response.data.block);
      if(response.data.block==false&&response.data.status=="success"){

      

        setCookie("token", response.data.token);
   
        dispatch(isLoggin())
      
        handleClose();

        toast.success(response.data.message, {
          position: toast.POSITION.TOP_RIGHT,
        });

         
      }else if(response.data.block==true){
        handleClose();

        toast.error(" user is blocked", {
          position: toast.POSITION.TOP_RIGHT,
        });

      }else if(response.data.status=="admin"){
        handleClose();

        toast.success(response.data.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
        setCookie("admintoken", response.data.token);

        router.push('/admin')

      }else{
        toast.error(response.data.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
      }

    } catch (error) {
      toast.error("failed login", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  }

  return (
    <>
      <Button onClick={handleOpen} style={{ color: 'white', background: 'transparent', color: "#040333", fontWeight: "bold", boxShadow: "none" }}>
        Login/Signup
      </Button>
      <ToastContainer />


      {signup ?
        <>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            className='  w-100'

        
          >
            <Box sx={style}>
              <Button
                onClick={handleClose}
                style={{
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  padding: '10px',
                  zIndex: 1,
                  color: '#040333',
                }}
              >

                <CloseIcon />

              </Button>
              <Box sx={regcontentstyle} >
              <Typography component="h2" variant="h4" className='text-center'>
                  Welcome
                </Typography>
                <Typography component="h6" className='text-center'>
                  Your Trusted Local Services Directory
                </Typography>
                <Box component="form" noValidate sx={{ mt: 1 }} onSubmit={handleregister} method='post'>
                      <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="username"
                        label="UserName"
                        name="username"
                        InputProps={{}}
                      />
               
                      <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        InputProps={{}}
                      />
                  
                      <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        InputProps={{}}
                      />
                      <Button type="submit" fullWidth variant="contained" style={{ background: '#040333', color: 'white' }} sx={{ mt: 3, mb: 2 }}>
                        Signup
                      </Button>
                      <Grid container className='d-flex flex-column'>
                        <Grid item xs>
                          <Link href="#" variant="body2">
                            Forgot password?
                          </Link>
                        </Grid>
                        <Grid item>
                          <Link variant="body2" onClick={() => setsignup(signup => !signup)}>
                            {"Already have an account? Login"}
                          </Link>
                        </Grid>
                      </Grid>
                </Box>
              </Box>
            </Box>
          </Modal>
        </>
        :
        <>

          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Button
                onClick={handleClose}
                style={{
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  padding: '10px',
                  zIndex: 1,
                  color: '#040333',
                }}
              >
                <CloseIcon />
              </Button>
              <Box sx={contentStyle}>
                <Typography component="h2" variant="h4">
                  Welcome
                </Typography>
                <Typography component="h6" className='text-center'>
                  Your Trusted Local Services Directory
                </Typography>
                <Box component="form" noValidate sx={{ mt: 1 }} onSubmit={handleLogin} method='post'>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="username"
                    label="Username"
                    name="username"
                    autoComplete="username"
                    InputProps={{}}
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    InputProps={{}}
                  />
                  <FormControlLabel
                    control={<Checkbox value="remember" color="primary" />}
                    label="Remember me"
                  />
                  <Button type="submit" fullWidth variant="contained" style={{ background: '#040333', color: 'white' }} sx={{ mt: 3, mb: 2 }}>
                    Log In
                  </Button>
                  <Grid container>
                    <Grid item xs>
                      <Link href="#" variant="body2">
                        Forgot password?
                      </Link>
                    </Grid>
                    <Grid item>
                      <Link variant="body2" onClick={() => setsignup(signup => !signup)}>
                        {"Don't have an account? Sign Up"}
                      </Link>
                    </Grid>
                  </Grid>
                </Box>
              </Box>
            </Box>
          </Modal>
        </>
      }
    </>
  );
}
