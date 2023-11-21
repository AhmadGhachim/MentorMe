import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useAuth } from '../AuthContext';
import {useNavigate } from 'react-router-dom'
import SignUpImage from '../assets/sign-up-side.jpg'
import {useState} from 'react'
import {auth, db} from '../../backend/Firebase'
import { doc, updateDoc } from "firebase/firestore"; 

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function SignupMentor4() {
  
  const {currentUser} = useAuth();
  const navigate = useNavigate()
  const [experience, setExperience] = useState();

const handleExperience = (event) => {
  // Use parseInt to convert the string to a number
  setExperience(parseInt(event.target.value, 10));
}

   const handleSubmit = async (e) => {
    e.preventDefault();
        const userData = {
          years_mentored: experience
        }

        // Add user data to Firestore
    await updateDoc(doc(db, "users", currentUser.uid), userData);
    navigate("/Home")
  }

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}  //control no. of columns on a small sized screen
          md={2}  //control the number of columns on a medium sized screen
          sx={{
            backgroundImage: `url(${SignUpImage})`,
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={10} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 25,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Typography component="h5" variant="h2" style={{ fontFamily: 'system-ui', color:'#016EEA',  fontWeight: 'bold' }}>
              Create Account
            </Typography>
            <Typography component="h2" variant="h4" sx={{ mt: 4 }} style={{ fontFamily: 'system-ui' }}>
              How many years of experience do you in mentoring?
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 8 }}>
             <TextField
                label="Years of Experience Mentoring"
                variant="outlined"
                fullWidth
                margin="normal"
                onChange={handleExperience}/>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 10, mb: 2 }}
              >
                Finish
              </Button>
              
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}