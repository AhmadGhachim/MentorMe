import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import FormControlLabel from '@mui/material/FormControlLabel';
import CssBaseline from "@mui/material/CssBaseline";
import SignUpImage from "../assets/sign-up-side.jpg";
import FormControl from '@mui/material/FormControl';
import Checkbox from '@mui/material/Checkbox';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import { useNavigate } from 'react-router-dom';
import { auth, db } from "../../backend/Firebase"
import { doc, updateDoc } from "firebase/firestore"; 
import { useAuth } from '../AuthContext';


const defaultTheme = createTheme();


export default function IndustryExperience() {
    const {currentUser} = useAuth();
    const navigate = useNavigate();
    const [selectedIndustry, setSelectedIndustry] = useState('');
    const [hasWorkExperience, setHasWorkExperience] = useState(false);
    const [companyName, setCompanyName] = useState('');
    const [roleWorked, setRoleWorked] = useState('');

    const handleIndustryChange = (event) => {
        setSelectedIndustry(event.target.value);
    };

    const handleExperienceChange = (event) => {
        setHasWorkExperience(event.target.checked);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        let userData = {};

        if(hasWorkExperience){
            userData = {
                Industry: selectedIndustry,
                hasWorkExperience,
                companyName,
                roleWorked
            };
        }
        else{
            userData = {
                Industry: selectedIndustry
            }
        }

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
                        <Typography component="h5" variant="h4" style={{ fontFamily: 'system-ui', color: '#016EEA', fontWeight: 'bold' }}>
                            Industry and Work Experience
                        </Typography>
                        <form>
                            <FormControl sx={{ width: '100%', my: 2 }}>
                                <InputLabel htmlFor="industry-select">What Industry are you interested in?</InputLabel>
                                <Select
                                    value={selectedIndustry}
                                    onChange={handleIndustryChange}
                                    inputProps={{
                                        name: 'industry',
                                        id: 'industry-select',
                                    }}
                                >
                                    <MenuItem value="Finance">Finance</MenuItem>
                                    <MenuItem value="Consulting">Buisness Consulting</MenuItem>
                                    <MenuItem value="Sales">Sales</MenuItem>
                                    <MenuItem value="Marketing">Marketing</MenuItem>
                                    <MenuItem value="Analytics">Data Analytics & Science</MenuItem>
                                    <MenuItem value="Software">Software Engineering</MenuItem>
                                    <MenuItem value="Design">Product Design</MenuItem>
                                    <MenuItem value="Management">Buisness Management</MenuItem>
                                    <MenuItem value="Operations">Operations</MenuItem>
                                    <MenuItem value="Logistics">Logistics</MenuItem>
                                    <MenuItem value="Technology">Systems Admininstration</MenuItem>
                                    <MenuItem value="Healthcare">Healthcare</MenuItem>
                                    {/* Add more industry options here */}
                                </Select>
                            </FormControl>

                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={hasWorkExperience}
                                        onChange={handleExperienceChange}
                                        name="experience"
                                    />
                                }
                                label="Do you have any work experience in the industry you are interested in?"
                            />

                            {hasWorkExperience && (
                                <div>
                                    <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="companyName"
                                        label="Name of the Company"
                                        name="companyName"
                                        value={companyName}
                                        onChange={(e) => setCompanyName(e.target.value)}
                                    />
                                    <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="roleWorked"
                                        label="Role Worked"
                                        name="roleWorked"
                                        value={roleWorked}
                                        onChange={(e) => setRoleWorked(e.target.value)}
                                    />
                                </div>
                            )}

                            <Button
                                variant="contained"
                                color="primary"
                                fullWidth
                                sx={{ marginTop: 2 }}
                                onClick={handleSubmit}
                            >
                                Create Account
                            </Button>
                            <Typography
                                color="primary"
                                variant="subtitle1"
                                align="center"
                                sx={{ marginTop: 1 }}
                            >
                                <a href="/Home">Skip</a>
                            </Typography>
                        </form>
                    </Box>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
}
