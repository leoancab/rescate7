import BottomNav from "./BottomNav";
import { Webcam, SquarePen, CalendarDays } from "lucide-react";

function Dashboard() {
  //const { user } = useAuth()
  //console.log(user)
  return (
    <div className="dashboardfondo">
      <div className="dashboardhead">
        <div className="logohead">
          <img
            src="/logo.png"
            alt="Rescate7"
            className="logoLogIn"
          />
        </div>
        <div className="opchead">
          <div className="item">
            <Webcam size={48} />
            Visitas
          </div>
          <div className="item">
            <SquarePen size={48} />
            Blog
          </div>
          <div className="item">
            <CalendarDays size={48} />
            Agenda
          </div>
        </div>
      </div>
      <div className="contenedor1dashboard">
        <div>

        </div>
      </div>
      <div className="contenedor2dashboard">

      </div>
      <div className="contenedor3dashboard">

      </div>
      <BottomNav />
    </div>
  )
}

export default Dashboard