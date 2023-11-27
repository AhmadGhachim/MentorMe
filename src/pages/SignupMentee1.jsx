import React, { useState } from 'react';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import SignUpImage from '../assets/sign-up-side.jpg'
import { useAuth } from '../AuthContext';
import { useNavigate } from 'react-router-dom';
import { auth, db } from "../../backend/Firebase"
import { doc, setDoc } from "firebase/firestore";
export default function SignupForm() {

    
    const navigate = useNavigate()
    const { signup } = useAuth()
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleFirstName = (event) => {
        setFirstName(event.target.value)
    }

    const handleLastName = (event) => {
        setLastName(event.target.value)
    }
    const handleEmail = (event) => {
        setEmail(event.target.value)
    }
    const handlePassword = (event) => {
        setPassword(event.target.value)
    }

    const [currentStatus, setCurrentStatus] = useState([]);

    const handleStatusChange = (event, newStatus) => {
        setCurrentStatus(newStatus);
    };

    const handleSignUp = async (e) => {
        e.preventDefault();

        
        await signup(email, password)
        
        .then((userCredential) => {
            const userData = {
                firstName,
                lastName,
                email,
                currentStatus,
                user_type: "Mentee",
                uid: userCredential.user.uid,
              };
          
              // Add user data to Firestore
            setDoc(doc(db, "users", userCredential.user.uid), userData);
        }).
        
        then(navigate('/SignupMentee2'));
        
      };

    const theme = createTheme({
        palette: {
            background: {
                default: '#f5faff',
            },
        },
    });

    return (
        <ThemeProvider theme={theme}>
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
                        backgroundColor: '#f5faff',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                />
                <Grid item xs={12} sm={8} md={10} square>
                    <Box
                        sx={{
                            my: 25,
                            mx: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            backgroundColor: '#f5faff',
                        }}
                    >
                        <Typography component="h5" variant="h2" style={{ fontFamily: 'system-ui', color: '#016EEA', fontWeight: 'bold' }}>
                            Create Account
                        </Typography>
                        <form onSubmit={handleSignUp}>
                            <TextField
                                label="First Name"
                                variant="outlined"
                                fullWidth
                                onChange={handleFirstName}
                                margin="normal"
                                required
                            />
                            <TextField
                                label="Last Name"
                                variant="outlined"
                                fullWidth
                                onChange={handleLastName}
                                margin="normal"
                                required
                            />
                            <TextField
                                label="Email"
                                variant="outlined"
                                fullWidth
                                onChange={handleEmail}
                                margin="normal"
                                required
                            />
                            <TextField
                                label="Password"
                                type="password"
                                variant="outlined"
                                fullWidth
                                onChange={handlePassword}
                                margin="normal"
                                required
                            />
                            <Typography variant="h6" gutterBottom>
                                What describes you best currently?*
                            </Typography>
                            <ToggleButtonGroup
                                value={currentStatus}
                                onChange={handleStatusChange}
                                fullWidth
                                exclusive
                            >
                                <ToggleButton value="High School">
                                    High School
                                </ToggleButton>
                                <ToggleButton value="University/College">
                                    University/College
                                </ToggleButton>
                                <ToggleButton value="In Career">
                                    In Career
                                </ToggleButton>
                            </ToggleButtonGroup>
                            <Button
                                variant="contained"
                                color="primary"
                                fullWidth
                                sx={{ marginTop: 2 }}
                                type="submit"
                            >
                                Next
                            </Button>
                        </form>
                    </Box>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
}
