import React, {useState, useEffect} from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import MentorJaneSmith from '../assets/MentorJaneSmith.jpg'
import MentorBobJohnson from '../assets/MentorBobJohnson.jpg'
import DefaultImage from '../assets/sign-in-side.jpg'
import Banner from '../assets/sign-in-side.jpg'
import {createTheme, ThemeProvider, useTheme} from "@mui/material/styles";
import useMediaQuery from '@mui/material/useMediaQuery';
import Footer from "../components/Footer.jsx";
import NavBarProfileMentee from "../components/NavBarProfileMentee.jsx";
import NavBarProfileMentor from "../components/NavBarProfileMentor.jsx";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Dialog from "@mui/material/Dialog";
import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress';
import CssBaseline from '@mui/material/CssBaseline';
import { useParams } from 'react-router-dom';
import {useAuth} from '../AuthContext.jsx'
import {auth, db} from '../../backend/Firebase.js'
import { collection, getDocs, addDoc, getDoc, doc } from "firebase/firestore";
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
    // Replace the following data with actual event details
    const eventDetails = {
        eventName: 'Tech Conference 2023 🌐',
        dateTime: '2023-12-01T10:00',
        location: 'In Person, New York',
        hostedBy: '',
        about: '🚀 Tech Innovate Summit 2023: Unleashing Tomorrow\'s Technologies Today!\n' +
            '\n' +
            'Get ready for a mind-bending journey into the future of technology at Tech Innovate Summit 2023! This cutting-edge conference is a melting pot of brilliant minds, industry leaders, and tech enthusiasts, all converging to explore the latest trends, innovations, and breakthroughs that are shaping our digital landscape.\n' +
            '\n' +
            '🌐 Explore the Frontiers of Tech:\n' +
            '\n' +
            'Dive deep into the realms of artificial intelligence, machine learning, blockchain, and beyond. Our expert speakers will unravel the mysteries of emerging technologies, providing insights that will redefine the way we live, work, and connect.\n' +
            '\n' +
            '🔧 Hands-On Workshops and Demos:\n' +
            '\n' +
            'Immerse yourself in hands-on workshops and live demos that showcase the practical applications of groundbreaking technologies. Whether you\'re a seasoned developer or a curious newcomer, there\'s something for everyone to learn and experience.\n' +
            '\n' +
            '🤖 Meet the Visionaries:\n' +
            '\n' +
            'Connect with the tech titans and visionaries who are at the forefront of innovation. Engage in thought-provoking discussions, gain valuable industry insights, and network with like-minded professionals who are driving the digital revolution.\n' +
            '\n' +
            '🌍 Global Perspectives, Local Impact:\n' +
            '\n' +
            'Discover how global technologies are making a local impact. From smart cities to sustainable solutions, learn how tech is addressing real-world challenges and creating a more connected and sustainable future.\n' +
            '\n' +
            '🚨 Stay Ahead of the Curve:\n' +
            '\n' +
            'In a world where change is the only constant, staying ahead of the curve is crucial. Tech Innovate Summit 2023 equips you with the knowledge and tools you need to navigate the rapidly evolving tech landscape and thrive in the age of digital transformation.\n' +
            '\n' +
            'Save the date for Tech Innovate Summit 2023 — where innovation knows no bounds! Join us for an unforgettable experience that will inspire, educate, and shape the future of technology.\n',
        bannerImage: Banner
    };

    const mentors = [
        {
            id: 1,
            name: 'Jane Smith',
            profession: 'Web Developer',
            image: MentorJaneSmith,
            uid: "slDRvQ3fJ3YLay4dj6Zdd990tQ22"
            
        },
        {
            id: 2,
            name: 'Bob Johnson',
            profession: 'Data Scientist',
            image: MentorBobJohnson,
            uid: "jfpuQRbNzUNJYep62GuYYB40x6f2"
        },
    ];

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

    const handleRegisterClick = async () => {

        const docRef = await getDoc(doc(db, 'events', 'pilugbGPQUGcAln2tw7u'))
        const selectedEvent = docRef.data()
        const parentDocumentRef = doc(db, 'users', currentUser.uid);

            // Reference to the subcollection
            const subcollectionRef = collection(parentDocumentRef, 'events');

            const addedDocRef = await addDoc(subcollectionRef, selectedEvent);
        setRegistrationDialogOpen(true);
    };


    const handleRegistrationDialogClose = () => {
        setRegistrationDialogOpen(false);
    };

    const theme = createTheme({
        palette: {
            background: {
                default: '#f5faff',
            },
        },
    });

    const isMobile = useMediaQuery(useTheme().breakpoints.down('md'));
    // replace with blank (loading) screen until userData is set
    if ( !userType) {
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
            <Container style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                {/* Banner */}
                <Card>
                    <CardMedia
                        component="img"
                        alt="Event Banner"
                        height="400"
                        image={eventDetails.bannerImage}
                    />
                    <CardContent>
                        {/* Event Name */}
                        <Typography variant="h3" gutterBottom>
                            {eventDetails.eventName}
                        </Typography>
                        {/* Date and Time */}
                        <Typography variant="subtitle1" color="textSecondary">
                            📅{new Date(eventDetails.dateTime).toLocaleString()}
                        </Typography>
                        {/* Location */}
                        <Typography variant="subtitle1" color="textSecondary">
                            📍{eventDetails.location}
                        </Typography>
                        {/* Hosted By */}
                        <Typography variant="subtitle1" color="textSecondary">
                            {eventDetails.hostedBy}
                        </Typography>
                        {/* Mentor Cards */}
                        <Typography variant="h5" gutterBottom>
                            Hosted By
                        </Typography>
                        <Stack direction="row" spacing={5} style={{ justifyContent: 'center' }}>
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

                                            <Button variant="outlined" color="primary" fullWidth onClick={() => navigate("/profile/" + mentor.uid)}>
                                                View Profile
                                            </Button>
                                        </Stack>
                                    </CardContent>
                                </Card>
                            ))}
                        </Stack>
                        {/* About Section */}
                        <Typography variant="h5" gutterBottom>
                            About
                        </Typography>
                        <Typography variant="body1">
                            {eventDetails.about}
                        </Typography>
                        {/* Register Button */}
                        <Button variant="contained" color="primary" onClick={handleRegisterClick} style={{ margin: '20px auto', display: 'block' }}>
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
