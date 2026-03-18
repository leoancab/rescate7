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
        <h3>BIENVENIDO!!!</h3>
        <h4>Ingresa tus datos para iniciar sesión</h4>
      </div>
      <div className="loginputs">
        <input className="inputsLogIn" placeholder="Número de Celular" />
        <input className="inputsLogIn" placeholder="Contraseña" type="password" />
      </div>
      <div className="contenedoriniciarsesion">
        <button className="btiniciarsesion">Iniciar Sesión</button>
      </div>
    </div>
  )
}
export default Login