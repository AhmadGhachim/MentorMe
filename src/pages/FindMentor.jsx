import React, { useState, useEffect } from 'react';
import Lottie from 'lottie-react';
import animationData from '../assets/FindingMentorAnimationV2.json';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import DialogContentText from '@mui/material/DialogContentText';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import MentorJaneSmith from '../assets/MentorJaneSmith.jpg'
import MentorJohnDoe from '../assets/MentorJohnDoe.jpg'
import MentorBobJohnson from '../assets/MentorBobJohnson.jpg'
import Footer from '../components/Footer.jsx'
import NavBarProfileMentee from '../components/NavBarProfileMentee.jsx'

const MentorPage = () => {
    const [loading, setLoading] = useState(true);
    const [contactDialogOpen, setContactDialogOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const timeout = setTimeout(() => {
            setLoading(false);
        }, 7000);

        return () => clearTimeout(timeout);
    }, []);

    const handleContactClick = () => {
        setContactDialogOpen(true);
    };

    const handleDialogClose = () => {
        setContactDialogOpen(false);
        // Navigate to "/home" after closing the dialog
        navigate('/home');
    };

    const mentors = [
        {
            id: 1,
            name: 'John Doe',
            profession: 'Software Engineer',
            image: MentorJohnDoe,
        },
        {
            id: 2,
            name: 'Jane Smith',
            profession: 'Web Developer',
            image: MentorJaneSmith,
        },
        {
            id: 3,
            name: 'Bob Johnson',
            profession: 'Data Scientist',
            image: MentorBobJohnson,
        },
    ];

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice',
        },
    };

    const theme = createTheme();

    return (
        <ThemeProvider theme={theme}>
            <NavBarProfileMentee />
            <Container
                style={{
                    height: '90vh',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginTop: '50px',
                }}
            >
                {!loading && (
                    <>
                        <Typography variant="h4" gutterBottom style={{ color: '#016EEA', marginBottom: '50px' }}>
                            Choose to contact one of the following mentors
                        </Typography>
                        <Stack direction="row" spacing={5}>
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
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                fullWidth
                                                onClick={handleContactClick}
                                            >
                                                Contact Me
                                            </Button>
                                            <Button variant="outlined" color="secondary" fullWidth>
                                                View Profile
                                            </Button>
                                        </Stack>
                                    </CardContent>
                                </Card>
                            ))}
                        </Stack>

                        {/* Contact Mentor Dialog */}
                        <Dialog open={contactDialogOpen} onClose={handleDialogClose}>
                            <DialogContent>
                                <DialogContentText>
                                    Mentor has been notified. You will be contacted soon!
                                </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handleDialogClose} color="primary">
                                    Go to Home Page
                                </Button>
                            </DialogActions>
                        </Dialog>
                    </>
                )}
                {loading && (
                    <Box
                        height="50vh"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                    >
                        <Lottie options={defaultOptions} height={50} width={50} animationData={animationData} />
                    </Box>
                )}
            </Container>
            <Footer />
        </ThemeProvider>
    );
};

export default MentorPage;
