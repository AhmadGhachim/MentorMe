import { useState } from 'react';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import SignUpImage from '../assets/sign-up-side.jpg'
import { useAuth } from '../AuthContext';
import { useNavigate } from 'react-router-dom';
import {auth, db} from '../../backend/Firebase'
import { doc, updateDoc } from "firebase/firestore"; 

const defaultTheme = createTheme();

export default function SignupMentor3() {
    const {currentUser} = useAuth();
    const navigate = useNavigate()
    const [employer, setEmployer] = useState('');
    const [position, setPosition] = useState('');
    const [experience, setExperience] = useState('');
    const [industry, setIndustry] = useState('');

    const handleEmployer = (event) => {
        setEmployer(event.target.value)
    }

    const handlePosition = (event) => {
        setPosition(event.target.value)
    }
    const handleExperience = (event) => {
        // Use parseInt to convert the string to a number
        setExperience(parseInt(event.target.value, 10));
      }
    const handleIndustry = (event) => {
        setIndustry(event.target.value)
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        const userData = {
            employer,
            position,
            experience,
            industry
        }

        // Add user data to Firestore
        await updateDoc(doc(db, "users", currentUser.uid), userData);
        console.log([employer, position, experience, industry])
        navigate("/SignupMentor4")
      };

    return (
        <ThemeProvider theme={defaultTheme}>
            <Grid container component="main" sx={{ height: '100vh' }}>
                <CssBaseline />
                <Grid
                    item
                    xs={false}
                    sm={4}
                    md={2}
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
                        <Typography component="h5" variant="h2" style={{ fontFamily: 'system-ui', color: '#016EEA', fontWeight: 'bold' }}>
                            Create Account
                        </Typography>
                        <form onSubmit={handleSubmit}>
                            <TextField
                                label="Current Employer"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                onChange={handleEmployer}
                                
                            />
                            <TextField
                                label="Position"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                onChange={handlePosition}
                                
                            />
                
                            <TextField
                                label="Industry"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                onChange={handleIndustry}
                            />        

                            <TextField
                                label="Years of Experience in Industry"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                onChange={handleExperience}
                            />
                            
                            <Button
                            
                                variant="contained"
                                color="primary"
                                fullWidth
                                sx={{ marginTop: 2 }}
                                type="submit"
                            >
                                Next
                            </Button>
                            <Typography
                                color="primary"
                                variant="subtitle1"
                                align="center"
                                sx={{ marginTop: 1 }}
                            >
                            <a href="/SignupMentor4">Skip</a>
                            </Typography>
                        </form>
                    </Box>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
}
