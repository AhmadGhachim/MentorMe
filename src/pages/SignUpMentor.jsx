import { useState } from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import SignUpImage from '../assets/sign-up-side.jpg'


const defaultTheme = createTheme();

export default function SignupMentor() {
    const [educationLevel, setEducationLevel] = useState('');



    const handleEducationLevelChange = (event) => {
        setEducationLevel(event.target.value);
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
                        <form>

                            <TextField
        label="First Name"
        variant="outlined"
        fullWidth
        margin="normal"
        value={''}
        onChange={(e) => setFirstName(e.target.value)}
      />
      <TextField
        label="Last Name"
        variant="outlined"
        fullWidth
        margin="normal"
        value={''}
        onChange={(e) => setLastName(e.target.value)}
      />
      <TextField
        label="Email"
        type="email"
        variant="outlined"
        fullWidth
        margin="normal"
        value={''}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        label="Password"
        type="password"
        variant="outlined"
        fullWidth
        margin="normal"
        value={''}
        onChange={(e) => setPassword(e.target.value)}
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
                                <a href="#skip">Skip</a>
                            </Typography>
                        </form>
                    </Box>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
}
