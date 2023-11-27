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
import TextField from '@mui/material/TextField';
import AddIcon from '@mui/icons-material/Add';
import { styled } from '@mui/system';


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


function AccountSettings() {
    const {currentUser} = useAuth(); // null if user is not logged in
    let {id} = currentUser.uid;
    const navigate = useNavigate(); // used to redirect to landing page if user is not logged in
    const [userType, setUserType] = useState(); // is the user a Mentor or Mentee? used for displaying the correct navbar
    const [profileData, setProfileData] = useState(); // the data to display in profile page
    const [newPassword, setNewPassword] = useState('');
    const [languages, setLanguages] = useState(['']); // Initial state with an empty string

    const handleAddLanguage = () => {
      setLanguages([...languages, '']);
    };

    const handleRemoveLanguage = (index) => {
        const updatedLanguages = [...languages];
        updatedLanguages.splice(index, 1);
        setLanguages(updatedLanguages);
      };
    
      const handleChangeLanguage = (index, value) => {
        const updatedLanguages = [...languages];
        updatedLanguages[index] = value;
        setLanguages(updatedLanguages);
      };

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

    const handlePasswordChange = () => {
        // Handle password change, e.g., update the user's password in your authentication system
        console.log('New Password:', newPassword);
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
            <Box sx={{flexGrow: 1, '& > *:not(:last-child)': { marginBottom: 2 }}}>
                <Typography variant="bold_font">{"My Profile"}</Typography><Typography></Typography>
                <Box sx={{'& > *:not(:last-child)': { marginBottom: 2 } }}>
                    {/* Profile Picture */}
                    {/* TODO: profile pic from firestore (low priority) */}
                    <Avatar alt='Profile Picture' src='https://firebasestorage.googleapis.com/v0/b/mentorme-ef368.appspot.com/o/ProfilePictures%2Fzucc.webp?alt=media&token=c7d24eb7-eae5-414b-966d-04457a3212b9' sx={{width: '120px', height: '120px'}}/>
                    
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
                                {profileData.verified === true ? (
                                    <Tooltip title="Verified">
                                        <VerifiedIcon sx={{ color: '#016eea'}} />
                                    </Tooltip>
                                ) : (<></>)}
                                </>
                            ) : (<></>)}
                        </Typography>
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
                    <Typography sx={{width: isMobile ? '100%': '40%'}}>
                        PLACEHOLDER BIO: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Interdum velit euismod in pellentesque massa placerat duis.
                    </Typography>

                    <Divider sx={{ width: '50%'}}/>

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
                        {/* TODO add tooltip title */}
                        <Tooltip title="Reputation is calculated by ...">
                            <QuestionMarkIcon sx={{ fontSize: 16, color: '#016eea'}}/>
                        </Tooltip>
                    </Typography>

                    <Divider sx={{ width: '50%'}}/>
                    
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
                    
                    <Divider sx={{ width: '50%'}}/>
                    
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
                        {/* <Divider sx={{ width: '50%'}}/> */}
                        {/* TODO: implement edit profile page/popup */}
                        <Button key={"EditProfile"} variant="contained" sx={{ backgroundColor: '#016eea', color: '#fff', textTransform: 'none', mb:'10px'}}>
                            <Typography textAlign="center">{"Edit Profile"}</Typography>
                        </Button>
                        </>
                    ) : (
                        <></>
                    )}
                </Box>



                <Divider  sx={{ width: '100%'}}/>

                <Typography variant="bold_font">{"Email"}</Typography><Typography></Typography>
                <Typography>{"Change Your Email Address"}</Typography>
                <Box sx={{display: 'flex', flexDirection: 'column'}}>
                    <TextField  sx={{marginBottom: 1, width: isMobile ? '100%': '400px', height: '50px'}}
                        label="Current Email Address"
                        value={profileData.email}
                        variant="outlined"
                        size='small'
                        disabled
                    />
                    <TextField  sx={{marginBottom: 1, width: isMobile ? '100%': '400px', height: '50px'}}
                        label="New Email Address"
                        variant="outlined"
                        size='small'
                        required
                    />
                    <TextField  sx={{marginBottom: 1, width: isMobile ? '100%': '400px', height: '50px'}}
                        label="Confirm Email Address"
                        variant="outlined"
                        size='small'
                        required
                    />
                    <Button
                        variant="contained"
                        sx={{ marginTop: 0, width: isMobile ? '100%': '400px', backgroundColor: '#016eea', color: '#fff', textTransform: 'none'}}
                    >
                        Change Email
                    </Button>
                </Box>

                <Divider  sx={{ width: '100%'}}/>

                <Typography variant="bold_font">{"Password"}</Typography><Typography></Typography>
                <Typography>{"Change Your Password"}</Typography>
                <Box sx={{display: 'flex', flexDirection: 'column'}}>
                    <TextField  sx={{marginBottom: 1, width: isMobile ? '100%': '400px', height: '50px'}}
                        label="Current Password"
                        variant="outlined"
                        size='small'
                        required
                    />
                    <TextField  sx={{marginBottom: 1, width: isMobile ? '100%': '400px', height: '50px'}}
                        label="New Password"
                        variant="outlined"
                        size='small'
                        required
                    />
                    <TextField  sx={{marginBottom: 1, width: isMobile ? '100%': '400px', height: '50px'}}
                        label="Confirm Password"
                        variant="outlined"
                        size='small'
                        required
                    />
                    <Button
                        variant="contained"
                        sx={{ marginTop: 0, width: isMobile ? '100%': '400px', backgroundColor: '#016eea', color: '#fff', textTransform: 'none'}}
                    >
                        Change Password
                    </Button>
                </Box>

                <Divider  sx={{ width: '100%'}}/>

                <Typography variant="bold_font">{"Enable Multifactor Authentication (MFA)"}</Typography><Typography></Typography>
                <Typography>{"Keep your account extra secure with a second login step."}</Typography>
                <Button key={"EnableMFA"} variant="contained" sx={{ backgroundColor: '#016eea', color: '#fff', textTransform: 'none' }}>
                    <Typography textAlign="center">{"Enable MFA"}</Typography>
                </Button>

                <Divider  sx={{ width: '100%'}}/>

                <Typography variant="bold_font">{"Delete My Account"}</Typography><Typography></Typography>
                <Typography>{"If you want to permanently delete your MentorMe account, please use the button below. Once the deletion process has begun, you cannot reactivate or retrieve any content or information that you have provided."}</Typography>
                <Button key={"DeleteAccount"} variant="outlined" color="error" sx={{ textTransform: 'none' }}>
                    <Typography textAlign="center">{"Delete My Account"}</Typography>
                </Button>
            </Box>
        </Box>
        <Footer />
        </ThemeProvider>
        </>



    );
};

export default AccountSettings;