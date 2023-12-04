'use client'

import LinaerStepper from '@/components/servicesection/addservicestepper';

import { useParams } from 'next/navigation'
import React from 'react'


function Page() {
  const params=useParams()

  return (
    <div className='mt-5 container'>
      <LinaerStepper/>
      
      </div>
  )
}

export default Page
