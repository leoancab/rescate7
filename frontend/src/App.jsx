import { BrowserRouter, Routes, Route } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import Login from "./pages/Login"
import Home from "./pages/Home"
import Signin from "./pages/Signin"
import Tour from "./pages/Tour"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/tour" element={<Tour />} />
      </Routes>
      <ToastContainer limit={1} />
    </BrowserRouter>
  )
}

export default App