import NavigationBar from "../components/NavigationBar"
import NavBar from "../components/NavBarProfileMentor"
import NavBarLanding from "../components/NavBarLanding"
import { Box, Button, Divider, IconButton, Tooltip, Typography } from "@mui/material";
import CssBaseline from '@mui/material/CssBaseline';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import { Link } from 'react-router-dom';
import VerifiedIcon from '@mui/icons-material/Verified'; // only for mentor
import SchoolIcon from '@mui/icons-material/School'; // only for mentor
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import TwitterIcon from '@mui/icons-material/Twitter';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';

const mainTheme = createTheme({
    palette: {
        background: {
          default: '#f5faff',
        },
      },
      typography: {
        name_font: {
          fontSize: '1.25rem',
          fontWeight: 700,
        },
        bold_font: {
            //fontSize: '1.1rem',
            fontWeight: 700,
          },
      },
  });


function ProfilePage() {
    const isMobile = useMediaQuery(useTheme().breakpoints.down('md'));

    const handleSocialsButtonClick = (website, username) => { 
        // Open the link
        let url;

        switch (website) {
          case 'linkedin':
            url = 'https://www.linkedin.com/in/' + username;
            break;
          case 'github':
            url = 'https://github.com/' + username;
            break;
          case 'twitter':
            url = 'https://twitter.com/' + username;
            break;
        }
        window.open(url, '_blank');
    };

    return (
        <>
        <NavBar />
        {/* <NavigationBar /> */}
        {/* <NavBarLanding /> */}
        <ThemeProvider theme={mainTheme}>
        <Box sx={{display: 'flex', mt: '100px', px: isMobile ? '10px': '175px'}}>
            <CssBaseline />
            <Box sx={{width: isMobile ? '0': '30%', pr:'20px', '& > *:not(:last-child)': { marginBottom: 2 } }}>
            {/* , '& > *:not(:last-child)': { marginBottom: 3 } */}
                <Avatar sx={{width: '120px', height: '120px'}}/>
                <Typography style={{ display: 'flex', alignItems: 'center'}}  variant= "name_font">
                    Sina Khademolhosseini
                    <Tooltip title="Mentor">
                        <SchoolIcon sx={{color: '#016eea', mx: '5px'}} />
                    </Tooltip>
                    <Tooltip title="Verified">
                        <VerifiedIcon sx={{ color: '#016eea'}} />
                    </Tooltip>
                </Typography>
                <Typography>
                    Student at the University of Saskatchewan
                    <br />
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
                    <Tooltip title="Reputation is calculated by ...">
                        <QuestionMarkIcon sx={{ fontSize: 16, color: '#016eea'}}/>
                    </Tooltip>
                </Typography>
                <Divider />
                <Tooltip title="LinkedIn: sina-kh">
                    <IconButton onClick={() => handleSocialsButtonClick('linkedin', 'sina-kh')}>
                        <LinkedInIcon sx={{color: '#016eea'}} />
                    </IconButton>
                </Tooltip>
                <Tooltip title="GitHub: sina-kh">
                    <IconButton onClick={() => handleSocialsButtonClick('github', 'sina-kh')}>
                        <GitHubIcon sx={{color: '#016eea'}} />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Twitter (X): sina-kh">
                    <IconButton onClick={() => handleSocialsButtonClick('twitter', 'sina-kh')}>
                        <TwitterIcon sx={{color: '#016eea'}} />
                    </IconButton>
                </Tooltip>
                {/* <Button>LinkedIn Icon</Button> */}
                {/* <Button>Twitter Icon</Button> */}
                {/* <Button>GitHub Icon</Button> */}
                <Divider />
                <Typography>
                    {"English"}
                    <br />
                    {"Farsi (Persian)"}
                </Typography>
                <Divider />
                <Button key={"Edit"} variant="contained" sx={{ backgroundColor: '#016eea', color: '#fff', textTransform: 'none' }}>
                    <Typography textAlign="center">{"Edit Profile"}</Typography>
                </Button>
            </Box>
            <Box sx={{pl: '20px', flexGrow: 1, '& > *:not(:last-child)': { marginBottom: 2 }}}>
                {/* TODO: create a component with grid with cards for each necessary profile page component:  */}
                {/* - My Events (sort by upcoming events) - private */}
                {/* - My Posts (sort by latest) - public */}
                {/* - My Groups (sort by name/most members) - public */}
                <Typography variant="bold_font">{"My Profile"}</Typography><Typography></Typography>
                <Typography>{"TODO: NEW USER TUTORIAL (REPLACE WITH BADGE AFTER TUTORIAL IS DONE)"}</Typography>
                <Typography>{"TODO: Mentor only: show number of sessions theyve given + num mentees alongside badge after tutorial"}</Typography>

                <Divider  sx={{ width: '100%'}}/>
                <Typography variant="bold_font">{"Events"}</Typography><Typography></Typography>
                <Typography>{"(card component)"}</Typography>
                <Divider  sx={{ width: '100%'}}/>
                <Typography variant="bold_font">{"My Posts"}</Typography><Typography></Typography>
                <Typography>{"(card component?)"}</Typography>
                <Divider  sx={{ width: '100%'}}/>
                <Typography variant="bold_font">{"My Groups"}</Typography><Typography></Typography>
                <Typography>{"(card component?)"}</Typography>
                <Divider  sx={{ width: '100%'}}/>

                <Typography>{"TODO: Public + private page"}</Typography>
                <Typography>{"TODO: mentor and mentee page differences"}</Typography>
                <Typography>{"TODO: UNIVERSAL FOOTER COMPONENT"}</Typography>
            </Box>
        </Box>
        </ThemeProvider>
        </>
    );
}

export default ProfilePage;