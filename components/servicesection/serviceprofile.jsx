'use client'
import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import { useSelector,useDispatch } from 'react-redux';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { fetchService } from '@/redux/features/getService';
import { useEffect,useState } from "react";
import CardMedia from '@mui/material/CardMedia';
import {deleteService} from '@/redux/features/deleteService';
import { getCookie } from "cookies-next";
import {findService} from '@/redux/features/findService';
import { useRouter } from 'next/navigation';
import { recieve } from '@/redux/features/serviceimage';
import {servicereviews } from "@/redux/features/reviewdisplay";
import { Rating } from '@mui/material';
import VerifiedIcon from '@mui/icons-material/Verified';

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

export default function Serviceprofile() {
    const dispatch=useDispatch()
    const router=useRouter()
    const user = useSelector((state) => state.user.user.data);
    const service = useSelector((state) => state.service.service.data);
    const service1=useSelector((state)=>state.findservie)
    const review = useSelector((state) => state.review.reviews.data);
    console.log(review)

  console.log(service1)

   

    const cookie = getCookie('token');

    const addservice=(id)=>{
      router.push(`/Serviceprovider/addService/${id}`)

    }

    useEffect(() => {
        dispatch(fetchService());
        dispatch(servicereviews())
    },[]);

    const [value, setValue] = React.useState('1');


    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
    console.log(user)
    const removeService =(id)=>{
         dispatch(deleteService(id))
         dispatch(fetchService());
         dispatch(fetchService());

    }
    const clickservice=(id)=>{
      dispatch(findService(id))
      router.push(`/Serviceprovider/serviceDetails/${id}`)

    }
   

  return (
    <div className='container'>
    <Card sx={{ minWidth: 275 ,height:160 }} className='d-flex justify-content-center align-items-center' style={{borderStyle:"none",boxShadow:"none"}}>
        { user?.map((item)=>(
            <>
      <Avatar alt={item.Username} src={item.avatar}  style={{width:"15vh" ,height:"15vh"}}/>
      <CardContent >
        <Typography variant="h5" component="div">
            {item.Username}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
        {item.Email}

        </Typography>
      
      </CardContent>
      <CardActions>
      </CardActions>
<Button size="small" style={{background:"blue", color:"white"}} onClick={()=>addservice(item._id)}>Add Service</Button>
      </>
       ))
}

       </Card>
    <Box sx={{ width: '100%', typography: 'body1' }} >
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example"  centered>
            <Tab label="Services" value="1" />
            <Tab label="Reviews" value="2" />
          
          </TabList>
        </Box>
        <TabPanel value="1" className='row '>
        {
          service?.map((item,index)=>( 
         
         <Card sx={{ maxWidth: 345 }} key={index} className=' col-md-3 '  >
   <CardMedia
        component="div" // Use a div as the container
        sx={{ height: 140, display: 'flex',}} // Add scrollable styles
      >
          <img
            src={item?.Image[0]}
            alt="Image"
            style={{ flex: '0 0 auto', minWidth: '100%' }} // Ensure images don't stretch
          />
      </CardMedia>
          
      <CardContent >
        <Typography gutterBottom variant="h6" component="div">
          {item?.serviceName}
        {item?.isApproved==true?<VerifiedIcon style={{color:"green"}}/>  : null} 
        </Typography>
        <Typography variant="body2" color="text.secondary">
       {item?.Category}
        </Typography>
      
      </CardContent>
      <CardActions>
        <Button size="small" onClick={()=>removeService(item._id)} style={{background:"red",color:"white"}}>Delete</Button>
        <Button size="small"  onClick={()=>clickservice(item._id)} style={{background:"green",color:"white"}} >show Details</Button>
      </CardActions>
    </Card>
          
          ))
        }




        </TabPanel>
        <TabPanel value="2">
          <div className='d-flex flex-column align-items-center'>
            {
              review?.map((item,index)=>(
                <Card  className='d-flex col-md-8 mt-2  '  key={index} >
                <CardMedia
                     component="div" 
                     sx={{  display: 'flex',}}
                     className='w-25'
                   >
                       <img
                         src={item?.serviceId?.Image[0]}
                         alt="Image"
                         style={{ flex: '0 0 auto', minWidth: '100%' }} // Ensure images don't stretch
                       />
                   </CardMedia>
                       
                   <CardContent >
                     <Typography  variant="h6" component="div">
                       {item?.serviceId?.serviceName}
                     </Typography>
                     <div className="d-flex align-items-center ">
            <Avatar alt="Remy Sharp" src={item.userId.avatar} />&nbsp;
            <h6 className="mt-1">{item.userId.Username}</h6>
          </div>
          <div>
            <Rating
              name="rating"
              defaultValue={item.Rating}
              precision={0.5}
              size="large"
              readOnly
            />
            <p>{item.Comment}</p>
          </div>
                   </CardContent>
                   <CardActions>
                    
                   </CardActions>
                 </Card>
                
              ))
            }
          </div>

        </TabPanel>
       
      </TabContext>
    </Box>

    </div>
  );
}
