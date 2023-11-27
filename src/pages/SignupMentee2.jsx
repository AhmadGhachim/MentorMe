import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import SignUpImage from '../assets/sign-up-side.jpg'
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { useNavigate } from 'react-router-dom';
import { auth, db } from "../../backend/Firebase"
import { doc, updateDoc } from "firebase/firestore"; 
import { useAuth } from '../AuthContext';


export default function SignupForm() {
    const {currentUser} = useAuth()
    const navigate = useNavigate();
    const [educationLevel, setEducationLevel] = useState('');


    const handleEducationLevelChange = (event) => {
        setEducationLevel(event.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const userData = {
            educationLevel
          };

        await updateDoc(doc(db, "users", currentUser.uid), userData);
        navigate("/SignupMentee3")
    }

    const theme = createTheme({
        palette: {
            background: {
                default: '#f5faff',
            },
        },
    });

    return (
        // <ThemeProvider theme={theme}>
        //     <Grid container component="main" sx={{ height: '100vh' }}>
        //         <CssBaseline />
        //         <Grid
        //             item
        //             xs={false}
        //             sm={4}
        //             md={2}
        //             sx={{
        //                 backgroundImage: `url(${SignUpImage})`,
        //                 backgroundRepeat: 'no-repeat',
        //                 backgroundSize: 'cover',
        //                 backgroundPosition: 'center',
        //                 backgroundColor:'#f5faff',
        //             }}
        //         />
        //         <Grid item xs={12} sm={8} md={10} component={Paper} elevation={6} square>
        //             <Box
        //                 sx={{
        //                     my: 25,
        //                     mx: 4,
        //                     display: 'flex',
        //                     flexDirection: 'column',
        //                     alignItems: 'center',
        //                     backgroundColor:'#f5faff',
        //                 }}
        //             >
        //                 <Typography component="h5" variant="h2" style={{ fontFamily: 'system-ui', color: '#016EEA', fontWeight: 'bold', padding: '10px' }}>
        //                     Create Account
        //                 </Typography>
        //                 <form onSubmit={handleSubmit}>
        //                     <Typography variant="h6" gutterBottom>
        //                         What is your current level of study or your highest completed level of study?
        //                     </Typography>
        //                     <RadioGroup
        //                         value={educationLevel}
        //                         onChange={handleEducationLevelChange}
        //                     >
        //                         <FormControlLabel
        //                             value="No formal education"
        //                             control={<Radio />}
        //                             label="No formal education"
        //                         />
        //                         <FormControlLabel
        //                             value="Secondary education/high school"
        //                             control={<Radio />}
        //                             label="Secondary education/high school"
        //                         />
        //                         <FormControlLabel
        //                             value="Undergraduate / Bachelor’s Degree"
        //                             control={<Radio />}
        //                             label="Undergraduate / Bachelor’s Degree"
        //                         />
        //                         <FormControlLabel
        //                             value="Diploma"
        //                             control={<Radio />}
        //                             label="Diploma"
        //                         />
        //                         <FormControlLabel
        //                             value="Masters (Research)"
        //                             control={<Radio />}
        //                             label="Masters (Research)"
        //                         />
        //                         <FormControlLabel
        //                             value="Masters (Professional)"
        //                             control={<Radio />}
        //                             label="Masters (Professional)"
        //                         />
        //                         <FormControlLabel
        //                             value="Professional Doctorate"
        //                             control={<Radio />}
        //                             label="Professional Doctorate"
        //                         />
        //                         <FormControlLabel
        //                             value="Community Colleges / TAFE"
        //                             control={<Radio />}
        //                             label="Community Colleges / TAFE"
        //                         />
        //                         <FormControlLabel
        //                             value="Bootcamp"
        //                             control={<Radio />}
        //                             label="Bootcamp"
        //                         />
        //                         <FormControlLabel
        //                             value="Vocational qualification"
        //                             control={<Radio />}
        //                             label="Vocational qualification"
        //                         />
        //                     </RadioGroup>
        //
        //                     <Button
        //                         variant="contained"
        //                         color="primary"
        //                         fullWidth
        //                         sx={{ marginTop: 2 }}
        //                         type="submit"
        //                     >
        //                         Next
        //                     </Button>
        //                     <Typography
        //                         color="primary"
        //                         variant="subtitle1"
        //                         align="center"
        //                         sx={{ marginTop: 1 }}
        //                     >
        //                         <a href="/SignupMentee3">Skip</a>
        //                     </Typography>
        //                 </form>
        //             </Box>
        //         </Grid>
        //     </Grid>
        // </ThemeProvider>
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
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundColor: '#f5faff',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: '100%',
                    }}
                >
                </Grid>
                <Grid
                    item
                    xs={12}
                    sm={8}
                    md={10}
                    square
                    sx={{
                        my: 25,
                        mx: 'auto',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        backgroundColor: '#f5faff',
                        padding: '20px',
                        width: '80%', // Adjust the width as needed
                    }}
                >
                    <Typography component="h5" variant="h2" sx={{ fontFamily: 'system-ui', color: '#016EEA', fontWeight: 'bold', marginBottom: '30px' }}>
                        Create Account
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        <Typography variant="h6" gutterBottom>
                            What is your current level of study or your highest completed level of study?
                        </Typography>
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <RadioGroup value={educationLevel} onChange={handleEducationLevelChange}>
                                    <FormControlLabel value="No formal education" control={<Radio />} label="No formal education" />
                                    <FormControlLabel value="Secondary education/high school" control={<Radio />} label="Secondary education/high school" />
                                    <FormControlLabel value="Undergraduate / Bachelor’s Degree" control={<Radio />} label="Undergraduate / Bachelor’s Degree" />
                                    <FormControlLabel value="Diploma" control={<Radio />} label="Diploma" />
                                    <FormControlLabel value="Masters (Research)" control={<Radio />} label="Masters (Research)" />
                                </RadioGroup>
                            </Grid>
                            <Grid item xs={6}>
                                <RadioGroup value={educationLevel} onChange={handleEducationLevelChange}>
                                    <FormControlLabel value="Masters (Professional)" control={<Radio />} label="Masters (Professional)" />
                                    <FormControlLabel value="Professional Doctorate" control={<Radio />} label="Professional Doctorate" />
                                    <FormControlLabel value="Community Colleges / TAFE" control={<Radio />} label="Community Colleges / TAFE" />
                                    <FormControlLabel value="Bootcamp" control={<Radio />} label="Bootcamp" />
                                    <FormControlLabel value="Vocational qualification" control={<Radio />} label="Vocational qualification" />
                                </RadioGroup>
                            </Grid>
                        </Grid>
                        <Button variant="contained" color="primary" fullWidth sx={{ marginTop: 2 }} type="submit">
                            Next
                        </Button>
                        <Typography color="primary" variant="subtitle1" align="center" sx={{ marginTop: 1 }}>
                            <a href="/SignupMentee3">Skip</a>
                        </Typography>
                    </form>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
}
