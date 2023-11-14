import { useState, useEffect } from "react"
import { useAuth } from "../AuthContext"
import { auth, db } from "../../backend/Firebase"
import { doc, setDoc } from "firebase/firestore"; 
import { onAuthStateChanged } from "firebase/auth"
import NavigationBar from "../components/NavigationBar"
import { useNavigate } from "react-router-dom"
import Button from "@mui/material/Button"
function Home() {
  const { currentUser } = useAuth()
  const navigate = useNavigate()


  const  handleSubmit = async () => {
    const userData = {
      FirstName: "test",
      LastName: "test2",
      email: "something@something.com",
      uid: currentUser.uid,
    };

    // Add user data to Firestore
    await setDoc(doc(db, "users", currentUser.uid), userData);
  }
  useEffect(() => {
    if(currentUser === null){
      console.log("no user")
      navigate("/")
    }
  });

  return (
<>
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
    </>
  );
}

export default Home;


