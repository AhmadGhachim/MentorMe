import React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import FooterLogo from '../assets/FooterLogo.png'

const Footer = () => {
  return (
      <Box
          component="footer"
          sx={{
              backgroundColor: '#016EEA',
              color: 'white',
              padding: '20px 0',
              textAlign: 'center',
              marginTop: 'auto', // Push the footer to the bottom
              width: '100%', // Fill the screen horizontally
          }}
      >
        <Container>
          {/* Placeholder logo image */}
          <img
              src={FooterLogo} // Replace with your actual logo image URL
              alt="Logo"
              style={{ borderRadius: '50%', marginBottom: '20px' }}
          />

          {/* Text */}
          <Typography variant="body2">
            Privacy Policy | Terms and Conditions | Sitemap | Legal
          </Typography>
        </Container>
      </Box>
  );
};

export default Footer;
