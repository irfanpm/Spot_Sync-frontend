'use client'
import { Button } from '@mui/material'
import { useRouter } from 'next/navigation'
import React from 'react'

function Landingpage() {
  const router=useRouter()

  return (
    <div  >
      <div className='row' style={{height:"60vh"}}>
        <div className='col-md-6 d-flex  justify-content-center align-items-center'>
            <div>
                <img style={{borderRadius:"50%", width:"300px",height:"300px"}} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_cC219YXyS44-l3iogAGCMMbS31nD1Hi8Sg&usqp=CAU" alt="" />
            </div>

        </div>
        <div className='col-md-6 d-flex flex-column justify-content-center align-items-center'>
            <div>
                <h1  style={{fontFamily:'sans-serif'}}>Welcome to <span style={{fontWeight:"600",color:"#042469"}}>SpotSync</span></h1>
                <p className='fs-6 mt-2'>Discover the best local services with <span style={{fontWeight:"600",color:"#042469"}}>SpotSync</span>. Connecting you with trusted professionals in your area</p>
            </div>
            

        </div>
      </div>
      <div className='row' style={{height:"60vh"}}>
        <div className='col-md-6 d-flex  justify-content-center align-items-center'>
            <div>
                <img style={{borderRadius:"",}} src="business.jpg" alt="" />
            </div>

        </div>
        <div className='col-md-6 d-flex flex-column justify-content-center align-items-center'>
            <div className='text-center'>
                <h1  style={{fontFamily:'sans-serif'}}>Get your business in front
of  <span style={{fontWeight:"600",color:"#042469"}}> <u>local customers</u></span></h1>
                <p className='fs-5 mt-5'>Maximize your opportunities for shoppers tofind you by advertising with <span style={{fontWeight:"600",color:"#042469"}}>SpotSync</span>.</p>
                <Button style={{background:"#042469",color:"white",width:"150px",height:"40px"}} onClick={()=>router.push('/Serviceprovider')}>Add Service</Button>
           
            </div>
            

        </div>
      </div>
      
    </div>
  )
}

export default Landingpage
