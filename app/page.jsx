import Navbar from '@/components/Navbar'

import Carousels from "@/components/carousels";

import Categorylist from "@/components/categorysection";
import RandomImage from '@/components/randomimage';
import SmallCategorylist from '@/components/categorysection2';
import { Box, Container } from '@mui/material';
import Landingpage from '@/components/landingpage';
import StickyFooter from '@/components/footer';


export default function Home() {
  return (
    <main  >
     
          <Navbar/>
         <Container>
      <RandomImage />
      <div className="mt-2">


      <div >
        <Categorylist />
      </div>
      <Landingpage className="mt-3"/>
      </div>
    </Container> 
      <StickyFooter/>
    </main>
  )
}
