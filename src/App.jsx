import SignInSide from './pages/SignInSide'
import Home from './pages/Home'
import Landing from './pages/Landing'
import Signup from './pages/Signup';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./AuthContext"
function App() {
  return (
    <>
    <BrowserRouter>
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Landing />}/>
        <Route path="/Signin" element={<SignInSide />}/>
        <Route path="/Home" element={<Home />}/>
        <Route path="/Signup" element={<Signup />}/>
        
      </Routes>
      </AuthProvider>
    </BrowserRouter>
    </>
  )
}

export default App
