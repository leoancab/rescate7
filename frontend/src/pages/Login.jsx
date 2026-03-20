import { Link } from "react-router-dom"
import "../App.css"
function Login() {
  return (
    <div className="login">
      <div className="contenedorlogoLogin">
        <img
          src="/logo.png"
          alt="Rescate7"
          className="logoLogIn"
        />
      </div>
      <div className="bienvenido">
        BIENVENIDO!!!
        <br />
        Ingresa tus datos para iniciar sesión
      </div>
      <div className="loginputs">
        <div className="contenedorinput">
          <input placeholder="Número de Celular" type="number" />
          <img src="/numlogin.png" />
        </div>
        <div className="contenedorinput">
          <input placeholder="Contraseña" type="password" />
          <img src="/passwordlogin.png" />
        </div>
      </div>
      <div className="contenedoriniciarsesion">
        <button>Iniciar Sesión</button>
      </div>
      <div className="contenedorolvidarcontra">
        <span>Has olvidado tu contraseña?</span>
      </div>
      <hr />
      <div className="contenedorregistro">
        <Link to={"/signin"}>
          <button>Registrarme</button>
        </Link>
      </div>
      <div className="homefoot">
        <p>Virtualweb del Ecuador S.A.
          <br />
          Todos los Derechos Reservados</p>
      </div>
    </div>
  )
}
export default Login