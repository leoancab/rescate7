import BottomNav from "./BottomNav";
import { Webcam, SquarePen, CalendarDays } from "lucide-react";

function parseJwt(token) {
  try {
    const base64Payload = token.split('.')[1];          // extrae la segunda parte
    const payload = atob(base64Payload);               // decodifica Base64
    return JSON.parse(payload);                        // convierte a objeto JS
  } catch (e) {
    return null;                                      // retorna null si falla
  }
}

const token = localStorage.getItem("token");
const user = token ? parseJwt(token) : null;

const contenidoPorRol = {
  1: {
    cont1: <div>Admin Contenedor 1</div>,
    cont2: <div>Admin Contenedor 2</div>,
    cont3: <div>Admin Contenedor 3</div>,
  },
  2: {
    cont1: <div>Lider Iglesia Contenedor 1</div>,
    cont2: <div>Lider Iglesia Contenedor 2</div>,
    cont3: <div>Lider Iglesia Contenedor 3</div>,
  },
  3: {
    cont1: <div>Lider Grupo Contenedor 1</div>,
    cont2: <div>Lider Grupo Contenedor 2</div>,
    cont3: <div>Lider Grupo Contenedor 3</div>,
  },
  4: {
    cont1: <div>Miembro Contenedor 1</div>,
    cont2: <div>Miembro Contenedor 2</div>,
    cont3: <div>Miembro Contenedor 3</div>,
  },
  5: {
    cont1: <div>Prospecto Contenedor 1</div>,
    cont2: <div>Prospecto Contenedor 2</div>,
    cont3: <div>Prospecto Contenedor 3</div>,
  },
};

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
        {contenidoPorRol[user.role]?.cont1}
      </div>
      <div className="contenedor2dashboard">
        {contenidoPorRol[user.role]?.cont2}
      </div>
      <div className="contenedor3dashboard">
        {contenidoPorRol[user.role]?.cont3}
      </div>
      <BottomNav />
    </div>
  )
}

export default Dashboard