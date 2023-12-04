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
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { adminfetchservicebyid,adminBlockUser,adminfetchUserbyid, adminfetchUserservice, adminGetBlockuser} from '@/redux/features/adminredux/adminfeatures';

import { recieve } from '@/redux/features/serviceimage';
import { Rating } from '@mui/material';

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

export default function Adminuserprofile({id}) {
    const dispatch=useDispatch()
    const router=useRouter()
    const user = useSelector((state) => state.admin.byuser.data);
    const service = useSelector((state) => state.admin.byuserservice.data);

  console.log(service)

useEffect(()=>{
  dispatch(adminfetchUserbyid(id))
      dispatch(adminfetchUserservice(id))
},[])
   

    const cookie = getCookie('token');


  

    const [value, setValue] = useState('1');


    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
    console.log(user)

    const clickservice=(id)=>{
      dispatch(adminfetchservicebyid(id))
      router.push(`/admin/servicedetails/${id}`)


    }
    const handlebBlock=(id)=>{
      dispatch(adminBlockUser(id))
      setTimeout(() => {
        
        dispatch(adminfetchUserbyid(id))
      }, 50);
      
       

      
      

    }
   

  return (
    <div className='container '>
    <Card sx={{ minWidth: 275 ,height:160 }} className='d-flex justify-content-center align-items-center' style={{borderStyle:"none",boxShadow:"none"}}>
        { user?.map((item,index)=>(
            < >
      <Avatar alt={item?.Username} src={item?.avatar}  style={{width:"15vh" ,height:"15vh"}}/>
      <CardContent >
        <Typography variant="h5" component="div">
            {item?.Username}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
        {item?.Email}

        </Typography>
      
      </CardContent>
      <CardActions>
      </CardActions>
<Button style={{background:(item?.isBlock==true)?"green":"red",color:"white"}} onClick={()=>{handlebBlock(item?._id)}}>{item.isBlock==true? "unBlock": "Block"}</Button>
      </>
       ))
}

    </Card>
    <Box sx={{ width: '100%', typography: 'body1' }} >
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example"  centered>
            <Tab label="Services" value="1" />
          
          </TabList>
        </Box>
        <TabPanel value="1" className='row '>
        {
          service?.map((item,index)=>( 
         
         <Card sx={{ maxWidth: 345 }}  key={index}  className=' col-md-3 '  >
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
        <Typography gutterBottom variant="h5" component="div">
          {item?.serviceName}
        </Typography>
        <Typography variant="body2" color="text.secondary">
       {item?.Category}
        </Typography>
      
      </CardContent>
      <CardActions>
        <Button size="small"  onClick={()=>clickservice(item._id)} style={{color:"black"}} >show Details</Button>
      </CardActions>
    </Card>
          
          ))
        }




        </TabPanel>
        <TabPanel value="2">
               </TabPanel>
       
      </TabContext>
    </Box>

    </div>
  );
}
