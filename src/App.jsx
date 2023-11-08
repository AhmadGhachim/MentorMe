import SignInSide from './pages/SignInSide'
import SignupMentee1 from './pages/SignupMentee1'
import SignupMentee2 from './pages/SignupMentee2'
import SignupMentee3 from './pages/SignupMentee3'
import SignupMentee4 from './pages/SignupMentee4'
import SignupMentor from './pages/SignUpMentor'
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
        <Route path="/SignupMentee4" element={<SignupMentee4 />}/>
        <Route path="/SignupMentee3" element={<SignupMentee3 />}/>
        <Route path="/SignupMentee2" element={<SignupMentee2 />}/>
        <Route path="/SignupMentee1" element={<SignupMentee1 />}/>
        <Route path="/SignupMentor" element={<SignupMentor />}/>
      </Routes>
      </AuthProvider>
    </BrowserRouter>
    </>
  )
}

export default App
