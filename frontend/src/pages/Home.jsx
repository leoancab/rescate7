import { Link, useNavigate } from "react-router-dom"
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
        <a href="https://www.youtube.com/@Rescate7.Ecuador" target="_blank" rel="noopener noreferrer">
          <img className="links" src="/youtube.png" />
        </a>

        <a href="https://www.facebook.com/profile.php?id=61575471720675&locale=es_LA" target="_blank" rel="noopener noreferrer">
          <img className="links" src="/facebook.png" />
        </a>

        <a href="https://www.instagram.com/rescate7.social/" target="_blank" rel="noopener noreferrer">
          <img className="links" src="/instagram.png" />
        </a>

        <a href="https://www.tiktok.com/@rescate7.social" target="_blank" rel="noopener noreferrer">
          <img className="links" src="/tiktok.png" />
        </a>
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