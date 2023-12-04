'use client'
import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ReviewsIcon from '@mui/icons-material/Reviews';
import PersonIcon from '@mui/icons-material/Person';
import { useSelector,useDispatch } from 'react-redux';
import { Button, CardActions, CardContent, CardMedia, Typography } from '@mui/material';
import { fetchService } from '@/redux/features/getService';
import { useEffect,useState } from "react";
import Card from 'react-bootstrap/Card';

import { userfavourite } from '@/redux/features/getuserfavourite';
import { useRouter } from 'next/navigation';

export default function UserTab() {
  const [value, setValue] = React.useState(2);
  const [mainvalue, mainsetValue] = React.useState(0);
  const router=useRouter()
const dispatch=useDispatch()
  const user = useSelector((state) => state.user.user.data);
  const service = useSelector((state) => state.service.service.data);
  const userfav = useSelector((state) => state.userfav.fav.data);

  console.log(userfav)
  const handleshowservice=(id)=>{
    console.log(id)
    router.push(`/user/servicedetails/${id}`)
  }


useEffect(() =>{
    dispatch(fetchService());
    dispatch(userfavourite())    
    
},[]);
  // Add a chec to make sure user is defined before accessing its properties
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
    <TabContext value={value}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <TabList onChange={handleChange} aria-label="lab API tabs example" centered> 
<Tab icon={<FavoriteIcon />} label="favorite" value="0" />
        </TabList>
      </Box>
      <TabPanel value="0" className='row justify-content-center'>
        {
          userfav?.map((data)=>(
            <Card  className=' col-md-6 m-2  col-lg-3 ' key={data._Id} style={{width:"250px"}}  >
            <CardMedia
              sx={{ height: 200 ,width:"100%"}}
              image=  {data.serviceId?.Image[0]}
              title="green iguana"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {data.serviceId?.serviceName}
              </Typography>
              <Typography variant="body2" color="text.secondary">
              {/* {data.Address} */}
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small" onClick={()=>handleshowservice(data?.serviceId?._id)} >details</Button>
            </CardActions>
          </Card>


          ))

        }
       
       </TabPanel>
    </TabContext>
  </Box>
  )
}

