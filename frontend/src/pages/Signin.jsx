import BackButton from "../components/BackButton"
function Signin() {
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
                REGISTRO DE USUARIO
                <br />
                Por favor ingresa tus datos
            </div>
            <div className="signininputs">
                <div className="contenedorinput">
                    <input placeholder="Número de Celular" type="number" />
                    <img src="/numlogin.png" />
                </div>
                <div className="contenedorinput">
                    <input placeholder="Nombre y Apellido" type="text" />
                    <img src="/numlogin.png" />
                </div>
                <div className="contenedorinput">
                    <input placeholder="Contraseña" type="password" />
                    <img src="/passwordlogin.png" />
                </div>
                <div className="contenedorinput">
                    <input placeholder="Repetir Contraseña" type="password" />
                    <img src="/passwordlogin.png" />
                </div>
            </div>
            <div className="terminos">
                <input type="checkbox" />
                Acepto los Terminos y Condiciones de Uso
            </div>
            <div className="contenedorregistro">
                <button>Registrarme</button>
            </div>
            <div className="homefoot">
                <p>Virtualweb del Ecuador S.A.
                    <br />
                    Todos los Derechos Reservados</p>
            </div>
        </div>
    )
}
export default Signin