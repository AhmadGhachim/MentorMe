import { css } from "@emotion/css";
import NavBar from "../components/NavBarLanding"
import Footer from "../components/Footer"
import CssBaseline from '@mui/material/CssBaseline';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import { Link } from 'react-router-dom';
import { Grid, Container, Typography, Button, Box } from '@mui/material';
import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';

const mentors = [
  {
      id: 1,
      name: 'Anas Hafiza',
      profession: 'Software Engineer at Google',
      image: '/avatar-image@2x.png',
  },
  {
      id: 2,
      name: 'Jolene Orr',
      profession: 'Project Manager at Facebook',
      image: '/avatar-image1@2x.png',
  },
  {
      id: 3,
      name: 'Henry Ford',
      profession: 'Acquisitions at BlackRock',
      image: '/avatar-image2@2x.png',
  },
];


const mainTheme = createTheme({
  palette: {
      background: {
        default: '#f5faff',
      },
    },
    typography: {
      header_font: {
        fontSize: '3rem',
        fontWeight: 100,
        color: '#016eea'
      },
      header_sub_font: {
          fontSize: '1.2rem',
          fontWeight: 100
      },
      body_header_font: {
        fontSize: '2rem',
        fontWeight: 100
      },
    },
});


const Landing = () => {
  const isMobile = useMediaQuery(useTheme().breakpoints.down('md'));

  return (
    <>
      <NavBar />
      <ThemeProvider theme={mainTheme}>
        <CssBaseline />
        <Box 
          sx={{
            width: '100%',
            height: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            //bgcolor: '#f5faff', // Set your desired background color
            px: isMobile ? '10px': '175px'
          }}
          >
          <Container
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Container
              sx={{
                textAlign: 'left',
                // bgcolor: '#d7e8f0',
              }}
            >
              <Typography variant="header_font">Accessible and Tailored Mentorship Experience</Typography><br /><br />
              <Typography variant="header_sub_font" sx={{marginBottom: 4}}>Find mentors to develop your skills and connect with like minded individuals.</Typography><br /><br />
              <Button key={"Login"} sx={{ backgroundColor: '#e6f1ff', color: '#016eea', textTransform: 'none', mr: 2 }} component={Link}  to="/signin">
                <Typography textAlign="center">{"Login"}</Typography>
              </Button>
              <Button key={"Create Account"} variant="contained" sx={{ backgroundColor: '#016eea', color: '#fff', textTransform: 'none' }} component={Link}  to="/Signup">
                <Typography textAlign="center">{"Create Account"}</Typography>
              </Button>
            </Container>
          </Container>
          <img
              className={css`
            position: relative;
            width: 45%;
            overflow: hidden;
            flex-shrink: 0;
            padding-top: 50px;
          `}
              alt=""
              src="/mentoring-illustration.svg"
          />
        </Box>    

        {/* Rest of the page content */}
        <Container  sx={{textAlign: 'center', my: '25px'}}>
          <Typography variant="header_font">Features</Typography>
        </Container>
          <Container
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Container 
              sx={{
                width: '50%',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <img
                  className={css`
                position: relative;
                width: 70%;
                overflow: hidden;
                flex-shrink: 0;
              `}
                  alt=""
                  src="/connect.svg"
              />
            </Container>
            
            <Container sx={{width: '50%'}}>
              <Typography variant="body_header_font">Meet and connect with industry professionals</Typography><br />
              <Typography variant="header_sub_font">Have a one-on-one meetings with leading professionals from wide range of industries.</Typography>
            </Container>
          </Container>

          <Container
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Container sx={{width: '50%'}}>
              <Typography variant="body_header_font">Join discussion groups</Typography><br />
              <Typography variant="header_sub_font">Share and participate within your community to learn about the latest trends in your industry.</Typography>
            </Container>

            <Container 
              sx={{
                width: '50%',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <img
                    className={css`
                    position: relative;
                    width: 100%;
                    overflow: hidden;
                    flex-shrink: 0;
                `}
                    alt=""
                    src="/groups.svg"
              />
            </Container>
          </Container>

          <Container
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Container 
              sx={{
                width: '50%',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <img
                  className={css`
                  position: relative;
                  width: 75%;
                  overflow: hidden;
                  flex-shrink: 0;
              `}
                  alt=""
                  src="/success-social-media---achievement-woman-trophy-award-reward-win-competition.svg"
              />
            </Container>
            <Container sx={{width: '50%'}}>
            <Typography variant="body_header_font">Attend mentor session and participate in discussions to gain achievements</Typography><br />
              <Typography variant="header_sub_font">Participating in discussions and attending sessions will gain you certificates and badges on your profile.</Typography>
            </Container>
          </Container>

        <Container  sx={{textAlign: 'center', mt: '100px', mb: '10px'}}>
          <Typography variant="header_font">Top Mentors</Typography><br />
          <Typography variant="header_sub_font">Meet our top mentors, who are experts in their respective fields and are trusted to guide you on your professional journey.</Typography>
        </Container>

        <Stack direction="row" spacing={5} 
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '100px',
          }}>
          {mentors.map((mentor) => (
              <Card key={mentor.id} style={{ width: 300, margin: 20 }}>
                  <CardMedia
                      component="img"
                      alt={mentor.name}
                      height="280"
                      image={mentor.image}
                  />
                  <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                          {mentor.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                          {mentor.profession}
                      </Typography>
                      <Stack spacing={2} direction="column" mt={2}>
                          
                      </Stack>
                  </CardContent>
              </Card>
          ))}
      </Stack>
      <Footer/>
      </ThemeProvider>
    </>
  );
};

export default Landing;
