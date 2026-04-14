import BottomNav from "./BottomNav";
import { Webcam, SquarePen, CalendarDays } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function parseJwt(token) {
  try {
    const base64Payload = token.split('.')[1];
    const payload = atob(base64Payload);
    return JSON.parse(payload);
  } catch (e) {
    return null;
  }
}

const contenidoPorRol = {
  admin: {
    cont1: (user) => (<div className="admincont1"><img src="/defaultprofile.png" />{user.nom_usuario}<br />Miembro de {user.nom_iglesia}<br />Grupo {user.nom_grupo}</div>),
    cont2: <div>Admin Contenedor 2</div>,
    cont3: <div>Admin Contenedor 3</div>,
  },
  liderIglesia: {
    cont1: (user) => (<div className="admincont1"><img src="/defaultprofile.png" />{user.nom_usuario}<br />Miembro de {user.nom_iglesia}<br />Grupo {user.nom_grupo}</div>),
    cont2: <div>Lider Iglesia Contenedor 2</div>,
    cont3: <div>Lider Iglesia Contenedor 3</div>,
  },
  liderGrupo: {
    cont1: (user) => (<div className="admincont1"><img src="/defaultprofile.png" />{user.nom_usuario}<br />Miembro de {user.nom_iglesia}<br />Grupo {user.nom_grupo}</div>),
    cont2: <div>Lider Grupo Contenedor 2</div>,
    cont3: <div>Lider Grupo Contenedor 3</div>,
  },
  miembro: {
    cont1: (user) => (<div className="admincont1"><img src="/defaultprofile.png" />{user.nom_usuario}<br />Miembro de {user.nom_iglesia}<br />Grupo {user.nom_grupo}</div>),
    cont2:
      <div className="miembrocont2">
        <div className="dashboardgestiontitulo">Mi gestión</div>
        <div className="dashboardgestioninfo">
          <div className="dashboardgestioninfo1">
            <div>
              <img src="/management/realizarVisita.png" /><span>Visitas Recibidas</span>
            </div>
            <div>
              <img src="/management/pedidos.png" /><span>Pedidos de Oración</span>
            </div>
            <div>
              <img src="/management/testimonios.png" /><span>Testimonios Espirituales</span>
            </div>
            <div>
              <img src="/management/amistades.png" /><span>Cultivando Amistades</span>
            </div>
          </div>
          <div className="dashboardgestioninfo2">
            <div>0</div>
            <div>0</div>
            <div>0</div>
            <div>0</div>
          </div>
        </div>
      </div>,
    cont3: <div className="miembrocont2"><div className="dashboardgestiontitulo">Mis Estudios y Materiales</div></div>,
  },
  prospecto: {
    cont1: (user) => (<div className="admincont1"><img src="/defaultprofile.png" />{user.nom_usuario}<br />Miembro de {user.nom_iglesia}<br />Grupo {user.nom_grupo}</div>),
    cont2: <div>Prospecto Contenedor 2</div>,
    cont3: <div>Prospecto Contenedor 3</div>,
  },
};

function Dashboard() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const goToVideoCall = () => {
    const roomId = Math.random().toString(36).substring(2, 8);
    navigate(`/call/${roomId}`);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/");
      return;
    }

    const decoded = parseJwt(token);

    console.log("Usuario decodificado:", decoded);

    if (!decoded) {
      localStorage.removeItem("token");
      navigate("/");
      return;
    }
    setUser(decoded);
  }, [navigate]);

  if (!user) return null;

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
            <Webcam onClick={goToVideoCall} size={48} />
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
        {contenidoPorRol[user.rol]?.cont1(user)}
      </div>
      <div className="contenedor2dashboard">
        {contenidoPorRol[user.rol]?.cont2}
      </div>
      <div className="contenedor3dashboard">
        {contenidoPorRol[user.rol]?.cont3}
      </div>
      <BottomNav />
    </div>
  )
}

export default Dashboard