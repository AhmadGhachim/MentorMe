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
import LinearProgress from '@mui/material/LinearProgress';
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
import EditProfilePopUp from "../components/EditProfilePopUp";
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';

const mainTheme = createTheme({
    palette: {
        background: {
          default: '#f5faff',
        },
      },
      typography: {
        fontFamily: 'Roboto, sans-serif',
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
    const [isFollowing, setIsFollowing] = useState(false);
    const [followerCount, setFollowerCount] = useState(0);
    const [followingCount, setFollowingCount] = useState(0);
    const [userEvents, setEvents] = useState();
    const [userPosts, setPosts] = useState();

    // const handleProgress = () => {
    //     setProgress((prevProgress) => (prevProgress >= 100 ? 0 : prevProgress + 10));
    // };

    const [tasks, setTasks] = useState([
        // { id: 1, text: 'Create Account', completed: true },
        { id: 0, text: 'Verify Email', completed: false },
        { id: 1, text: 'Add Occupation and Place of Work/Study to Your Profile', completed: false },
        { id: 2, text: 'Add a Bio', completed: false },
        { id: 3, text: 'Bind Social Accounts/Read the <MentorWiki> guide for Mentors', completed: false },
        { id: 4, text: 'Reach Out to a Mentor/Create Your First Event', completed: false },
    ]);

    // change task to complete/incomplete
    const handleToggle = (taskID) => {
        setTasks((prevTasks) =>
            prevTasks.map((task) =>
            task.id === taskID ? { ...task, completed: !task.completed } : task
            )
        );
    };

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

    // animate tutorial circular progress bar to show percentage of tasks completed
    React.useEffect(() => {
        const intervalId = setInterval(() => {
            const completedCount = tasks.reduce((count, task) => {
            return count + (task.completed ? 1 : 0);
            }, 0);
            const newProgress = completedCount * 20;
            setProgress(newProgress);
        }, 0);
        return () => clearInterval(intervalId);
    }, [tasks]);

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

                setFollowerCount(docSnap.data().follower_ids.length);
                setFollowingCount(docSnap.data().following_ids.length);

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

                // update tutorial and completed status:
                //const updatedTasks = tasks.map(task => ({ ...task, completed: docSnap.data().tutorial[task.id] }));
                const updatedTasks = tasks.map(task => ({ ...task, completed: false }));
                if (docSnap.data().user_type == "Mentee") {
                    updatedTasks[3] = { ...updatedTasks[3], text: 'Bind Social Accounts' };
                    updatedTasks[4] = { ...updatedTasks[4], text: 'Try Reaching Out to a Mentor' };
                } else {
                    updatedTasks[3] = { ...updatedTasks[3], text: 'Read the <MentorWiki> guide for Mentors' };
                    updatedTasks[4] = { ...updatedTasks[4], text: 'Create and Host Your First Event' };
                }
                // check wether tasks 1-5 are actually complete or not
                updatedTasks[0] = { ...updatedTasks[0], completed: docSnap.data().tutorial[0] };
                if (docSnap.data().occupation && docSnap.data().occupation_place)
                    updatedTasks[1] = { ...updatedTasks[1], completed: true };
                if (docSnap.data().bio)
                    updatedTasks[2] = { ...updatedTasks[2], completed: true };
                if (docSnap.data().social_github || docSnap.data().social_linkedin || docSnap.data().social_twitter)
                    updatedTasks[3] = { ...updatedTasks[3], completed: true };
                if (docSnap.data().connection_ids && docSnap.data().connection_ids.length > 0 )
                    updatedTasks[4] = { ...updatedTasks[4], completed: true };

                setTasks(updatedTasks);

                // get and set the subcollections
                const eventsSubcollectionRef = collection(docRef, 'events');
                const postsSubcollectionRef = collection(docRef, 'posts');

                const eventsQuerySnapshot = await getDocs(eventsSubcollectionRef);
                const postsQuerySnapshot = await getDocs(postsSubcollectionRef);

                setEvents(eventsQuerySnapshot.docs);
                setPosts(postsQuerySnapshot.docs);

                // console.log(eventsQuerySnapshot.docs);

                // eventsQuerySnapshot.forEach((doc) => {
                //     console.log(doc.id, ' => ', doc.data());
                //   });

                //console.log(userData);
            } else {
                // docSnap.data() will be undefined in this case
                console.log("No such document!");
            }
        }
        fetchProfileData()
    }, []);

    // check if user is following this account or not
    useEffect(() => {
        const checkIfFollowing = async () => {
            if (currentUser) {
                const docRef = doc(db, 'users', currentUser.uid);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    const followerIds = docSnap.data().follower_ids || [];
                    const followingIds = docSnap.data().following_ids || [];
          
                    setIsFollowing(followerIds.includes(id));
                    setFollowerCount(followerIds.length);
                    setFollowingCount(followingIds.length);

                    //const followingIds = docSnap.data().following_ids || [];
                    //setIsFollowing(followingIds.includes(id));
                }
            }
        };
    
        checkIfFollowing();
    }, [currentUser, id]);
    
    const handleFollowToggle = async () => {
        if (currentUser) {
            const userRef = doc(db, 'users', currentUser.uid);
            const profileRef = doc(db, 'users', id);

            if (isFollowing) {
                // If already following, unfollow
                await updateDoc(userRef, { following_ids: arrayRemove(id) });
                await updateDoc(profileRef, { follower_ids: arrayRemove(currentUser.uid) });
            } else {
                // If not following, follow
                await updateDoc(userRef, { following_ids: arrayUnion(id) });
                await updateDoc(profileRef, { follower_ids: arrayUnion(currentUser.uid) });
            }
            //setFollowerCount(profileData.follower_ids.length);
            //setFollowingCount(profileData.following_ids.length);

            // Update local state
            setIsFollowing(!isFollowing);

            // Update follower/following counts
            const profileSnap = await getDoc(profileRef);
            setFollowerCount(profileSnap.data().follower_ids.length);
            setFollowingCount(profileSnap.data().following_ids.length);
        }
    };

    
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

                <Divider />

                {/* Social Counts */}
                {/* TODO: make this a url (very low priority) */}
                <Typography>
                {followerCount} Followers
                </Typography>
                <Typography>
                {followingCount} Following
                </Typography>

                {/* Repuation Indicator */}
                <Typography>
                    {profileData.reputation} Reputation
                    <Tooltip title="Reputation is used to help mentors and mentees determine a user's reliability and expertise, fostering a collaborative and supportive environment within the mentoring community. It is calculated using the user's interactions within the platform, considering factors such as completed mentorship sessions, feedback from participants, and the overall positive impact they have on the community.">
                        <QuestionMarkIcon sx={{ fontSize: 16, color: '#016eea'}}/>
                    </Tooltip>
                </Typography>

                <Divider />
                
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
                    <Divider />
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
                    <><Divider /></>) : (<></>)}
                    
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

            {/* sina-kh */}
            
            {/* MAIN CONTENT BOX */}
            <Box sx={{pl: '20px', flexGrow: 1, '& > *:not(:last-child)': { marginBottom: 2 }}}>
                {/* Profile Heading depends on wether user is viewing their own profile or not */}
                {profileType === 1 || profileType === 2 ? (
                    // tutorial is incomplete - show tutorial
                    <>
                    <Typography variant="bold_font">{"My Profile"}</Typography><Typography></Typography>
                    {progress < 100 ? (
                        <>
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
                                    {/* <ListItemText primary={task.text} /> */}
                                    <ListItemText primary={(
                                        <span>
                                            {/* {task.text.includes('<MentorWiki>') ? (
                                                // target="_blank" rel="noopener noreferrer"
                                                <a href="/profile" >
                                                    {task.text.replace('<MentorWiki>', 'MentorWiki')}
                                                </a>
                                            ) : (
                                                task.text
                                            )} */}
                                            {task.text.split('<MentorWiki>').map((part, index) => (
                                                index !== 0 ? (
                                                // target="_blank" rel="noopener noreferrer"
                                                <a key={index} href="/profile">
                                                    MentorWiki
                                                </a>
                                                ) : (
                                                part
                                                )
                                            ))}
                                        </span>
                                    )} />
                                </ListItem>
                                ))}
                            </List>
                        </Container>
                        </>
                    ) : (

                        <>
                        <Box sx={{display:"flex", alignItems:"center"}}>
                            {/* Left side - Badge Image */}
                            <Tooltip title="Your badge is not just a shiny accessory - it's your digital crown, showcasing your status and achievements for the world to admire and applaud.">
                                {profileData.badge_tier === 1 ? ( // bronze
                                    <img src="https://firebasestorage.googleapis.com/v0/b/mentorme-ef368.appspot.com/o/assets%2Fbronze-medal.png?alt=media&token=33e5dda6-c6e0-44d9-abbe-3a07ff90c912" alt="Bronze Badge" style={{ maxWidth: '200px'}} />
                                ) : profileData.badge_tier === 2 ? ( // silver
                                    <img src="https://firebasestorage.googleapis.com/v0/b/mentorme-ef368.appspot.com/o/assets%2Fsilver-medal.png?alt=media&token=4d895431-9fd9-44b0-8e42-3a81c8cee542" alt="Silver Badge" style={{ maxWidth: '200px'}} />
                                ) : ( // gold
                                    <img src="https://firebasestorage.googleapis.com/v0/b/mentorme-ef368.appspot.com/o/assets%2Fgold-medal.png?alt=media&token=ecd74f51-3b0d-4caa-a959-ae8b06fd54e4" alt="Gold Badge" style={{ maxWidth: '200px'}} />
                                )}
                            </Tooltip>
                            { /* If mentee, show mentee stats */}
                            {profileType === 2 ? (
                                <List>
                                    <ListItem disablePadding sx={{display: 'flex', flexDirection: 'column', alignItems: 'start'}}>
                                        <ListItemText primary={`Number of Mentors Connected With: ${profileData.connection_ids ? profileData.connection_ids.length : 0} / ${(profileData.badge_tier*profileData.badge_tier) + 2}`} /><br/>
                                        {/* <LinearProgress variant="determinate" value={80} sx={{ width: '80%', height: '20px', borderRadius: '10px', mb: 1}} /> */}
                                    </ListItem>
                                    <ListItem disablePadding>
                                        <ListItemText primary={`Number of Events Registered/Attended: ${userEvents ? userEvents.length : 0} / ${(profileData.badge_tier*profileData.badge_tier) * 5}`} />
                                    </ListItem>
                                    <ListItem disablePadding>
                                        <ListItemText primary={`Number of Posts: ${userPosts ? userPosts.length : 0} / ${(profileData.badge_tier*profileData.badge_tier) * 5}`} />
                                    </ListItem>
                                </List>
                            ) : ( // else show mentor stats
                                <List>
                                    <ListItem disablePadding>
                                        <ListItemText primary={`Number of Studented Mentored: ${profileData.connection_ids ? profileData.connection_ids.length : 0} / ${(profileData.badge_tier*profileData.badge_tier) * 5}`} />
                                    </ListItem>
                                    <ListItem disablePadding>
                                        <ListItemText primary={`Number of Events Hosted: ${userEvents ? userEvents.filter(doc => doc.user_id === currentUser.uid).length : 0} / ${(profileData.badge_tier*profileData.badge_tier) * 5}`} />
                                        {/* TODO: NOT TESTED */}
                                    </ListItem>
                                    <ListItem disablePadding>
                                        <ListItemText primary={`Number of Posts: ${userPosts ? userPosts.filter(doc => doc.user_id === currentUser.uid).length : 0} / ${(profileData.badge_tier*profileData.badge_tier) * 5}`} />
                                        {/* TODO: NOT TESTED */}
                                    </ListItem>
                                </List>
                            )}
                        </Box>
                        </>
                    )}
                    </>
                ) : (
                    <>
                    <Typography variant="bold_font">{profileData.firstName}'s Profile</Typography><Typography></Typography>
                    <Typography>{"- Mentee only: show number of events attended (public)"}</Typography>
                    <Typography>{"- Mentor only: show number of sessions theyve given + num mentees alongside badge after tutorial (public)"}</Typography>
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
                ) : (<></>)}

                {/* My Mentors (Mentee's My Profile Page Only) */}
                {profileType === 2 ? (
                    <>
                        <Typography variant="bold_font">{"My Mentors"}</Typography><Typography></Typography>
                        {/* TODO: horizontal scrolling list of icons and first names of mentors, clicking leads to their profile*/}
                        <Typography>{"PLACEHOLDER: horizontal scrolling list of icons and first names of mentors, clicking leads to their profile"}</Typography>
                    <Divider  sx={{ width: '100%'}}/>
                    </>
                ) : (<></>)}

                {/* Events Section */}
                <Box sx={{display: 'flex', justifyContent:'space-between'}}>  
                    {profileType === 1 || profileType === 2 ? (
                        <Typography variant="bold_font">{"My Registered Events"}</Typography>
                    ) : (
                        <Typography variant="bold_font">{profileData.firstName}'s Registered Events </Typography>
                    )}
                    {/* TODO: Past and Present events */}
                    <FormControlLabel
                        value="start"
                        control={<Switch color="primary" />}
                        label="Past Events"
                        labelPlacement="start"
                    />
                </Box>

                {/* TODO: Show Events */}
                <Typography>{"PLACEHOLDER: EVENTS HORIZONTAL SCROLLER"}</Typography>

                <Divider  sx={{ width: '100%'}}/>

                {/* Posts Section */}
                {profileType === 1 || profileType === 2 ? (
                    <>
                    <Typography variant="bold_font">{"My Posts"}</Typography><Typography></Typography>
                    </>
                ) : (
                    <>
                    <Typography variant="bold_font">{profileData.firstName}'s Posts</Typography><Typography></Typography>
                    </>
                )}
                {/* TODO: Show Posts */}
                <Typography>{"PLACEHOLDER: POSTS"}</Typography>
            </Box>
        </Box>
        <Footer />
        </ThemeProvider>
        </>
    );
}

export default ProfilePage;