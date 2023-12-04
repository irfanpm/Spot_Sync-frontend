'use client'
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUser } from '../redux/features/getuser';
import { useRouter } from 'next/navigation';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import Edit_avatar from './edit_avatar';
import { fetchService } from '@/redux/features/getService';
import { Button } from '@mui/material';
import EditModal from './editprofile';

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function Userprofile() {
  const router = useRouter();
  
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user.data);
  const loading = useSelector((state) => state.user.loading);
  const [expanded, setExpanded] = useState(false);
  console.log(user)

 


  
  useEffect(()=>{
    dispatch(fetchUser());
    
} ,[])
      
    // Fetch user data when the component mounts
      
      
  


  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card sx={{ width: '40vh' }} className="text-center " >
      {

        user?.map((item) => (
          <Stack direction="column" justifyContent="center" alignItems="center" key={item._id} spacing={2}>
            <CardContent>
              
              <Avatar alt="Remy Sharp" src={item.avatar} sx={{ width: 90, height: 90 }} />        <Edit_avatar/>


              <h2>{item.Username}</h2>
              <p>{item.Email}</p>
            </CardContent>
            <CardActions disableSpacing>
             
              <ExpandMore
                expand={expanded}
                onClick={handleExpandClick}
                aria-expanded={expanded}
                aria-label="show more"
              >
                <ExpandMoreIcon />
              </ExpandMore>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>

              <CardContent><EditModal/></CardContent>
            </Collapse>
          </Stack>
        ))
    }
    </Card>
  );
}
