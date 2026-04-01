import BottomNav from "./BottomNav";
function Dashboard() {
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
            <img src="/visitasweb.png" />
            Visitas
          </div>
          <div className="item">
            <img src="/blog.png" />
            Blog
          </div>
          <div className="item">
            <img src="/agenda.png" />
            Agenda
          </div>
        </div>
      </div>
      <div className="profiledashboard">
        <div>

        </div>
      </div>
      <div className="gestiondashboard">

      </div>
      <BottomNav />
    </div>
  )
}

export default Dashboard