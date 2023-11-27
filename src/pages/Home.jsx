import { useState, useEffect } from "react"
import { useAuth } from "../AuthContext"
import { auth, db } from "../../backend/Firebase"
import { doc, updateDoc } from "firebase/firestore"; 
import { onAuthStateChanged } from "firebase/auth"
import NavigationBar from "../components/NavigationBar"
import { useNavigate } from "react-router-dom"
import Button from "@mui/material/Button"
import {createTheme, ThemeProvider} from "@mui/material/styles";
function Home() {
  const { currentUser } = useAuth()
  const navigate = useNavigate()


  const  handleSubmit = async () => {
    const userData = {
      education: "no formal education"
    };

    // Add user data to Firestore
    await updateDoc(doc(db, "users", currentUser.uid), userData);
  }
  useEffect(() => {
    if(currentUser === null){
      console.log("no user")
      navigate("/")
    }
  });
  const theme = createTheme({
    palette: {
      background: {
        default: '#f5faff',
      },
    },
  });

  return (
<>
  <ThemeProvider theme={theme}>
      <NavigationBar />
      <div>
        {currentUser ? (
          <div>
            <h1>Welcome to My Home Page, user {currentUser.email}</h1>
            <p>This is the home page of your React app.</p>
          </div>
        ) : (
          <p>Loading... Please wait or redirect if needed</p>
        )}
      </div>
      <Button onClick={handleSubmit}>Test</Button>
  </ThemeProvider>
</>
  );
}

export default Home;


