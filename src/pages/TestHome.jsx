import React, {useState} from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Posts from '../components/Post.jsx'
import image from '../assets/sign-in-side.jpg'
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';


const featuredEvents = [
    {
        id: 1,
        eventName: 'Tech Conference 2023',
        hostedBy: 'John Doe, Software Engineer @Google',
        dateTime: '2023-11-30T18:00',
        location: 'Online',
        image: image,
    },
    {
        id: 2,
        eventName: 'React Workshop',
        hostedBy: 'Jane Doe, Frontend Developer @Meta',
        dateTime: '2023-11-30T18:00',
        location: 'Online',
        image: image,
    },
    {
        id: 3,
        eventName: 'Data Science Seminar',
        hostedBy: 'John Smith, Data Scientist @Tableau',
        dateTime: '2023-11-30T18:00',
        location: 'In Person, New York',
        image: image,
    },
    {
        id: 4,
        eventName: 'Intro to UX Design',
        hostedBy: 'Janet, UX Designer @Notion',
        dateTime: '2023-11-30T18:00',
        location: 'Online',
        image: image,
    },

    // Add more events as needed
];

// eslint-disable-next-line react/prop-types
const EventCard = ({ event }) => {
    const [confirmationOpen, setConfirmationOpen] = useState(false);

    const handleRegisterClick = () => {
        setConfirmationOpen(true);
    };

    const handleCloseConfirmation = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setConfirmationOpen(false);
    };

    return (
        <Card key={event.id} style={{ width: 300 }}>
            <img
                src={event.image}
                alt={event.eventName}
                style={{ width: '100%', height: 200, objectFit: 'cover' }}
            />
            <CardContent>
                <Typography variant="h6">{event.eventName}</Typography>
                <Typography variant="body2">Hosted by {event.hostedBy}</Typography>
                <Typography variant="body2">{new Date(event.dateTime).toLocaleString()}</Typography>
                <Typography variant="body2">Location: {event.location}</Typography>
                <Stack spacing={1} direction="column" mt={2}>
                    <Button variant="outlined" color="secondary" fullWidth>
                        View Event
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        onClick={handleRegisterClick}
                    >
                        Register
                    </Button>
                </Stack>
            </CardContent>

            {/* Snackbar for registration confirmation */}
            <Snackbar
                open={confirmationOpen}
                autoHideDuration={6000}
                onClose={handleCloseConfirmation}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
            >
                <MuiAlert onClose={handleCloseConfirmation} severity="success" sx={{ width: '100%' }}>
                    Registration confirmed! You will receive further details.
                </MuiAlert>
            </Snackbar>
        </Card>
    );
};


const FeaturedEvents = () => {
    return (
            <Container style={{ marginBottom: '20px' }}>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Typography variant="h4" gutterBottom>
                        Featured Events
                    </Typography>
                    <Button component="a" href="/EventPage" variant="contained" color="primary">
                        View All
                    </Button>
                </Stack>
                <Stack direction="row" spacing={3} justifyContent="space-between" alignItems="center">
                    {featuredEvents.map((event) => (
                        <EventCard key={event.id} event={event} />
                    ))}
                </Stack>
            </Container>
        );
};

const PopularTopics = () => {

    // Dummy data for popular topics
    const popularTopics = [
        {
            id: 1,
            topic: 'Web Development',
            route: '/WebDevelopment',
        },
        {
            id: 2,
            topic: 'Machine Learning',
            route: '/MachineLearning',

        },
        {
            id: 3,
            topic: 'Data Science',
            route: '/DataScience',

        },
        {
            id: 4,
            topic: 'UI/UX Design',
            route: '/UXDesign',
        },
        {
            id: 5,
            topic: 'FinTech',
            route: '/FinTech',
        },
        {
            id: 6,
            topic: 'Artificial Intelligence',
            route: '/AI',
        },
        // Add more topics as needed
    ];

    const handleButtonClick = (route) => {
        // Use React Router to navigate to the specified route
        window.location.href = route;
    };

    return (
        <Container style={{ marginBottom: '20px' }}>
            <Typography variant="h4" gutterBottom>
                Popular Topics
            </Typography>
            <Stack direction="row" spacing={3}>
                {popularTopics.map((topic) => (
                    <Button
                        key={topic.id}
                        variant="outlined"
                        color="primary"
                        style={{ width: '200px', textTransform: 'none' }}
                        onClick={() => handleButtonClick(topic.route)}
                    >
                        {topic.topic}
                    </Button>
                ))}
            </Stack>
        </Container>
    );
};
const featuredPosts = [
    {
        id: 1,
        username: 'JohnDoe',
        title: 'React Hooks Tutorial',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
        likes: 10,
        dislikes: 2,
        replies: [
            {
                id: 1,
                username: 'JaneSmith',
                content: 'Great tutorial!',
                likes: 5,
                dislikes: 0,
                replies: [
                    {
                        id: 1,
                        username: 'BobJohnson',
                        content: 'I learned a lot, thanks!',
                        likes: 2,
                        dislikes: 1,
                        replies: [],
                    },
                ],
            },
            // Add more replies as needed
        ],
    },
    // Add more posts as needed
];
const HomePage = () => {
    return (
        <>
            <FeaturedEvents />
            <PopularTopics />
            <Posts posts={featuredPosts} />;
        </>
    );
};

export default HomePage;
