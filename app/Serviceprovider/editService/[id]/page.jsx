'use client'
import EditStepper from '@/components/servicesection/editservicestepper'
import { useParams } from 'next/navigation'

import React from 'react'


function Page() {
  const params=useParams()
  return (
    <div className='mt-5 container'>
        <EditStepper id={params.id}/>
      
    </div>
  )
}

export default Page
