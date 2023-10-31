import SignInSide from './pages/SignInSide'
import Home from './pages/Home'
import { BrowserRouter, Routes, Route } from "react-router-dom";
function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/SignIn" element={<SignInSide />}/>
        <Route path="/Home" element={<Home />}/>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
