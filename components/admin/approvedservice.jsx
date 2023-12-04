'use client'
import React, { useEffect } from 'react'
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";

import { useDispatch, useSelector } from "react-redux";
import { Button, Grid, Paper } from "@mui/material";
import { adminApprovedService,adminBlockService,adminUnApprovedService, adminfetchservicebyid } from '@/redux/features/adminredux/adminfeatures';
import { useRouter } from 'next/navigation';
function preventDefault(event) {
  event.preventDefault();

}

export default function Approvedservice() {
  const router=useRouter()
    const services=useSelector((state)=>state.admin.unapproved.data)
    console.log(services)
    const dispatch=useDispatch()
    useEffect(()=>{

        dispatch(adminUnApprovedService())
    },[])
    const handlebBlock=(id)=>{
      dispatch(adminApprovedService(id))
     
      dispatch(adminUnApprovedService())
      
      dispatch(adminUnApprovedService())

      
      

    }
    const clickservice=(id)=>{
      dispatch(adminfetchservicebyid(id))
      router.push(`/admin/servicedetails/${id}`)


    }
  return (
    <React.Fragment>
      <div className='row'>
      {(services?.map((item,index)=>(

      <Grid className='col-lg-3 col-md-6 mt-5' key={index} >
        <Paper
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems:"center",
            height: 300,
          }}
        >
          {/* <Avatar
  alt="Remy Sharp"
  src={item.avatar}
  sx={{ width: 56, height: 56 }}

/> */}
<img src={item?.Image[0]} alt="image" style={{width:"280px",height:"170px"}} />
          <Typography component="p" variant="h6">{item?.serviceName}</Typography>
          <Typography color="text.secondary" >{item.Category} </Typography>
          {/* <Typography color="text.secondary" >{item.Phone} </Typography> */}
          <div className='d-flex'>
          <Button  style={{background:"red",color:"white"}} onClick={()=>{handlebBlock(item?._id)}}>Approve</Button>
          <Button size="small"  onClick={()=>clickservice(item._id)} className='ms-2' style={{background:"blue",color:"white"}} >Details</Button>

          </div>

          <div>
            <Link color="primary" href="#" onClick={preventDefault}></Link>
          </div>
        </Paper>
      </Grid>
            )))

}
</div>
    </React.Fragment>
  );
}
