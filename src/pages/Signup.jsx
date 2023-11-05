import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useAuth } from '../AuthContext';
import {useNavigate } from 'react-router-dom'
import SignUpImage from '../assets/sign-up-side.jpg'
import {useState} from 'react'


// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function Signup() {

  const navigate = useNavigate()
  const { login } = useAuth()

  const [selected, setSelected] = useState(null);

  const handleBoxClick = (boxName) => {
    setSelected(boxName === selected ? null : boxName);
  };
  
  async function handleSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });


    await login(data.get('email'), data.get('password')).then(navigate("/Home"))

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
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <div>
                <Box
                  display="inline-block"
                  width="50%"
                  padding={4}
                  border={selected === 'Mentee' ? '3px solid #2196F3' : '3px solid #000'}
                  borderRadius={4}
                  textAlign="center"
                  onClick={() => handleBoxClick('Mentee')}
                  style={{ cursor: 'pointer'}}
                >
                  <Typography variant="h6">Mentee</Typography>
                </Box>
                <Box
                  display="inline-block"
                  width="50%"
                  padding={4}
                  border={selected === 'Mentor' ? '3px solid #2196F3' : '3px solid #000'}
                  borderRadius={4}
                  textAlign="center"
                  onClick={() => handleBoxClick('Mentor')}
                  style={{ cursor: 'pointer' }}
                >
                  <Typography variant="h6">Mentor</Typography>
                </Box>
              </div>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Continue
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}