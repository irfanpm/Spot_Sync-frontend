'use client'
import React, { useEffect } from 'react'
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import { adminBlockUser, adminGetBlockuser, adminfetchUserbyid, adminfetchUserservice } from "@/redux/features/adminredux/adminfeatures";
import { useDispatch, useSelector } from "react-redux";
import { Button, Grid, Paper } from "@mui/material";
import Avatar from '@mui/material/Avatar';
import { useRouter } from 'next/navigation';
function preventDefault(event) {
  event.preventDefault();

}

export default function UserBlocklist() {
const router=useRouter
  const users=useSelector((state)=>state.admin.Userblock.data) 
    // console.log(userblock)
    // console.log(users)
    const dispatch=useDispatch()
    useEffect(()=>{

        dispatch(adminGetBlockuser())
    },[])
    const handlebBlock=(id)=>{
      dispatch(adminBlockUser(id))
     
        dispatch(adminGetBlockuser())


      
        dispatch(adminGetBlockuser())

      
      

    }
    const handledetails=(id)=>{
      dispatch(adminfetchUserbyid(id))
      dispatch(adminfetchUserservice(id))
      router.push(`/admin/userDetails/${id}`)

    }
    
  return (
    <React.Fragment>
      <div className='row'>

      {users?.map((item,index)=>(

      <Grid className='col-lg-3 col-md-6 mt-5' key={index} >
        <Paper
          sx={{
            p: 2,
            display: "flex",
            flexDirection: "column",
            justifyContent:"center",
            alignItems:"center",
            height: 240,
          }}
        >
          <Avatar
  alt="Remy Sharp"
  src={item.avatar}
  sx={{ width: 56, height: 56 }}
/>
          <Typography component="p" variant="h5">{item?.Username}</Typography>
          <Typography color="text.secondary" >{item.Email} </Typography>
          <Typography color="text.secondary" >{item.MobileNumber} </Typography>
          <div className='d-flex'>
          <Button style={{background:(item.isBlock==true)?"green":"red",color:"white"}} onClick={()=>{handlebBlock(item?._id)}}>{item.isBlock==true? "unBlock": "Block"}</Button>
          <Button style={{ background:"blue",color:"white"}}onClick={()=>handledetails(item._id)} className='ms-2'> details</Button>

          </div>

          <div>
            <Link color="primary" href="#" onClick={preventDefault}></Link>
          </div>
        </Paper>
      </Grid>
            ))

}
</div>
    </React.Fragment>
  );
}
