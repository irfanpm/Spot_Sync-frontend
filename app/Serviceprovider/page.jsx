import { Card } from '@mui/material'
import React from 'react'
import { Container } from '@mui/material';
import Stack from '@mui/material/Stack';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import Servicelogin from '@/components/servicesection/servicelogin';


const page = () => {
  return (
    <Container maxWidth="xl">

    <div className='mt-5 text-center d-flex align-items-center flex-column '>
    
        <h1>Marketing our Service</h1>
        <Stack 
          height={600}
          width={1200}
          alignItems="center"
          justifyContent="center"
          spacing={4}



          
          style={{background:" #ccccff"}}
        > 
        <p >List your business phone, mobile and other contact information, directions,  Business offers and other relevant information <br /> to have  wide and varied customer base.</p> 
            <Stack
  direction="row"
  justifyContent="center"
  alignItems="center"
  spacing={4}

>
<Card sx={{ width: 345,height:245 }} >
      <CardActionArea>
        <CardMedia
        
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
          </Typography>
         
        </CardContent>
      </CardActionArea>
    </Card>
    <Card sx={{ width: 345,height:245 }}>
      <CardActionArea>
        <CardMedia
         
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
          </Typography>
          <Typography variant="body2" color="text.secondary">
           
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
    <Card sx={{ width: 345,height:245 }}>
      <CardActionArea>
        <CardMedia
         
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
          </Typography>
          <Typography variant="body2" color="text.secondary">
          

          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>



</Stack>

<Servicelogin/> 
</Stack>









      
    </div>
    </Container>
  )
}

export default page
