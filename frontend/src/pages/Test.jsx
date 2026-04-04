import BottomNav from "./BottomNav";
import { useNavigate } from "react-router-dom";
function Test() {
    const navigate = useNavigate();
    return (
        <div className="testfondo">
            <div className="contenedorlogoLogin">
                <img
                    src="/logo.png"
                    alt="Rescate7"
                    className="logoLogIn"
                />
            </div>
            <div className="contenedortest">
                TE GUSTARÍA DESCUBRIR TUS FORTALEZAS Y DONES ESPIRITUALES?
            </div>
            <div className="textotest">
                Ahora puedes contestar un TEST de preguntas sencillas que te ayudarán a descubrirlo de manera muy reservada y confidencial...
            </div>
            <div className="botonesTest">
                <button className="botontest1">
                    Iniciar TEST Espiritual
                </button>
                <button className="botontest2">
                    Iniciar TEST de Dones
                </button>
                <button className="botontest3" onClick={() => navigate("/dashboard")}>
                    No por el momento
                </button>
            </div>
            <BottomNav />
        </div>
    )
}
export default Test