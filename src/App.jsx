import SignInSide from './pages/SignInSide'
import SignupMentee1 from './pages/SignupMentee1'
import SignupMentee2 from './pages/SignupMentee2'
import SignupMentee3 from './pages/SignupMentee3'
import SignupMentee4 from './pages/SignupMentee4'
import SignupMentor1 from './pages/SignupMentor1'
import SignupMentor2 from './pages/SignupMentor2'
import SignupMentor3 from './pages/SignupMentor3'
import SignupMentor4 from './pages/SignupMentor4'
import Home from './pages/Home'
import Landing from './pages/Landing'
import Signup from './pages/Signup';
import FindMentor from "./pages/FindMentor.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./AuthContext"
import Profile from './pages/ProfilePage'
import EventPage from './pages/EventsPage.jsx'
import ViewEventPage from "./pages/ViewEventPage.jsx";
import LandingMUI from './pages/LandingMUI';
import ErrorPage from './pages/Error';


function App() {
  return (
    <>
    <BrowserRouter>
    <AuthProvider>
      <Routes>
        <Route path="/" element={<LandingMUI />}/>
        {/* <Route path="/landing" element={<Landing />}/> */}
        <Route path="/Signin" element={<SignInSide />}/>
        <Route path="/Home" element={<Home />}/>
        <Route path="/Signup" element={<Signup />}/>
        <Route path="/SignupMentee4" element={<SignupMentee4 />}/>
        <Route path="/SignupMentee3" element={<SignupMentee3 />}/>
        <Route path="/SignupMentee2" element={<SignupMentee2 />}/>
        <Route path="/SignupMentee1" element={<SignupMentee1 />}/>
        <Route path="/SignupMentor1" element={<SignupMentor1 />}/>
        <Route path="/SignupMentor2" element={<SignupMentor2 />}/>
        <Route path="/SignupMentor3" element={<SignupMentor3 />}/>
        <Route path="/SignupMentor4" element={<SignupMentor4 />}/>
        <Route path="/FindMentor" element={<FindMentor />}/>
        <Route path="/profile" element={<Profile />}/>
        <Route path="/EventPage" element={<EventPage />}/>
        <Route path="ViewEventPage/:id" element={<ViewEventPage />}/>
        <Route path='/profile/:id' element={<Profile/>} />
        <Route path='*' element={<ErrorPage />}/>
      </Routes>
      </AuthProvider>
    </BrowserRouter>
    </>
  )
}

export default App
