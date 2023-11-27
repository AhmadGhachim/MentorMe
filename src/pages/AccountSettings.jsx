import * as React from 'react';
import { useState, useEffect } from 'react';
import { useAuth } from '../AuthContext';
import {auth, db} from '../../backend/Firebase'
import { doc, updateDoc, arrayUnion, arrayRemove, getDoc, getDocs, collection } from "firebase/firestore";
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
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import InputAdornment from '@mui/material/InputAdornment';


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


    // stuff for edit profile popup
    // State for edit profile form values
    const [editFormData, setEditFormData] = useState({
        firstName: '',
        lastName: '',
        occupation: '',
        occupationPlace: '',
        occupationField: '',
        bio: '',
        socialsLinkedin: '',
        socialsTwitter: '',
        socialsGithub: '',
        languages: [],
    });

    const [tempEditFormData, setTempEditFormData] = useState({
        firstName: '',
        lastName: '',
        occupation: '',
        occupationPlace: '',
        occupationField: '',
        bio: '',
        socialsLinkedin: '',
        socialsTwitter: '',
        socialsGithub: '',
        languages: [],
    });

    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setTempEditFormData(editFormData);
        setOpen(true);
    };

    const handleClose = () => {
        setEditFormData(tempEditFormData);
        setOpen(false);
    };

    const handleSaveClose = () => {
        setOpen(false);
    };

    const handleEditProfile = async () => {
        try {
            // Create a reference to the user's document in Firestore
            const userDocRef = doc(db, 'users', currentUser.uid);
        
            // Update the document with the new profile data
            await updateDoc(userDocRef, {
              firstName: editFormData.firstName,
              lastName: editFormData.lastName,
              occupation: editFormData.occupation,
              occupation_place: editFormData.occupationPlace,
              occupation_field: editFormData.occupationField,
              bio: editFormData.bio,
              social_linkedin: editFormData.socialsLinkedin,
              social_twitter: editFormData.socialsTwitter,
              social_github: editFormData.socialsGithub,
              languages: editFormData.languages,
            });
        
            // Update the local state with the new profile data
            setEditFormData(editFormData);
        
            // Close
            handleSaveClose();

            // Refresh the page
            window.location.reload();
          } catch (error) {
            console.error('Error updating profile:', error);
            // Handle error, e.g., display an error message to the user
          }
    };

    const handleChange = (field) => (edit) => {
        setEditFormData({
            ...editFormData,
            [field]: edit.target.value,
        });
    };

    const handleAddLanguage = () => {
        setEditFormData((prevFormData) => ({
            ...prevFormData,
            languages: [...prevFormData.languages, ''],
        }));
        console.log(editFormData.languages);
      };
    
    // const handleRemoveLanguage = (index) => {
    //     const updatedLanguages = [...languages];
    //     updatedLanguages.splice(index, 1);
    //     setLanguages(updatedLanguages);
    // };
    const handleRemoveLanguage = (index) => {
        const updatedLanguages = [...editFormData.languages];
        updatedLanguages.splice(index, 1);
        setEditFormData({
          ...editFormData,
          languages: updatedLanguages,
        });
      };
    
    //   const handleChangeLanguage = (index, value) => {
    //     const updatedLanguages = [...languages];
    //     updatedLanguages[index] = value;
    //     setLanguages(updatedLanguages);
    //   };
    const handleChangeLanguage = (index, value) => {
        const updatedLanguages = [...editFormData.languages];
        updatedLanguages[index] = value;
        setEditFormData({
          ...editFormData,
          languages: updatedLanguages,
        });
      };


    // const handleAddLanguage = () => {
    //   setLanguages([...languages, '']);
    // };

    // const handleRemoveLanguage = (index) => {
    //     const updatedLanguages = [...languages];
    //     updatedLanguages.splice(index, 1);
    //     setLanguages(updatedLanguages);
    //   };
    
    //   const handleChangeLanguage = (index, value) => {
    //     const updatedLanguages = [...languages];
    //     updatedLanguages[index] = value;
    //     setLanguages(updatedLanguages);
    //   };

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

                setEditFormData({
                    firstName: docSnap.data().firstName || '',
                    lastName: docSnap.data().lastName || '',
                    occupation: docSnap.data().occupation || '',
                    occupationPlace: docSnap.data().occupation_place || '',
                    occupationField: docSnap.data().occupation_field || '',
                    bio: docSnap.data().bio || '',
                    socialsLinkedin: docSnap.data().social_linkedin || '',
                    socialsTwitter: docSnap.data().social_twitter || '',
                    socialsGithub: docSnap.data().social_github || '',
                    languages: docSnap.data().languages || [],
                });
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
                <Avatar alt='Profile Picture' src={profileData.pfp_url} sx={{width: '120px', height: '120px'}}/>
                
                {/* Name, Badges, and follow button */}
                <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
                    <Typography style={{ display: 'flex', alignItems: 'center'}}  variant= "name_font">
                        {profileData.firstName}{" "}{profileData.lastName}

                        {/* if profile type is Mentor, produce the badges */}
                        {profileType === 1 || profileType === 3 ? (
                            <>
                            {/* Mentor Badge */}
                            <Tooltip title="Mentor">
                                <SchoolIcon sx={{color: '#016eea', mx: '5px'}} />
                            </Tooltip>
                            {/* Verified Badge */}
                            {profileData.verified ? (
                                <Tooltip title="Verified">
                                    <VerifiedIcon sx={{ color: '#016eea'}} />
                                </Tooltip>
                            ) : (<></>)}
                            </>
                        ) : (<></>)}
                    </Typography>

                    <Box>
                        {profileType === 3 || profileType === 4 ? (
                            <>
                            <Button onClick={handleFollowToggle} variant="contained" sx={{ backgroundColor: '#016eea', color: '#fff', textTransform: 'none' }}>
                                <Typography textAlign="center">{isFollowing ? 'Unfollow' : 'Follow'}</Typography>
                            </Button>
                            </>
                        ) : (
                            <>
                            </>
                        )}
                    </Box>
                </Box>


                {/* Occupation */}
                {profileData.occupation.trim().length !== 0 ? (
                <Typography  style={{ margin: 0, padding: 0 }}>
                    {/* PLACEHOLDER Student at the University of Saskatchewan */}
                    {profileData.occupation} at {profileData.occupation_place}
                    {/* <br /> */}
                </Typography>
                ) : (<></>)}

                {/* Field */}
                {profileData.occupation_field.trim().length !== 0 ? (
                <Typography>
                    {/* PLACEHOLDER Bsc. Computer Science */}
                    Field: {profileData.occupation_field}
                </Typography>
                ) : (<></>)}

                {/* Bio */}
                {profileData.bio.trim().length !== 0 ? (
                <Typography>
                    {/* PLACEHOLDER BIO: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Interdum velit euismod in pellentesque massa placerat duis. */}
                    {profileData.bio}   
                </Typography>
                ) : (<></>)}

                <Divider  sx={{ width: '50%'}}/>

                {/* Social Counts */}
                {/* TODO: make this a url (very low priority) */}
                <Typography>
                {profileData.follower_ids.length} Followers
                </Typography>
                <Typography>
                {profileData.following_ids.length} Following
                </Typography>

                {/* Repuation Indicator */}
                <Typography>
                    {profileData.reputation} Reputation
                    <Tooltip title="Reputation is used to help mentors and mentees determine a user's reliability and expertise, fostering a collaborative and supportive environment within the mentoring community. It is calculated using the user's interactions within the platform, considering factors such as completed mentorship sessions, feedback from participants, and the overall positive impact they have on the community.">
                        <QuestionMarkIcon sx={{ fontSize: 16, color: '#016eea'}}/>
                    </Tooltip>
                </Typography>

                <Divider  sx={{ width: '50%'}}/>
                
                {/* Social Icons/Buttons */}
                {profileData.social_linkedin.trim().length !== 0 ? (
                    <Tooltip title={`LinkedIn: ${profileData.social_linkedin}`}>
                        <IconButton onClick={() => handleSocialsButtonClick('linkedin', profileData.social_linkedin)}>
                            <LinkedInIcon sx={{color: '#016eea'}} />
                        </IconButton>
                    </Tooltip>
                ) : (<></>)}
                {profileData.social_twitter.trim().length !== 0 ? (
                    <Tooltip title={`Twitter (X): ${profileData.social_twitter}`}>
                        <IconButton onClick={() => handleSocialsButtonClick('twitter', profileData.social_twitter)}>
                            <TwitterIcon sx={{color: '#016eea'}} />
                        </IconButton>
                    </Tooltip>
                ) : (<></>)}
                {profileData.social_github.trim().length !== 0 ? (
                    <Tooltip title={`Github: ${profileData.social_github}`}> 
                        <IconButton onClick={() => handleSocialsButtonClick('twitter', profileData.social_github)}>
                            <GitHubIcon sx={{color: '#016eea'}} />
                        </IconButton>
                    </Tooltip>
                ) : (<></>)}
                
                {(profileData.social_github.trim().length !== 0 || profileData.social_linkedin.trim().length !== 0 || profileData.social_twitter.trim().length !== 0) && profileData.languages.length !== 0 ? (
                    <Divider  sx={{ width: '50%'}}/>
                ) : (<></>)}
                
                {/* Languages Spoken */}
                {profileData.languages.map((language, index) => (
                    <Typography key={index} style={{ margin: 0, padding: 0 }}>{language}</Typography>
                ))}
                {profileData.languages.length > 0 ? (<><Typography></Typography></>): (<></>)}


                {/* Edit Profile Button (only show if profileType is 1 or 2 corresponding to My Profile) */}
                {profileType === 1 || profileType === 2 ? (
                    <>
                    {(profileData.social_github.trim().length !== 0 || profileData.social_linkedin.trim().length !== 0 || profileData.social_twitter.trim().length !== 0) || profileData.languages.length !== 0 ? (
                    <><Divider  sx={{ width: '50%'}}/></>) : (<></>)}
                    
                    <Button onClick={handleOpen} variant="contained" sx={{ backgroundColor: '#016eea', color: '#fff', textTransform: 'none' }}>
                        {/* <Typography textAlign="center">{"Edit Profile"}</Typography> */}
                        Edit Profile
                    </Button>

                    {/* Dialog for the form */}
                    <Dialog open={open} onClose={handleClose}>
                        <DialogTitle>Edit Profile</DialogTitle>
                        <DialogContent>
                            {/* Profile Picture (TODO: UPLOAD PFP, Very Low Priority) */}
                            <Avatar alt='Profile Picture' src={profileData.pfp_url} sx={{width: '120px', height: '120px'}}/>

                            {/* Name */}
                            <TextField  sx={{marginBottom: 1, height: '50px'}}
                                label="First Name"
                                value={editFormData.firstName}
                                variant="outlined"
                                fullWidth
                                size='small'
                                margin="normal"
                                onChange={handleChange('firstName')}
                            />
                            <TextField  sx={{marginBottom: 1, height: '50px'}}
                                label="Last Name"
                                value={editFormData.lastName}
                                variant="outlined"
                                fullWidth
                                size='small'
                                //margin="normal"
                                onChange={handleChange('lastName')}
                            />
                            
                            {/* Occupation */}
                            Occupation
                            <TextField  sx={{marginBottom: 1, height: '50px'}}
                                label="Occupation"
                                value={editFormData.occupation}
                                variant="outlined"
                                fullWidth
                                size='small'
                                margin="normal"
                                onChange={handleChange('occupation')}
                            />
                            <TextField  sx={{marginBottom: 1, height: '50px'}}
                                label="Place of Work/Study"
                                value={editFormData.occupationPlace}
                                variant="outlined"
                                fullWidth
                                size='small'
                                onChange={handleChange('occupationPlace')}
                            />
                            <TextField  sx={{marginBottom: 1, height: '50px'}}
                                label="Focus/Specialization"
                                value={editFormData.occupationField}
                                variant="outlined"
                                fullWidth
                                size='small'
                                //margin="normal"
                                onChange={handleChange('occupationField')}
                            />

                            {/* Bio */}
                            Bio
                            <TextField sx={{marginTop: 1.5, marginBottom: 1, height: '125px'}}
                                label="Bio"
                                multiline
                                rows={4}
                                fullWidth
                                value={editFormData.bio}
                                onChange={handleChange('bio')}
                            />
                            {/* Socials */}
                            Socials
                            <TextField sx={{marginTop: 1.5, marginBottom: 1, height: '50px'}}
                            label="LinkedIn Username"
                            size='small'
                            fullWidth
                            onChange={handleChange('socialsLinkedin')}
                            variant="outlined"
                            value={editFormData.socialsLinkedin}
                            InputProps={{
                                startAdornment: (
                                <InputAdornment position="start">
                                    {"https://www.linkedin.com/in/"}
                                </InputAdornment>
                                ),
                            }}
                            />
                            <TextField sx={{marginBottom: 1, height: '50px'}}
                            label="Twitter (X) Username"
                            size='small'
                            fullWidth
                            onChange={handleChange('socialsTwitter')}
                            variant="outlined"
                            value={editFormData.socialsTwitter}
                            InputProps={{
                                startAdornment: (
                                <InputAdornment position="start">
                                    {"https://twitter.com/"}
                                </InputAdornment>
                                ),
                            }}
                            />
                            <TextField sx={{marginBottom: 1, height: '50px'}}
                            label="Github Username"
                            size='small'
                            fullWidth
                            onChange={handleChange('socialsGithub')}
                            variant="outlined"
                            value={editFormData.socialsGithub}
                            InputProps={{
                                startAdornment: (
                                <InputAdornment position="start">
                                    {"https://github.com/"}
                                </InputAdornment>
                                ),
                            }}
                            />
                            {/* Langauges */}
                            Languages
                            <Typography sx={{marginTop: 1.5}}></Typography>
                            {/* Render language input fields dynamically */}
                            {editFormData.languages.map((language, index) => (
                                <div key={index}>
                                <TextField
                                    sx={{height: '50px'}}
                                    size='small'
                                    label={`Language ${index + 1}`}
                                    value={language}
                                    onChange={(e) => handleChangeLanguage(index, e.target.value)}
                                />
                                <Button onClick={() => handleRemoveLanguage(index)}>Remove</Button>
                                </div>
                            ))}
                            {/* Button to add a new language */}
                            <Button onClick={handleAddLanguage}>Add Language</Button>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose} color="secondary" sx={{ textTransform: 'none' }}>
                                Cancel
                            </Button>
                            <Button onClick={handleEditProfile} sx={{ backgroundColor: '#016eea', color: '#fff', textTransform: 'none' }}>
                                Save
                            </Button>
                        </DialogActions>
                    </Dialog>

                    {/* <EditProfilePopUp /> */}
                    </>
                ) : (<></>)}

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