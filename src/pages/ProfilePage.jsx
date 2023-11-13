import NavigationBar from "../components/NavigationBar"
import NavBar from "../components/NavBar"
import NavBarLanding from "../components/NavBarLanding"
import { Box, Button, Divider, Typography } from "@mui/material";
import CssBaseline from '@mui/material/CssBaseline';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import { Link } from 'react-router-dom';

const mainTheme = createTheme({
    palette: {
        background: {
          default: '#f5faff',
        },
      },
  });


function ProfilePage() {
    const isMobile = useMediaQuery(useTheme().breakpoints.down('md'));

    return (
        <>
        <NavBar />
        {/* <NavigationBar /> */}
        {/* <NavBarLanding /> */}
        <ThemeProvider theme={mainTheme}>
        <Box sx={{display: 'flex', mt: '100px', px: isMobile ? '10px': '175px'}}>
            <CssBaseline />
            <Box sx={{width: isMobile ? '0': '25%', pr:'10px'}}>
                <Avatar sx={{width: '120px', height: '120px'}}/>
                <Typography>
                    Sina Khademolhosseini VERIFIED + MENTOR ICONS
                </Typography>
                <Typography>
                    Sturdent at the University of Saskatchewan
                </Typography>
                <Typography>
                    Bsc. Computer Science
                </Typography>
                <Typography>
                    BIO: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Interdum velit euismod in pellentesque massa placerat duis.
                </Typography>
                <Divider />
                <Typography>
                    2 Followers
                </Typography>
                <Typography>
                    130 Reputation
                </Typography>
                <Divider />
                <Button>LinkedIn Icon</Button>
                <Button>Twitter Icon</Button>
                <Button>GitHub Icon</Button>
                <Divider />
                <Button key={"Edit"} variant="contained" sx={{ backgroundColor: '#016eea', color: '#fff', textTransform: 'none' }}>
                    <Typography textAlign="center">{"Edit Profile"}</Typography>
                </Button>
            </Box>
            <Box sx={{flexGrow: 1}}>
                {/* TODO: create a component with grid with cards for each necessary profile page component:  */}
                {/* - My Events (sort by upcoming events) - private */}
                {/* - My Posts (sort by latest) - public */}
                {/* - My Groups (sort by name/most members) - public */}
                <Typography>{"My Profile"}</Typography>
                <Typography>{"TODO: NEW USER TUTORIAL (REPLACE WITH BADGE AFTER TUTORIAL IS DONE)"}</Typography>
                <Divider  sx={{ width: '100%'}}/>
            </Box>
        </Box>
        </ThemeProvider>
        </>
    );
}

export default ProfilePage;