import BackButton from "../components/BackButton"
import { useState } from "react"
import { toast } from "react-toastify"
function Signin() {

    const [celular, setCelular] = useState("")
    const [nombre, setNombre] = useState("")
    const [acepta, setAcepta] = useState(false)
    const [loading, setLoading] = useState(false)

    const generarPassword = () => {
        const caracteres = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
        let password = ""
        for (let i = 0; i < 8; i++) {
            password += caracteres.charAt(Math.floor(Math.random() * caracteres.length))
        }
        return password
    }
    const handleRegister = async () => {
        const password = generarPassword()
        if (!celular || !nombre) {
            toast.dismiss()
            toast.error("Debes completar todos los campos", {
                toastId: "signin-empty"
            })
        } else {
            try {
                const response = await fetch("https://leoancab.app.n8n.cloud/webhook-test/rescate7", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        celular,
                        nombre,
                        password
                    })
                })
                const data = await response.json()
                console.log("Respuesta:", data)
                alert("Usuario registrado. Revisa tu WhatsApp o correo.")
            } catch (error) {
                console.error("Error:", error)
                alert("Error al registrar")
            }
        }
        setCelular("")
        setNombre("")
        setAcepta(false)
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
                REGISTRO DE USUARIO
                <br />
                Por favor ingresa tus datos
            </div>
            <div className="signininputs">
                <div className="contenedorinput">
                    <input
                        placeholder="Número de Celular"
                        value={celular}
                        type="number"
                        onChange={(e) => setCelular(e.target.value)} />
                    <img src="/numlogin.png" />
                </div>
                <div className="contenedorinput">
                    <input
                        placeholder="Nombre y Apellido"
                        value={nombre}
                        type="text"
                        onChange={(e) => setNombre(e.target.value)} />
                    <img src="/numlogin.png" />
                </div>
            </div>
            <div className="terminos">
                <input
                    type="checkbox"
                    value={acepta} />
                Acepto los Terminos y Condiciones de Uso
            </div>
            <div className="contenedorregistro">
                <button onClick={handleRegister}>Registrarme</button>
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