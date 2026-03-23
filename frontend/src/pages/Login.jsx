import { Link } from "react-router-dom"
import BackButton from "../components/BackButton"
import { toast } from "react-toastify"
import { useState } from "react"
import "../App.css"
function Login() {
  const [numero, setNumero] = useState("")
  const [password, setPassword] = useState("")
  const handleLogin = () => {
    if (!numero || !password) {
      toast.dismiss()
      toast.error("Debes completar todos los campos", {
        toastId: "login-empty"
      })
      return
    }
  }
  return (
    <div className="login">
      <BackButton />
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
          <input value={numero} onChange={(e) => setNumero(e.target.value)} placeholder="Número de Celular" type="number" />
          <img src="/numlogin.png" />
        </div>
        <div className="contenedorinput">
          <input value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Contraseña" type="password" />
          <img src="/passwordlogin.png" />
        </div>
      </div>
      <div className="contenedoriniciarsesion">
        <button onClick={handleLogin}>Iniciar Sesión</button>
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