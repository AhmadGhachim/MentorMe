import React, {useState, useEffect} from 'react';
import Posts from '../components/Post.jsx'
import CreatePost from '../components/CreatePost.jsx'
import FeaturedEvents from "../components/FeaturedEvents.jsx";
import TopicsHome from "../components/TopicsHome.jsx";
import Container from "@mui/material/Container"
import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, createTheme, useTheme} from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import NavBarMentee from "../components/NavBarHomeMentee.jsx";
import NavBarMentor from "../components/NavBarHomeMentor.jsx";
import {useAuth} from '../AuthContext.jsx'
import {auth, db} from '../../backend/Firebase.js'
import {getDoc, doc } from "firebase/firestore";
import { useNavigate } from 'react-router-dom';
import Footer from "../components/Footer.jsx";


const featuredPosts = [
    // Post 1
    {
        id: 3,
        username: 'DataScienceExplorer 🎓',
        title: 'Introduction to Data Science',
        content: 'Delving into the world of data science, its methodologies, and the impact it has on business decisions. Let\'s discuss!',
        likes: 30,
        dislikes: 5,
        replies: [
            {
                id: 1,
                username: 'AnalyticsGuru',
                content: 'Data science is transforming industries. Exciting times ahead!',
                likes: 20,
                dislikes: 3,
                replies: [
                    {
                        id: 1,
                        username: 'TechInnovator🎓',
                        content: 'Absolutely! The insights gained from data can drive innovation.',
                        likes: 10,
                        dislikes: 1,
                        replies: [],
                    },
                ],
            },
        ],
    },

    // Post 2
    {
        id: 4,
        username: 'JavaScriptNinja',
        title: 'Mastering JavaScript Promises',
        content: 'A deep dive into JavaScript promises, asynchronous programming, and how to handle them effectively in your projects.',
        likes: 15,
        dislikes: 2,
        replies: [
            {
                id: 1,
                username: 'CodeNewcomer',
                content: 'Promises have always confused me. Thanks for breaking it down!',
                likes: 8,
                dislikes: 0,
                replies: [
                    {
                        id: 1,
                        username: 'FrontendDev 🎓',
                        content: 'Once you grasp promises, your async code becomes much cleaner!',
                        likes: 5,
                        dislikes: 1,
                        replies: [],
                    },
                ],
            },
        ],
    },

    // Post 3
    {
        id: 5,
        username: 'CyberSecurityPro',
        title: 'The Evolving Landscape of Cybersecurity',
        content: 'Discussing the latest trends in cybersecurity, challenges faced, and strategies to protect against emerging threats.',
        likes: 25,
        dislikes: 4,
        replies: [
            {
                id: 1,
                username: 'SecureCoders',
                content: 'Cybersecurity is crucial in today\'s digital age. What measures do you find most effective?',
                likes: 18,
                dislikes: 2,
                replies: [
                    {
                        id: 1,
                        username: 'InfoSecEnthusiast',
                        content: 'Regular training and staying updated on new threats are key!',
                        likes: 7,
                        dislikes: 0,
                        replies: [],
                    },
                ],
            },
        ],
    },

    // Post 4
    {
        id: 6,
        username: 'AIResearcher 🎓',
        title: 'Advancements in Natural Language Processing',
        content: 'Exploring recent breakthroughs in Natural Language Processing (NLP) and their applications in AI research.',
        likes: 22,
        dislikes: 3,
        replies: [
            {
                id: 1,
                username: 'NLPLover',
                content: 'NLP is fascinating! Have you worked on any specific NLP projects?',
                likes: 15,
                dislikes: 2,
                replies: [
                    {
                        id: 1,
                        username: 'AIDeveloper',
                        content: 'Currently working on sentiment analysis. NLP has endless possibilities!',
                        likes: 7,
                        dislikes: 0,
                        replies: [],
                    },
                ],
            },
        ],
    },

    // Post 5
    {
        id: 7,
        username: 'FullStackDeveloper',
        title: 'Building a Full-Stack Application from Scratch',
        content: 'Sharing the journey of building a full-stack application, including frontend, backend, and database considerations.',
        likes: 28,
        dislikes: 6,
        replies: [
            {
                id: 1,
                username: 'CodeEnthusiast',
                content: 'Full-stack development is challenging but rewarding. Any tips for beginners?',
                likes: 20,
                dislikes: 3,
                replies: [
                    {
                        id: 1,
                        username: 'TechExplorer',
                        content: 'Start with small projects and gradually expand your skills. Don\'t hesitate to ask for help!',
                        likes: 8,
                        dislikes: 0,
                        replies: [],
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

const HomePage = () => {
    const {currentUser} = useAuth();

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

    
    const isMobile = useMediaQuery(useTheme().breakpoints.down('md'));

    // replace with blank (loading) screen until userData is set
    if ( !userType ) {
        // Render a loading state
        return (
            <>
                <ThemeProvider theme={theme}>
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

    console.log(userType)

    return (
        <>
            <ThemeProvider theme={theme}>
                {userType === 'Mentor' ? (
                    <NavBarMentor/>
                    ) : (
                    <NavBarMentee/>
                )}
                <Container style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop:75 }}>
                    <FeaturedEvents />
                    <TopicsHome />
                    <Posts posts={featuredPosts} />
                    <CreatePost/>
                    </Container>
                <Footer />
            </ThemeProvider>
        </>
    );
};

export default HomePage;
