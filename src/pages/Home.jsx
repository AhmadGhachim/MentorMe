import { useState, useEffect } from "react"
import { useAuth } from "../AuthContext"
import { auth } from "../../backend/Firebase"
import { onAuthStateChanged } from "firebase/auth"
import NavigationBar from "../components/NavigationBar"
import { useNavigate } from "react-router-dom"
function Home() {
  const { currentUser } = useAuth()
  const navigate = useNavigate()
  
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
            <h1>Welcome to My Home Page, use {currentUser.email}</h1>
            <p>This is the home page of your React app.</p>
          </div>
        ) : (
          <p>Loading... Please wait or redirect if needed</p>
        )}
      </div>
    </>
  );
}

export default Home;


