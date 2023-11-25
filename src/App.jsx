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
import TestHome from "./pages/TestHome.jsx";
import WebDevelopment from './pages/WebDevelopment.jsx';
import DataScience from './pages/TopicPages/DataScience.jsx';
import FinTech from './pages/TopicPages/FinTech.jsx';
import MachineLearning from './pages/TopicPages/MachineLearning.jsx';
import UXDesign from './pages/TopicPages/UXDesign.jsx';
import AI from './pages/TopicPages/AI.jsx';


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
        <Route path="/SignupMentor1" element={<SignupMentor1 />}/>
        <Route path="/SignupMentor2" element={<SignupMentor2 />}/>
        <Route path="/SignupMentor3" element={<SignupMentor3 />}/>
        <Route path="/SignupMentor4" element={<SignupMentor4 />}/>
        <Route path="/FindMentor" element={<FindMentor />}/>
        <Route path="/profile" element={<Profile />}/>
        <Route path="/EventPage" element={<EventPage />}/>
        <Route path="/ViewEventPage" element={<ViewEventPage />}/>
        <Route path="/TestHome" element={<TestHome />}/>
        <Route path="/WebDevelopment" element={<WebDevelopment />}/>
        <Route path="/DataScience" element={<DataScience />}/>
        <Route path="/FinTech" element={<FinTech />}/>
        <Route path="/MachineLearning" element={<MachineLearning />}/>
        <Route path="/UXDesign" element={<UXDesign />}/>
        <Route path="/AI" element={<AI />}/>


      </Routes>
      </AuthProvider>
    </BrowserRouter>
    </>
  )
}

export default App
