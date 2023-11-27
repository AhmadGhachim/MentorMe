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


const UXDesign = () => {

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
            const parentDocumentRef = doc(db, 'posts', 'UIUX Design');

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
    

    let webDevelopmentPosts = [];

    
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

export default UXDesign;
