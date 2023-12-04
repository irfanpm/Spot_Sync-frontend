'use client'
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Title from '../Title';
import { useDispatch, useSelector } from 'react-redux';
import { adminGetBlockService, adminfetchService } from '@/redux/features/adminredux/adminfeatures';
import { useEffect } from 'react';

  
function preventDefault(event) {
  event.preventDefault();
}

export default function TotalService() {
  const blockservice=useSelector((state)=>state.admin.Serviceblock.data) 
  const services=useSelector((state)=>state.admin.service.data)


  const dispatch=useDispatch()
  useEffect(()=>{
    dispatch(adminfetchService())
    dispatch(adminGetBlockService())
  },[])

  return (
    <>
      <Title>Recent Deposits</Title>
      <Typography component="p" variant="h4">
        {services?.length}
      </Typography>
      <Typography color="text.secondary" sx={{ flex: 1 }}>
        on 15 March, 2019
      </Typography>
      <div>
        <Link color="primary" href="#" onClick={preventDefault}>
          View balance
        </Link>
      </div>
    </>
  );
}