import * as React from 'react';
import { useState, useEffect } from 'react';
import { useAuth } from '../AuthContext';
import {auth, db} from '../../backend/Firebase'
import { doc, getDoc } from "firebase/firestore";
import NavigationBar from "../components/NavigationBar";
import NavBar from "../components/NavBarProfileMentor";
import NavBarMentor from "../components/NavBarProfileMentor";
import NavBarMentee from "../components/NavBarProfileMentee";
import { Box, Button, Divider, IconButton, Tooltip, Typography, Container } from "@mui/material";
import CssBaseline from '@mui/material/CssBaseline';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import { Link, useParams, useNavigate } from 'react-router-dom';
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
    // id parameter in url
    const {id} = useParams();

    const {currentUser} = useAuth(); // null if user is not logged in
    const navigate = useNavigate(); // used to redirect to landing page if user is not logged in
    const [userType, setUserType] = useState(); // is the user a Mentor or Mentee? used for displaying the correct navbar
    const [profileData, setProfileData] = useState(); // the data to display in profile page
    const [progress, setProgress] = useState(0); // tutorial progress

    // const handleProgress = () => {
    //     setProgress((prevProgress) => (prevProgress >= 100 ? 0 : prevProgress + 10));
    // };

    // fetch type of user
    useEffect(() => {
        if (!currentUser) {
            // Redirect to the landing page if no one is logged in
            navigate('/');
            return;
        }
        async function fetchUserData() {
            const docRef = doc(db, "users", currentUser.uid);
            const docSnap = await getDoc(docRef);
            
            if (docSnap.exists()) {
                setUserType(docSnap.data().user_type);
            } else {
                // docSnap.data() will be undefined in this case
                console.log("No such document!");
            }
        }
        fetchUserData()
    }, []);

    // fetch profile page data
    useEffect(() => {
        async function fetchProfileData() {
            let userId = id; // Use id from the URL parameter by default

            // If id is undefined (no parameter passed), use currentUser.uid
            if (!id) {
                userId = currentUser.uid;
            }

            //console.log("Current User: " + currentUser.uid);
            //console.log("URL Parameter User ID: " + id);
            const docRef = doc(db, "users", userId);
            const docSnap = await getDoc(docRef);
            
            if (docSnap.exists()) {
                //console.log("Document data:", docSnap.data());
                setProfileData(docSnap.data());
                //console.log(userData);
            } else {
                // docSnap.data() will be undefined in this case
                console.log("No such document!");
            }
        }
        fetchProfileData()
    }, []);

    // set up tutorial tasks TODO: MOVE THIS TO DATABASE
    const [tasks, setTasks] = useState([
        // { id: 1, text: 'Create Account', completed: true },
        { id: 1, text: 'Verify Email', completed: true },
        { id: 2, text: 'Add Occupation and Place of Work to Your Profile', completed: false },
        { id: 3, text: 'Add a Bio', completed: false },
        { id: 4, text: 'Bind Social Accounts/Read the <MentorWiki> guide for Mentors', completed: false },
        { id: 5, text: 'Reach Out to a Mentor/Create Your First Event', completed: false },
    ]);

    // change task to complete/incomplete
    const handleToggle = (taskID) => {
        setTasks((prevTasks) =>
          prevTasks.map((task) =>
            task.id === taskID ? { ...task, completed: !task.completed } : task
          )
        );
    };

    // animate tutorial circular progress bar to show percentage of tasks completed
    React.useEffect(() => {
        const intervalId = setInterval(() => {
          const completedCount = tasks.reduce((count, task) => {
            return count + (task.completed ? 1 : 0);
          }, 0);
          const newProgress = completedCount * 20;
          setProgress(newProgress);
        }, 1000);
        return () => clearInterval(intervalId);
    }, [tasks]);
    
    // determines whether the screensize is phone or not
    const isMobile = useMediaQuery(useTheme().breakpoints.down('md'));

    // open tab with social link
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

    // replace with blank (loading) screen until userData is set
    if (!profileData || !userType) {
        // Render a loading state
        return (
            <>
            <ThemeProvider theme={mainTheme}>
                <Box 
                    sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minHeight: '100vh',
                    px: isMobile ? '10px' : '175px',
                    }}
                >
                    <CssBaseline />
                    <CircularProgress />
                </Box>
            </ThemeProvider>
            </>
        );
    }

    // set the appriopriate profile type
    let profileType;
    let userId = id; // Use id from the URL parameter by default
    // If id is undefined (no parameter passed), use currentUser.uid
    if (!id) {
        userId = currentUser.uid;
    }
    if (profileData.user_type === 'Mentor' && userId === currentUser.uid) { // Mentor My Profile
        profileType = 1;
    } else if (profileData.user_type === 'Mentee' && userId === currentUser.uid) { // Mentee My Profile
        profileType = 2;
    } else if (profileData.user_type === 'Mentor' && userId !== currentUser.uid) { // Mentor Other User's Profile
        profileType = 3;
    } else if (profileData.user_type === 'Mentee' && userId !== currentUser.uid) { // Mentee Other User's Profile
        profileType = 4;
    }

    console.log(profileType);

    return (
        <>
        {/* If user is a mentor, display mentor navbar, if not, display mentee navbar */}
        {userType === 'Mentor' ? (
            <NavBarMentor />
        ) : (
            <NavBarMentee />
        )}
        <ThemeProvider theme={mainTheme}>
        <Box sx={{display: 'flex', mt: '100px', mb: '100px', px: isMobile ? '10px': '175px'}}>
            <CssBaseline />
            {/* SIDEBAR BOX */}
            <Box sx={{width: isMobile ? '0': '30%', pr:'20px', '& > *:not(:last-child)': { marginBottom: 2 } }}>
                
                {/* Profile Picture */}
                {/* TODO: profile pic from firestore (low priority) */}
                <Avatar sx={{width: '120px', height: '120px'}}/>
                
                {/* Name, Badges, and follow button */}
                <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
                    <Typography style={{ display: 'flex', alignItems: 'center'}}  variant= "name_font">
                        {profileData.firstName}{" "}{profileData.lastName}

                        {/* if profile type is Mentor, produce the badges */}
                        {profileType === 1 || profileType === 3 ? (
                            <>
                            <Tooltip title="Mentor">
                                <SchoolIcon sx={{color: '#016eea', mx: '5px'}} />
                            </Tooltip>
                            <Tooltip title="Verified">
                                <VerifiedIcon sx={{ color: '#016eea'}} />
                            </Tooltip>
                            </>
                        ) : (
                            <>
                            </>
                        )}
                    </Typography>

                    <Box>
                        {/* TODO: Follow/Unfollow user button */}
                        {profileType === 3 || profileType === 4 ? (
                            <>
                            <Button key={"followButton"} variant="contained" sx={{ backgroundColor: '#016eea', color: '#fff', textTransform: 'none' }}>
                            <Typography textAlign="center">{"Follow"}</Typography>
                            </Button>
                            {/* <Button key={"unFollowButton"} variant="contained" sx={{ backgroundColor: '#016eea', color: '#fff', textTransform: 'none' }}> */}
                            {/* <Typography textAlign="center">{"Unfollow"}</Typography> */}
                            {/* </Button> */}
                            </>
                        ) : (
                            <>
                            </>
                        )}
                    </Box>
                </Box>



                {/* Occupation */}
                {/* TODO */}
                <Typography>
                    PLACEHOLDER Student at the University of Saskatchewan
                    <br />
                    PLACEHOLDER Bsc. Computer Science
                </Typography>

                {/* Bio */}
                {/* TODO */}
                <Typography>
                    PLACEHOLDER BIO: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Interdum velit euismod in pellentesque massa placerat duis.
                </Typography>

                <Divider />

                {/* Social Counts */}
                {/* TODO */}
                <Typography>
                    2 Followers
                </Typography>
                <Typography>
                    1 Following
                </Typography>

                {/* Repuation Indicator */}
                {/* TODO */}
                <Typography>
                    130 Reputation
                    <Tooltip title="Reputation is calculated by ...">
                        <QuestionMarkIcon sx={{ fontSize: 16, color: '#016eea'}}/>
                    </Tooltip>
                </Typography>

                <Divider />
                
                {/* Social Icons/Buttons */}
                {/* TODO */}
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
                
                <Divider />
                
                {/* Languages Spoken */}
                {/* TODO */}
                <Typography>
                    {"English"}
                    <br />
                    {"Farsi (Persian)"}
                </Typography>

                {/* Edit Profile Button (only show if profileType is 1 or 2 corresponding to My Profile) */}
                {profileType === 1 || profileType === 2 ? (
                    <>
                    <Divider />
                    {/* TODO: implement edit profile page/popup */}
                    <Button key={"Edit"} variant="contained" sx={{ backgroundColor: '#016eea', color: '#fff', textTransform: 'none' }}>
                        <Typography textAlign="center">{"Edit Profile"}</Typography>
                    </Button>
                    </>
                ) : (
                    <></>
                )}
            </Box>


            {/* MAIN CONTENT BOX */}
            <Box sx={{pl: '20px', flexGrow: 1, '& > *:not(:last-child)': { marginBottom: 2 }}}>
                {/* Profile Heading depends on wether user is viewing their own profile or not */}
                {profileType === 1 || profileType === 2 ? (
                    <>
                    <Typography variant="bold_font">{"My Profile"}</Typography><Typography></Typography>
                    
                    {/* Tutorial Container (only if profile type is 1 or 2: My Profile) */}
                    <Container sx={{display:"flex", alignItems:"center"}}>
                        {/* Circular Progress Bar Box */}
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
                        {/* Tutorial List Items */}
                        {/* TODO get from database */}
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
                    
                    <Typography>{"TODO: REPLACE TUTORIAL WITH BADGE AFTER TUTORIAL IS COMPLETED:"}</Typography>
                    <Typography>{"- Mentee only: show number of events attended (public)"}</Typography>
                    <Typography>{"- Mentor only: show number of sessions theyve given + num mentees alongside badge after tutorial (public)"}</Typography>

                    
                    </>
                ) : (
                    <>
                    <Typography variant="bold_font">{profileData.firstName}{"'s Profile"}</Typography><Typography></Typography>
                    <Typography>{"PLACEHOLDER: BADGE AND STATS"}</Typography>
                    </>
                )}
                
                <Divider  sx={{ width: '100%'}}/>
                
                {/* My Mentees (Mentor's My Profile Page Only) */}
                {profileType === 1 ? (
                    <> 
                    <Typography variant="bold_font">{"My Mentees"}</Typography><Typography></Typography>
                    {/* TODO: horizontal scrolling list of icons and first names of mentees, clicking leads to their profile*/}
                    <Typography>{"PLACEHOLDER: horizontal scrolling list of icons and first names of mentees, clicking leads to their profile"}</Typography>
                    <Divider  sx={{ width: '100%'}}/>
                    </>
                ) : (
                    <>
                    </>
                )}

                {/* My Mentors (Mentee's My Profile Page Only) */}
                {profileType === 2 ? (
                    <>
                        <Typography variant="bold_font">{"My Mentors"}</Typography><Typography></Typography>
                        {/* TODO: horizontal scrolling list of icons and first names of mentors, clicking leads to their profile*/}
                        <Typography>{"PLACEHOLDER: horizontal scrolling list of icons and first names of mentors, clicking leads to their profile"}</Typography>
                    <Divider  sx={{ width: '100%'}}/>
                    </>
                ) : (
                    <>
                    </>
                )}


                {/* Events Section */}
                {profileType === 1 || profileType === 2 ? (
                    <>
                    <Box sx={{display: 'flex', justifyContent:'space-between'}}>  
                        <Typography variant="bold_font">{"My Events"}</Typography>
                        {/* TODO: Past and Present events */}
                        <FormControlLabel
                            value="start"
                            control={<Switch color="primary" />}
                            label="Past Events"
                            labelPlacement="start"
                        />
                    </Box>
                    <Typography></Typography>
                    {/* TODO: Show Events */}
                    <Typography>{"PLACEHOLDER: EVENTS HORIZONTAL SCROLLER"}</Typography>
                    </>
                ) : (
                    <>
                    <Box sx={{display: 'flex', justifyContent:'space-between'}}>  
                        <Typography variant="bold_font">{"Events"}</Typography>
                        {/* TODO: Past and Present events */}
                        <FormControlLabel
                            value="start"
                            control={<Switch color="primary" />}
                            label="Past Events"
                            labelPlacement="start"
                        />
                    </Box>
                    <Typography></Typography>
                    {/* TODO: Show Events */}
                    <Typography>{"PLACEHOLDER: EVENTS HORIZONTAL SCROLLER"}</Typography>
                    </>
                )}

                <Divider  sx={{ width: '100%'}}/>

                {/* Posts Section */}
                {profileType === 1 || profileType === 2 ? (
                    <>
                    <Typography variant="bold_font">{"My Posts"}</Typography><Typography></Typography>
                    {/* TODO: Show Posts */}
                    <Typography>{"PLACEHOLDER: POSTS"}</Typography>
                    </>
                ) : (
                    <>
                    <Typography variant="bold_font">{"Posts"}</Typography><Typography></Typography>
                    {/* TODO: Show Posts */}
                    <Typography>{"PLACEHOLDER: POSTS"}</Typography>
                    </>
                )}
            </Box>
        </Box>
        <Footer />
        </ThemeProvider>
        </>
    );
}

export default ProfilePage;