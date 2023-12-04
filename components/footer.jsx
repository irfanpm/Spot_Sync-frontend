'use client'
import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import YouTubeIcon from '@mui/icons-material/YouTube';
import GoogleIcon from '@mui/icons-material/Google';
import { Divider } from '@mui/material';

const theme = createTheme();

const footerStyle = {
  py: 3,
  px: 2,
  mt: 'auto',
  backgroundColor: (theme) =>
    theme.palette.mode === 'light' ? theme.palette.grey[200] : theme.palette.grey[800],
};

function QuickLinks() {
  return (
    <div>
      <Typography variant="h6" color="text.primary" gutterBottom>
        Quick Links
      </Typography>
      <Link color="inherit" href="#" underline="none">
        Browse category
      </Link>
      <br />
      <Link color="inherit" href="#" underline="none">
        Search business
      </Link>
      <br />
      <Link color="inherit" href="#" underline="none">
        Login to your account
      </Link>
      <br />
      {/* Add more links as needed */}
    </div>
  );
}

function Information() {
  return (
    <div>
      <Typography variant="h6" color="text.primary" gutterBottom>
        Information
      </Typography>
      <Link color="inherit" href="#" underline="none">
        About us
      </Link>
      <br />
      <Link color="inherit" href="#" underline="none">
        Contact us
      </Link>
      <br />
      <Link color="inherit" href="#" underline="none">
        FAQs
      </Link>
      <br />
      <Link color="inherit" href="#" underline="none">
        Careers
      </Link>
      <br />
      {/* Add more links as needed */}
    </div>
  );
}

function MobileSocial() {
  return (
    <div>
      <Typography variant="h6" color="text.primary" gutterBottom>
        Mobile & Social
      </Typography>
      <Link color="inherit" href="#" underline="none">
        <FacebookIcon /> Facebook
      </Link>
      <br />
      <Link color="inherit" href="#" underline="none">
        <TwitterIcon /> Twitter
      </Link>
      <br />
      <Link color="inherit" href="#" underline="none">
        <GoogleIcon /> Google Plus
      </Link>
      <br />
      <Link color="inherit" href="#" underline="none">
        <YouTubeIcon /> You Tube
      </Link>
      {/* Add more links as needed */}
    </div>
  );
}

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center' }}>
      {'Copyright © '}
      <Link color="inherit" href="" underline="none">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export default function StickyFooter() {
  return (
    <ThemeProvider theme={theme}>
  
        <CssBaseline />
        <Container component="main" sx={{ mt: 8, mb: 2 }} maxWidth="sm">
          {/* Your existing content */}
        </Container>
        <Box
          component="footer"
          sx={footerStyle}
        >
          <Container maxWidth="lg">
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                textAlign: 'center',
              }}
            >
              <QuickLinks />
              <Information />
              <MobileSocial />
            </Box>
            <Divider/>
            
            <Typography variant="body1" sx={{ textAlign: 'center' }}>
              My sticky footer can be found here.
            </Typography>
            <Copyright />
          </Container>
        </Box>
     
    </ThemeProvider>
  );
}