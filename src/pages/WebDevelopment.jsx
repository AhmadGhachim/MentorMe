import React, {useState, useEffect} from 'react';
import Posts from '../components/Post.jsx'
import NavBarProfileMentee from "../components/NavBarProfileMentee.jsx";
import NavBarProfileMentor from "../components/NavBarProfileMentor.jsx";
import Footer from '../components/Footer.jsx'
import Container from "@mui/material/Container";
import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress';
import CssBaseline from '@mui/material/CssBaseline';
import useMediaQuery from '@mui/material/useMediaQuery';
import { ThemeProvider, createTheme, useTheme} from '@mui/material/styles';
import CreatePostButton from '../components/CreatePost.jsx';
import { useNavigate } from 'react-router-dom';
import {useAuth} from '../AuthContext.jsx'
import {auth, db} from '../../backend/Firebase.js'
import { collection, getDocs, getDoc, doc, addDoc } from "firebase/firestore";


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


const WebDevelopment = () => {

    const {currentUser} = useAuth(); // null if user is not logged in
    const [userType, setUserType] = useState();
    const navigate = useNavigate();

    const [posts, setPosts] = useState();

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

    useEffect(() => {
        async function fetchEvents() {
            const parentDocumentRef = doc(db, 'posts', 'Web Development');

            // Reference to the subcollection
            const subcollectionRef = collection(parentDocumentRef, 'user_posts');
            
            // Get documents from the subcollection
            const querySnapshot = await getDocs(subcollectionRef);
            
            let postArray = []
            // Loop through the documents
            querySnapshot.forEach((doc) => {
                postArray.push(doc.data())
                webDevelopmentPosts.push(doc.data())
              //console.log(doc.id, ' => ', doc.data());
            });
        
        //postArray = postArray.concat(webDevelopmentPosts)
        setPosts(postArray)

        console.log(postArray)
        }
        
        fetchEvents();
        
    }, []);
    

    let webDevelopmentPosts = [
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
        }
        
        // Add more posts as needed
    ];
    const theme = createTheme({
        palette: {
            background: {
                default: '#f5faff', // Set your desired background color here
            },
        },
    });

    const isMobile = useMediaQuery(useTheme().breakpoints.down('md'));
    // replace with blank (loading) screen until userData is set
    if (!posts || !userType ) {
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
            <Container style={{ paddingTop: '100px' }}>
                <div>
                <Posts posts={webDevelopmentPosts.concat(posts)} />;
                </div>
            </Container>
            <CreatePostButton/>
            <Footer />
        </ThemeProvider>
    );
};

export default WebDevelopment;
