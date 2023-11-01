import SignInSide from './pages/SignInSide'
import Home from './pages/Home'
import Landing from './pages/Landing'
import { BrowserRouter, Routes, Route } from "react-router-dom";
function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/SignIn" element={<SignInSide />}/>
        <Route path="/Home" element={<Home />}/>
        <Route path="/" element={<Landing />}/>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
