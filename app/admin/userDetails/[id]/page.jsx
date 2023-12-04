'use client'
import Adminuserprofile from '@/components/admin/userdetails'
import { useParams } from 'next/navigation'
import React from 'react'

const Page = () => {
  const params=useParams()

  return (
    <div>
        <Adminuserprofile id={params.id} />
      
    </div>
  )
}

export default Page

