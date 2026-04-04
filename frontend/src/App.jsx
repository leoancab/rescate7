import { BrowserRouter, Routes, Route } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Signin from "./pages/Signin"
import Tour from "./pages/Tour"
import Dashboard from "./pages/Dashboard"
import Test from "./pages/Test"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/tour" element={<Tour />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/test" element={<Test />} />
      </Routes>
      <ToastContainer limit={1} />
    </BrowserRouter>
  )
}

export default App