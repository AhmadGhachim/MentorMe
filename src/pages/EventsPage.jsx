// EventsPage.jsx
import React from 'react';
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
import NavBarProfileMentee from '../components/NavBarProfileMentee.jsx'
import {createTheme, ThemeProvider} from "@mui/material/styles";
import image from '../assets/sign-in-side.jpg'


const EventsPage = () => {
    const events = [
        {
            id: 1,
            eventName: 'Intro to Software En',
            hostedBy: 'Ahmad, Soft Eng @Google',
            about: 'Lorem Ipsum',
            location: 'In Person, Saskatoon',
            image: image,
        },
        // Add more events as needed
        {
            id: 2,
            eventName: 'Web Development Workshop',
            hostedBy: 'Jane Doe, Frontend Developer',
            about: 'Lorem Ipsum',
            location: 'Online',
            image: image,
        },
        {
            id: 3,
            eventName: 'Data Science Seminar',
            hostedBy: 'John Smith, Data Scientist @IBM',
            about: 'Lorem Ipsum',
            location: 'In Person, New York',
            image: image,
        },
    ];

    const [registrationDialogOpen, setRegistrationDialogOpen] = React.useState(false);

    const handleRegisterClick = () => {
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
            <NavBarProfileMentee />
            <Container>
                <Typography variant="h4" gutterBottom style={{ fontFamily: 'system-ui', color: '#016EEA', fontWeight: 'bold', marginTop: '100px' }}>
                    Current Events
                </Typography>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    {events.map((event) => (
                        <Card key={event.id} style={{ display: 'flex', width: '800px', margin: '20px' }}>
                            <CardMedia
                                component="img"
                                alt={event.eventName}
                                height="100%"
                                image={event.image}
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
                                    <Button variant="contained" color="primary" onClick={handleRegisterClick} style={{ width: '49%' }}>
                                        Register
                                    </Button>
                                    <Button variant="outlined" color="secondary" style={{ width: '49%' }}>
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
