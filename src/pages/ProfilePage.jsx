import * as React from 'react';
import { useState, useEffect } from 'react';
import NavigationBar from "../components/NavigationBar"
import NavBar from "../components/NavBarProfileMentor"
import NavBarLanding from "../components/NavBarLanding"
import { Box, Button, Divider, IconButton, Tooltip, Typography, Container } from "@mui/material";
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
import CircularProgress from '@mui/material/CircularProgress';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/icons-material/CheckCircle';
import Footer from "../components/Footer"
import Switch from '@mui/material/Switch';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { useAuth } from '../AuthContext';
import {auth, db} from '../../backend/Firebase'
import { doc, getDoc } from "firebase/firestore";

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
    const {currentUser} = useAuth();
    const {userData, setUserData} = useState();
    
    useEffect(() => {
        async function fetchUserData() {
            const docRef = doc(db, "users", currentUser.uid);
            const docSnap = await getDoc(docRef);
            
            if (docSnap.exists()) {
              console.log("Document data:", docSnap.data());
              setUserData(docSnap)
            } else {
              // docSnap.data() will be undefined in this case
              console.log("No such document!");
            }

            
        }
    
        fetchUserData()
      }, [])
    

    const [progress, setProgress] = React.useState(0);

    const handleProgress = () => {
        setProgress((prevProgress) => (prevProgress >= 100 ? 0 : prevProgress + 10));
    };

    const [tasks, setTasks] = useState([
        { id: 1, text: 'Create Account', completed: true },
        { id: 2, text: 'Verify Email', completed: true },
        { id: 3, text: 'Add Occupation and Place of Work to Your Profile', completed: false },
        { id: 4, text: 'Add a Bio', completed: false },
        { id: 5, text: 'Bind Social Accounts/Read the <MentorWiki> guide for Mentors', completed: false },
        { id: 6, text: 'Reach Out to a Mentor/Create Your First Event', completed: false },
    ]);

    const handleToggle = (id) => {
        setTasks((prevTasks) =>
          prevTasks.map((task) =>
            task.id === id ? { ...task, completed: !task.completed } : task
          )
        );
    };
    
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
        <Box sx={{display: 'flex', mt: '100px', mb: '100px', px: isMobile ? '10px': '175px'}}>
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
                    1 Following
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
                <Typography variant="bold_font">{"My Profile"}</Typography><Typography></Typography>
                <Container
                    sx={{display:"flex", alignItems:"center"}}
                    
                >
                    <Box sx={{ position: 'relative', display: 'inline-flex' }}>
                        <CircularProgress variant="determinate" sx={{color:'#016eea' }} value={progress} size={150} />
                        <Box
                            sx={{
                            top: 0,
                            left: 0,
                            bottom: 0,
                            right: 0,
                            position: 'absolute',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            }}
                        >
                            <Box
                                sx={{
                                    top: 0,
                                    left: 0,
                                    bottom: 0,
                                    right: 0,
                                    position: 'absolute',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            >
                                <Typography  color='#016eea' sx={{textAlign:'center'}} fontWeight="bold" fontSize='34px'>
                                    {`${Math.round(progress)}%`}
                                </Typography>
                                <Typography color="text.primary" sx={{textAlign:'center'}}>
                                    {`complete`}
                                </Typography>
                                {/* <button onClick={handleProgress}>Update Progress</button> */}
                            </Box>
                        </Box>
                    </Box>
                    <List sx={{ml:'30px'}}>
                        {tasks.map((task) => (
                        <ListItem key={task.id} disablePadding>
                            <ListItemIcon sx={{minWidth: '2em'}}>
                                <Checkbox
                                    edge="start"
                                    checked={task.completed}
                                    tabIndex={-1}
                                    onChange={() => handleToggle(task.id)}
                                    sx={{py: '2px'}}
                                    color={task.completed ? 'primary' : 'gray'}
                                />
                            </ListItemIcon>
                            <ListItemText primary={task.text} />
                        </ListItem>
                        ))}
                    </List>
                </Container>

                {/* TODO: create a component with grid with cards for each necessary profile page component:  */}
                {/* - My Events (sort by upcoming events) - private */}
                {/* - My Posts (sort by latest) - public */}
                {/* - My Groups (sort by name/most members) - public */}
                
                <Typography>{"TODO: REPLACE TUTORIAL WITH BADGE AFTER TUTORIAL IS COMPLETED"}</Typography>
                <Typography>{"TODO: Mentee only: show number of events attended"}</Typography>
                <Typography>{"TODO: Mentor only: show number of sessions theyve given + num mentees alongside badge after tutorial"}</Typography>


                <Divider  sx={{ width: '100%'}}/>
                
                <Box sx={{display: 'flex', justifyContent:'space-between'}}>
                    <Typography variant="bold_font">{"My Events"}</Typography>
                    <FormControlLabel
                        value="start"
                        control={<Switch color="primary" />}
                        label="Past Events"
                        labelPlacement="start"
                    />
                </Box>
                
                <Typography></Typography>
                <Typography>{"private - toggle for past/present events (card component)"}</Typography>
                <Divider  sx={{ width: '100%'}}/>

                <Typography variant="bold_font">{"My Posts"}</Typography><Typography></Typography>
                <Typography>{"public - (card component?)"}</Typography>
                <Divider  sx={{ width: '100%'}}/>
                {/* <Typography variant="bold_font">{"My Groups"}</Typography><Typography></Typography> */}
                {/* <Typography>{"(card component?)"}</Typography> */}
                {/* <Divider  sx={{ width: '100%'}}/> */}

                <Typography>{"TODO: Public + private page"}</Typography>
                <Typography>{"TODO: mentor and mentee page differences"}</Typography>
            </Box>
        </Box>
        <Footer />
        </ThemeProvider>
        </>
    );
}

export default ProfilePage;