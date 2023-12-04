'use client'
import React, { useEffect ,useState} from 'react'
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import { adminBlockUser, adminfetchUser,adminfetchUserbyid,adminfetchUserservice} from "@/redux/features/adminredux/adminfeatures";
import { useDispatch, useSelector } from "react-redux";
import { Box, Button, CircularProgress, Grid, Pagination, Paper } from "@mui/material";
import Avatar from '@mui/material/Avatar';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from 'next/navigation';
import { adminaxiosInstance } from '@/redux/features/axioseInstance';
function preventDefault(event) {
  event.preventDefault();

}

export default function Userlist() {
  // const [reportedItems, setReportedItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const router=useRouter()
    const users=useSelector((state)=>state.admin.user) 
  
    // console.log(userblock)
    console.log(users)
    const dispatch=useDispatch()
    useEffect(() => {
     
      dispatch(adminfetchUser(currentPage))
      console.log(users.totalPages)
      setTotalPages(users.totalPages);


      setLoading(false);

    }, [currentPage]);
    const handlePageChange = (event, newPage) => {
      setCurrentPage(newPage);
    };
  
    const handlebBlock=(id)=>{
      dispatch(adminBlockUser(id))
     


      setTimeout(() => {
        dispatch(adminfetchUser())


        
      }, 50);

      
      

    }

    const handledetails=(id)=>{
      dispatch(adminfetchUserbyid(id))
      dispatch(adminfetchUserservice(id))
      router.push(`/admin/userDetails/${id}`)

    }
    
    
    const notify = () =>
      toast.info("This feature is under development. Stay tuned for updates!");
    const renderReportedItemCard = (item) => (


      <Grid className='col-lg-3 col-md-6 mt-5'  >
           <ToastContainer />
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



  ); return (
    <Box mt={3}>
      {loading ? (
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          height="80vh"
        >
          <CircularProgress />
        </Box>
      ) : (
        <Box>
          <Grid container spacing={3}>
            {users.data?.map(renderReportedItemCard)}
          </Grid>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            mt={3}
          >
            <Pagination
              count={totalPages}
              page={currentPage}
              color="primary"
              onChange={handlePageChange}
            />
          </Box>
        </Box>
      )}
    </Box>
  );
};


