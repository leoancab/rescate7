import { data, Link, useNavigate } from "react-router-dom"
import BackButton from "../components/BackButton"
import { toast } from "react-toastify"
import { useEffect, useState } from "react"
import "../App.css"
import IntlTelInput from "intl-tel-input/reactWithUtils";
import "intl-tel-input/styles";
function Login() {
  const [numero, setNumero] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()

  useEffect(() => {
    localStorage.removeItem("token")
  }, [])

  const handleLogin = async () => {
    if (!numero || !password) {
      toast.dismiss()
      toast.error("Debes completar todos los campos", {
        toastId: "login-empty"
      })
      return
    }
    try {
      const response = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          nro_celular: numero,
          password
        })
      })
      const data = await response.json()
      if (!response.ok) {
        throw new Error(data.message || "Error en login")
      }
      localStorage.setItem("token", data.token)
      //localStorage.setItem("user", JSON.stringify(data.user))
      toast.success("Bienvenido 👌")
      navigate("/test")
    } catch (error) {
      console.error(error)
      toast.error(error.message || "Error al conectar con el servidor")
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
          <IntlTelInput
            initialCountry="ec"
            preferredCountries={["ec", "us", "es"]}
            value={numero}
            onChangeNumber={(number) => setNumero(number)}
            inputProps={{
              placeholder: "Número de Celular",
              className: "inputTelefono"
            }}
          />
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