import { useState } from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import FormControlLabel from '@mui/material/FormControlLabel';
import CssBaseline from "@mui/material/CssBaseline";
import SignUpImage from "../assets/sign-up-side.jpg";
import RadioGroup from "@mui/material/RadioGroup";
import Radio from "@mui/material/Radio";
import { useNavigate } from 'react-router-dom';
import { auth, db } from "../../backend/Firebase"
import { doc, updateDoc } from "firebase/firestore"; 
import { useAuth } from '../AuthContext';



const theme = createTheme({
    palette: {
        background: {
            default: '#f5faff',
        },
    },
});

export default function SignupForm() {
    const {currentUser} = useAuth();
    const [educationLevel, setEducationLevel] = useState('');
    const navigate = useNavigate();


    const handleEducationLevelChange = (event) => {
        setEducationLevel(event.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const userData = {
            Major: educationLevel
          };

        await updateDoc(doc(db, "users", currentUser.uid), userData);
        navigate("/SignupMentee4");
    }

    return (

        <ThemeProvider theme={theme}>
            <Grid container component="main" sx={{ height: '100vh',  backgroundColor: '#f5faff' }}>
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
                        <Typography component="h5" variant="h2" style={{ fontFamily: 'system-ui', color: '#016EEA', fontWeight: 'bold', marginBottom: '30px' }}>
                            Create Account
                        </Typography>
                        <form onSubmit={handleSubmit}>
                            <Typography variant="h6" gutterBottom>
                                What is your major?
                            </Typography>
                            <Grid container spacing={2}>
                                <Grid item xs={12} md={6}>
                                    <RadioGroup
                                        value={educationLevel}
                                        onChange={handleEducationLevelChange}
                                    >
                                        <FormControlLabel
                                            value="Business"
                                            control={<Radio />}
                                            label="Business"
                                        />
                                        <FormControlLabel
                                            value="Finance"
                                            control={<Radio />}
                                            label="Finance"
                                        />
                                        <FormControlLabel
                                            value="Law"
                                            control={<Radio />}
                                            label="Law"
                                        />
                                        <FormControlLabel
                                            value="Health"
                                            control={<Radio />}
                                            label="Health"
                                        />
                                        <FormControlLabel
                                            value="Humanities"
                                            control={<Radio />}
                                            label="Humanities"
                                        />
                                    </RadioGroup>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <RadioGroup
                                        value={educationLevel}
                                        onChange={handleEducationLevelChange}
                                    >
                                        <FormControlLabel
                                            value="Computer Science / IT"
                                            control={<Radio />}
                                            label="Computer Science / IT"
                                        />
                                        <FormControlLabel
                                            value="Science"
                                            control={<Radio />}
                                            label="Science"
                                        />
                                        <FormControlLabel
                                            value="Engineering"
                                            control={<Radio />}
                                            label="Engineering"
                                        />
                                        <FormControlLabel
                                            value="Mathematics"
                                            control={<Radio />}
                                            label="Mathematics"
                                        />
                                        <FormControlLabel
                                            value="No major - I am a high school student"
                                            control={<Radio />}
                                            label="No major - I am a high school student"
                                        />
                                    </RadioGroup>
                                </Grid>
                            </Grid>

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
                                <a href="/SignupMentee4">Skip</a>
                            </Typography>
                        </form>
                    </Box>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
}
