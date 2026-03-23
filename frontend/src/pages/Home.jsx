import { Link, useNavigate } from "react-router-dom"
import "../App.css"
function Home() {
  return (
    <div className="home">
      <div className="encabezado">
        <div className="idioma">
          Español - Ecuador
        </div>
        <div className="logo">
          <img
            src="/logo.png"
            alt="Rescate7"
          />
        </div>
      </div>

      <div className="titulo">
        <h1>
          Plan de Rescate y Renovación de la Fe
        </h1>
      </div>
      <div className="contenedor">
        <Link to="/tour">
          <button className="botonesHome btTour">
            <b>Tour</b>
          </button>
        </Link>
        <Link to="/login">
          <button className="botonesHome btLogin">
            <b>Iniciar Sesión</b>
          </button>
        </Link>
      </div>

      <div className="contenedorlinks">
        <img className="links" src="/youtube.png" />
        <img className="links" src="/facebook.png" />
        <img className="links" src="/instagram.png" />
        <img className="links" src="/tiktok.png" />
      </div>

      <div className="homefoot">
        <p>Virtualweb del Ecuador S.A.
          <br />
          Todos los Derechos Reservados</p>
      </div>
    </div>
  )
}
export default Home