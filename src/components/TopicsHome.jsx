import React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

const PopularTopics = () => {
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

export default PopularTopics;
