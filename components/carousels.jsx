'use client'
import Carousel from 'react-bootstrap/Carousel';

function Carousels() {
  return (
    <Carousel>
      <Carousel.Item >
      <img style={{width: "100%", height: "100%"}} src="/image pr.png" />    
        <Carousel.Caption>
         
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
      <img style={{width: "100%", height: "100%"}} src="/image pr.png" />    
         <Carousel.Caption>

        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
      <img style={{width: "100%", height: "100%"}} src="/image pr.png" />    
        <Carousel.Caption>
      
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default Carousels;