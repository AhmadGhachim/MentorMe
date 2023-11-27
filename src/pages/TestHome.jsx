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
    const theme = createTheme();
    // replace with blank (loading) screen until userData is set
    if ( !userType ) {
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
        <>
        
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
        </>
    );
};

export default HomePage;
