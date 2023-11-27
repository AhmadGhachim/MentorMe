import React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

const PopularTopics = ({ topics }) => {
    return (
        <Container style={{ marginBottom: '20px' }}>
            <Typography variant="h4" gutterBottom>
                Popular Topics
            </Typography>
            <Stack direction="row" spacing={3}>
                {topics.map((topic) => (
                    <Button
                        key={topic.id}
                        href={`/topics/${topic.id}`}
                        variant="outlined"
                        color="primary"
                        style={{ width: '200px', textTransform: 'none' }}
                    >
                        {topic.topic}
                    </Button>
                ))}
            </Stack>
        </Container>
    );
};

export default PopularTopics;
