// EventsPage.jsx
import React, {useState, useEffect} from 'react';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import DialogContentText from '@mui/material/DialogContentText';
import Footer from '../components/Footer.jsx'
import NavBarProfileMentee from '../components/NavBarHomeMentee.jsx'
import NavbarProfileMentor from '../components/NavBarHomeMentor.jsx'
import {createTheme, ThemeProvider} from "@mui/material/styles";
import { useNavigate } from 'react-router-dom';
import image from '../assets/sign-in-side.jpg'
import {useAuth} from '../AuthContext.jsx'
import {auth, db} from '../../backend/Firebase.js'
import { collection, getDocs, getDoc, doc, addDoc } from "firebase/firestore";





const EventsPage = () => {
    const {currentUser} = useAuth(); // null if user is not logged in
    const [events, setEvents] = useState([]);
    const [filteredEvents, setFilteredEvents] = useState([]);
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

   // ...

useEffect(() => {
    async function fetchEvents() {
        const querySnapshot = await getDocs(collection(db, "events"));
        const eventsData = [];
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            eventsData.push(doc.data());
        });

        // Set the events state after fetching the data
        setEvents(eventsData);
        setFilteredEvents(eventsData)
        console.log(eventsData); // Log inside the fetchEvents function
    }

    fetchEvents();
}, []);


    const handleSearch = (query) => {
        console.log(query)
        const filteredData = events.filter(item => item.eventName.toLowerCase().includes(query.toLowerCase()) || item.hostedBy.toLowerCase().includes(query.toLowerCase()) || item.about.toLowerCase().includes(query.toLowerCase()));
        console.log(filteredData)
        setFilteredEvents(filteredData);
    }

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

    const theme = createTheme({
        palette: {
            background: {
                default: '#f5faff',
            },
        },
    });

    return (
        <ThemeProvider theme={theme}>
            {userType === 'Mentor' ? (
            <NavbarProfileMentor onSearch={handleSearch}/>
            ) : (
            <NavBarProfileMentee onSearch={handleSearch}/>
            )}

            <Container>
                <Typography variant="h4" gutterBottom style={{ fontFamily: 'system-ui', color: '#016EEA', fontWeight: 'bold', marginTop: '100px' }}>
                    Current Events
                </Typography>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    {filteredEvents.map((event) => (
                        <Card key={event.event_id} style={{ display: 'flex', width: '800px', margin: '20px' }}>
                            <CardMedia
                                component="img"
                                alt={event.eventName}
                                height="100%"
                                image={image}
                                style={{ width: '300px' }}
                            />
                            <CardContent style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '20px', width: '100%' }}>
                                <div>
                                    <Typography gutterBottom variant="h5" component="div">
                                        {event.eventName}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Hosted By: {event.hostedBy}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" style={{ marginBottom: '20px' }}>
                                        About: {event.about}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Location: {event.location}
                                    </Typography>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <Button variant="contained" color="primary" onClick={() => handleRegisterClick(event)} style={{ width: '49%' }}>
                                        Register
                                    </Button>
                                    <Button variant="outlined" color="secondary" style={{ width: '49%' }} onClick={() => navigate("/ViewEvent/"+event.event_id)}>
                                        View Event
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Registration Confirmation Dialog */}
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
            </Container>
            <Footer />
        </ThemeProvider>
    );
};

export default EventsPage;
