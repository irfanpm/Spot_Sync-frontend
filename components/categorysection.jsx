'use client'
import React from 'react';
import ImageList from '@mui/material/ImageList';
import { Card } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { showservice } from '@/redux/features/showservice';
import { useRouter } from 'next/navigation';

export default function Categorylist() {
  const dispatch=useDispatch()
  const router=useRouter()
  const handlevent=(category)=>{
    console.log(category)
    dispatch(showservice(category))
    router.push(`/user/showservice/${category}`)


  }
  return (
    <div className='container mt-2' >
      <ImageList className='row justify-content-between '  >
        {itemData.map((item, index) => (
          <div key={index} className='text-center col-lg-1 col-md-2 col-4 ' onClick={()=>{handlevent(item.title)}}>
            <div
              style={{
                borderColor: '#05cdff',
                overflow: 'hidden',
                border: '1px solid',
                borderRadius: '50%',
                height: '69px',
                width: '69px', 
              }}
              className='d-flex justify-content-center align-items-center' 
            >
              <img
                className='w-50 mt-2'
                style={{ height: '', opacity: '0.9' }}
                src={item.img}
                alt={item.title}
              />
            </div>
            <span color='#879599'>{item.title}</span>
          </div>
        ))}
      </ImageList>
    </div>
  );
}

const itemData = [
  {
    img: '/categgory icons/educationicon.png',
    title: 'eduction',
  },
  {
    img: '/categgory icons/car-repair.png',
    title: 'repair',
  },
  {
    img: '/categgory icons/hospital.png',
    title: 'hospital',
  },
  {
    img: '/categgory icons/women.png',
    title: 'beautyspa',
  },
  {
    img: '/categgory icons/wedding-rings.png',
    title: 'events',
  },
  {
    img: '/categgory icons/hotel.png',
    title: 'hotel',
  },
  {
    img: '/categgory icons/shop.png',
    title: 'shop',
  },
  {
    img: '/categgory icons/boxes.png',
    title: 'logistics',
  },
  {
    img: '/categgory icons/weight.png',
    title: 'gym',
  },
  {
    img: '/categgory icons/menu.png',
    title: 'more',
  },
];
