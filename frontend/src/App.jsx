import { BrowserRouter, Routes, Route } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Signin from "./pages/Signin"
import Tour from "./pages/Tour"
import Dashboard from "./pages/Dashboard"
import Test from "./pages/Test"
import Encuesta from "./pages/Encuesta"
import Iglesia from "./pages/Iglesia"
import Profile from "./pages/Profile"
import Management from "./pages/Management"
import RequestVisit from "./pages/RequestVisit"
import PrayerRequest from "./pages/PrayerRequest"
import ScheduleVisit from "./pages/ScheduleVisit"
import Testimony from "./pages/Testimony"
import Friendships from "./pages/Friendships"
import Counseling from "./pages/Counseling"
import ChatRoom from "./pages/ChatRoom"
import Group from "./pages/Group"

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
        <Route path="/encuesta" element={<Encuesta />} />
        <Route path="/mi-iglesia" element={<Iglesia />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/management" element={<Management />} />
        <Route path="/management/request-visit" element={<RequestVisit />} />
        <Route path="/management/prayer-request" element={<PrayerRequest />} />
        <Route path="/management/schedule-visit" element={<ScheduleVisit />} />
        <Route path="/management/testimony" element={<Testimony />} />
        <Route path="/management/friendship" element={<Friendships />} />
        <Route path="/counseling" element={<Counseling />} />
        <Route path="/call/:roomId" element={<ChatRoom />} />
        <Route path="/group" element={<Group />} />
      </Routes>
      <ToastContainer limit={1} />
    </BrowserRouter>
  )
}

export default App