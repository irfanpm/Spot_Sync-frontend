'use client'
import { searchservice } from '@/redux/features/searchredux';
import { Autocomplete, Box, Button, TextField } from '@mui/material';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';


// ... (previous imports)

function RandomImage() {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const dispatch = useDispatch();
  const search = useSelector((state) => state.search.search.data);
  const router = useRouter();

  const imageUrls = [
    "https://source.unsplash.com/800x300/?business"
  ];

  const boxStyle = {
    backgroundImage: `url(${imageUrls[0]})`,
    backgroundSize: '100% 100%',
    height: "400px",
    width: "100%",
    opacity: "0.9"
  };

  const formStyle = {
    border: "2px solid #042469",
    background: "white",
    padding: "10px",
    width: "100%",
    maxWidth: "800px", // Limit the form width on larger screens
    margin: "auto" // Center the form
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const searchValue = e.target.searchvalue.value;
    const location = selectedLocation ? selectedLocation.label : '';
    const latitude = selectedLocation ? selectedLocation.latin : null;
    const longitude = selectedLocation ? selectedLocation.long : null;
    console.log(searchValue, location, latitude, longitude);
    dispatch(searchservice({ value: searchValue, long: longitude, lat: latitude }));
    router.push('/user/searchresult');
  }

  return (
    <div className='container'>
      <Box style={boxStyle} className="mt-5 d-flex flex-column align-items-center justify-content-center">

        <Box  component="form" style={formStyle} onSubmit={handleSearch} >
          <div className='d-flex'>
            <TextField id="outlined-basic" label="Search service" variant="outlined" name='searchvalue' style={{ background: "white", flex: "1" }}  />

            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={top100Films}
              onChange={(event, newValue) => setSelectedLocation(newValue)}
              renderInput={(params) => <TextField {...params} label="Location" id='category' name='place' style={{ background: "white", flex: "1",width:"280px" }}  />}
            />

            <Button type='submit' style={{ width: "120px", background: "#042469", color: "white"  }} className='col-2'>Find</Button>
          </div>
        </Box>

      </Box>
    </div>
  );
}

export default RandomImage;

const top100Films = [
  {
    label: 'Kondotty',
    latin: 11.1434,
    long: 75.962173
  },
  {
    label: 'kakkenchery',
    latin: 11.1638,
    long: 75.8993
  }
];
