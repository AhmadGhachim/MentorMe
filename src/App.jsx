
import SignInSide from './pages/SignInSide'
import { BrowserRouter, Routes, Route } from "react-router-dom";
function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/SignIn" element={<SignInSide />}>
        </Route>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
