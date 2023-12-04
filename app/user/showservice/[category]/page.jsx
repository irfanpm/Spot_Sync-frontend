'use client'
import SmallCategorylist from '@/components/categorysection2'
import Showservice from '@/components/showservice'
import { Container } from '@mui/material'
import { useParams } from 'next/navigation'
import React from 'react'

function Page() {
  const params=useParams()
  return (
    <>
    <Container>
    <SmallCategorylist/>

    <Showservice category={params.category}/>
    </Container>
    </>
      
  )
}

export default Page
