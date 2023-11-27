import React from 'react';
import Posts from '../components/Post.jsx'
import NavBar from '../components/NavBarProfileMentee.jsx'
import Footer from '../components/Footer.jsx'
import Container from "@mui/material/Container";
import {createTheme, ThemeProvider} from "@mui/material/styles";
const WebDevelopment = () => {

    const webDevelopmentPosts = [
        {
            id: 1,
            username: 'FrontEndDev',
            title: 'Introduction to React.js',
            content: 'React.js is a JavaScript library for building user interfaces...',
            likes: 15,
            dislikes: 3,
            replies: [
                {
                    id: 1,
                    username: 'ReactFan123',
                    content: 'I love React! It makes UI development so much easier.',
                    likes: 8,
                    dislikes: 1,
                    replies: [
                        {
                            id: 1,
                            username: 'ReduxMaster',
                            content: 'Do you use Redux with React?',
                            likes: 3,
                            dislikes: 0,
                            replies: [
                                {
                                    id: 1,
                                    username: 'ReactRookie',
                                    content: 'What is Redux? I just started learning React.',
                                    likes: 1,
                                    dislikes: 0,
                                    replies: [],
                                },
                            ],
                        },
                    ],
                },
                {
                    id: 2,
                    username: 'VueEnthusiast',
                    content: 'How does React compare to Vue.js?',
                    likes: 5,
                    dislikes: 2,
                    replies: [
                        {
                            id: 1,
                            username: 'ReactLover',
                            content: 'React and Vue both have their strengths, but I prefer React.',
                            likes: 2,
                            dislikes: 1,
                            replies: [],
                        },
                    ],
                },
            ],
        },
        {
            id: 2,
            username: 'BackEndDev',
            title: 'Node.js RESTful API Tutorial',
            content: 'Learn how to build a RESTful API with Node.js and Express...',
            likes: 12,
            dislikes: 1,
            replies: [
                {
                    id: 1,
                    username: 'ExpressUser',
                    content: 'Express.js is awesome for building APIs!',
                    likes: 6,
                    dislikes: 0,
                    replies: [
                        {
                            id: 1,
                            username: 'MongoDBDev',
                            content: 'Are you using MongoDB as the database?',
                            likes: 3,
                            dislikes: 0,
                            replies: [
                                {
                                    id: 1,
                                    username: 'SQLFan',
                                    content: 'I prefer SQL databases. What about you?',
                                    likes: 2,
                                    dislikes: 1,
                                    replies: [],
                                },
                            ],
                        },
                    ],
                },
            ],
        },
        {
            id: 3,
            username: 'BackEndDev',
            title: 'Node.js RESTful API Tutorial',
            content: 'Learn how to build a RESTful API with Node.js and Express...',
            likes: 12,
            dislikes: 1,
            replies: [
                {
                    id: 1,
                    username: 'ExpressUser',
                    content: 'Express.js is awesome for building APIs!',
                    likes: 6,
                    dislikes: 0,
                    replies: [
                        {
                            id: 1,
                            username: 'MongoDBDev',
                            content: 'Are you using MongoDB as the database?',
                            likes: 3,
                            dislikes: 0,
                            replies: [
                                {
                                    id: 1,
                                    username: 'SQLFan',
                                    content: 'I prefer SQL databases. What about you?',
                                    likes: 2,
                                    dislikes: 1,
                                    replies: [],
                                },
                            ],
                        },
                    ],
                },
            ],
        },
        {
            id: 4,
            username: 'TechNewsJunkie',
            title: 'Latest Developments in Tech',
            content: 'Stay updated on the latest trends, tools, and technologies in the tech world.',
            likes: 30,
            dislikes: 3,
            replies: [
                {
                    id: 1,
                    username: 'TechExplorer',
                    content: 'What emerging technologies are you most excited about?',
                    likes: 15,
                    dislikes: 1,
                    replies: [
                        {
                            id: 1,
                            username: 'FutureTech',
                            content: 'AI and blockchain have incredible potential. The future is exciting!',
                            likes: 8,
                            dislikes: 0,
                            replies: [
                                {
                                    id: 1,
                                    username: 'InnovationGeek',
                                    content: 'How can I stay ahead in terms of learning new technologies?',
                                    likes: 4,
                                    dislikes: 0,
                                    replies: [],
                                },
                            ],
                        },
                    ],
                },
            ],
        },
        // Add more posts as needed
    ];
    const theme = createTheme({
        palette: {
            background: {
                default: '#f5faff',
            },
        },
    });


    return (

        <ThemeProvider theme={theme}>
            <NavBar />
            <Container style={{ paddingTop: '100px' }}>
                <div>
                    <Posts posts={webDevelopmentPosts} />;
                </div>
            </Container>
            <Footer />
        </ThemeProvider>
    );
};

export default WebDevelopment;
