'use client'
import Servicedetailsection from '@/components/servicesection/servicedetailsection'
import { useParams } from 'next/navigation'
import React from 'react'
// import LinaerStepper from '@/components/servicesection/addservicestepper';


function Page() {
  const params=useParams()
  return (
    <div >
      <Servicedetailsection id={params.id}/>
      {/* <LinaerStepper/> */}

      
    </div>
  )
}

export default Page
