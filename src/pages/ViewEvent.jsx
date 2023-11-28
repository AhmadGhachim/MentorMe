import React, {useState, useEffect} from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, createTheme, useTheme} from '@mui/material/styles';
import MentorJaneSmith from '../assets/MentorJaneSmith.jpg'
import MentorBobJohnson from '../assets/MentorBobJohnson.jpg'
import Banner from '../assets/sign-in-side.jpg'
import Footer from "../components/Footer.jsx";
import NavBarProfileMentee from "../components/NavBarProfileMentee.jsx";
import NavBarProfileMentor from "../components/NavBarProfileMentor.jsx";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Dialog from "@mui/material/Dialog";
import useMediaQuery from '@mui/material/useMediaQuery';
import { useParams } from 'react-router-dom';
import {useAuth} from '../AuthContext.jsx'
import {auth, db} from '../../backend/Firebase.js'
import {getDoc, doc, collection, addDoc } from "firebase/firestore";
import { useNavigate } from 'react-router-dom';

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


const EventPage = () => {
    const {currentUser} = useAuth();
    const {id} = useParams();
    const [eventData, setEventData] = useState();
    const [hostData, setHostData] = useState();
    // Replace the following data with actual event details
    useEffect(() => {
        async function fetchEvents() {
            const docRef = doc(db, "events", id);
            const docSnap = await getDoc(docRef);
            
            if (docSnap.exists()) {
                //console.log("Document data:", docSnap.data());
                setEventData(docSnap.data());
                const hostDocRef = doc(db, "users", docSnap.data().user_id)
                const hostDocSnap = await getDoc(hostDocRef);
                setHostData(hostDocSnap.data())
                console.log(hostData);
            } else {
                // docSnap.data() will be undefined in this case
                console.log("No such document!");
            }
            
            console.log(eventData); // Log inside the fetchEvents function
        }
        console.log(id)
        fetchEvents();
    }, []);

    const [userType, setUserType] = useState();
    const navigate = useNavigate();
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


    const [registrationDialogOpen, setRegistrationDialogOpen] = React.useState(false);

    const handleRegisterClick = async (selectedEvent) => {

        const parentDocumentRef = doc(db, 'users', currentUser.uid);

            // Reference to the subcollection
            const subcollectionRef = collection(parentDocumentRef, 'events');

            const addedDocRef = await addDoc(subcollectionRef, selectedEvent);
        setRegistrationDialogOpen(true);
    };

    const handleRegistrationDialogClose = () => {
        setRegistrationDialogOpen(false);
    };

    const isMobile = useMediaQuery(useTheme().breakpoints.down('md'));
    const theme = createTheme();
    // replace with blank (loading) screen until userData is set
    if (!hostData || !userType || !eventData) {
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
    return (
        <ThemeProvider theme={theme}>
            {userType === 'Mentor' ? (
            <NavBarProfileMentor/>
            ) : (
            <NavBarProfileMentee/>
            )}

            <Container  style={{ width: '1200px', flexDirection: 'column', alignItems: 'center' }}>
                {/* Banner */}
                <Card>
                    <CardMedia
                        component="img"
                        alt="Event Banner"
                        height="400"
                        image={Banner}
                    />
                    <CardContent>
                        {/* Event Name */}
                        <Typography variant="h3" gutterBottom>
                            {eventData.eventName}
                        </Typography>
                        {/* Date and Time */}
                        <Typography variant="subtitle1" color="textSecondary">
                            📅{new Date(eventData.dateTime).toLocaleString()}
                        </Typography>
                        {/* Location */}
                        <Typography variant="subtitle1" color="textSecondary">
                            📍{eventData.location}
                        </Typography>
                        {/* Hosted By */}
                        <Typography variant="subtitle1" color="textSecondary">
                            {}
                        </Typography>
                        {/* Mentor Cards */}
                        <Typography variant="h5" gutterBottom>
                            Hosted By
                        </Typography>
                        <Stack direction="row" spacing={5} style={{ justifyContent: 'center' }}>

                                <Card style={{ width: 300, margin: 20 }}>
                                {hostData.pfp_url !== ""  ? (
                                        <CardMedia
                                        component="img"
                                        alt={hostData.firstName}
                                        height="280"
                                        image={hostData.pfp_url}
                                        />
                                        ) : (
                                        <CardMedia
                                        component="img"
                                        alt={hostData.firstName}
                                        height="280"
                                        image={Banner}
                                        />
                                        )}
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="div">
                                            {hostData.firstName + ' ' + hostData.lastName}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {hostData.occupation + ' @' + hostData.employer}
                                        </Typography>
                                        <Stack spacing={2} direction="column" mt={2}>

                                            <Button variant="outlined" color="primary" fullWidth>
                                                View Profile
                                            </Button>
                                        </Stack>
                                    </CardContent>
                                </Card>
                        </Stack>
                        {/* About Section */}
                        <Typography variant="h5" gutterBottom>
                            About
                        </Typography>
                        <Typography variant="body1">
                            {eventData.about}
                        </Typography>
                        {/* Register Button */}
                        <Button variant="contained" color="primary" onClick={() => handleRegisterClick(eventData)} style={{ margin: '20px auto', display: 'block' }}>
                            Register
                        </Button>
                    </CardContent>
                </Card>
            </Container>
            <Dialog open={registrationDialogOpen} onClose={handleRegistrationDialogClose}>
                <DialogContent>
                    <DialogContentText>
                        Registration confirmed! You will receive further details via email.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleRegistrationDialogClose} color="primary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
            <Footer />
        </ThemeProvider>
    );
};

export default EventPage;
