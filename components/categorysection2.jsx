'use client'
import React from 'react';
import ImageList from '@mui/material/ImageList';
import { Card } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { showservice } from '@/redux/features/showservice';
import { useRouter } from 'next/navigation';

export default function SmallCategorylist() {
  const dispatch=useDispatch()
  const router=useRouter()
  const handlevent=(category)=>{
    console.log(category)
    dispatch(showservice(category))
    router.push(`/user/showservice/${category}`)


  }
  return (
    <div className=' mt-2 ' >
      <ImageList className='row justify-content-between '   >
        {itemData.map((item, index) => (
          <div key={index}  className=' col-1 d-flex  ' onClick={()=>{handlevent(item.title)}}>
          
              <img
                className='w-25 '
                style={{ height: 'auto', opacity: '0.9' }}
                src={item.img}
                alt={item.title}
              />
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
