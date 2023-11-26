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
import CreatePost from '../components/CreatePost.jsx'
import FeaturedEvents from "../components/FeaturedEvents.jsx";
import TopicsHome from "../components/TopicsHome.jsx";

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
            <TopicsHome />
            <Posts posts={featuredPosts} />;
            <CreatePost/>
        </>
    );
};

export default HomePage;
