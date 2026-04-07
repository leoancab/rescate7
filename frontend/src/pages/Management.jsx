import BottomNav from "./BottomNav";
import { LayoutPanelTop } from "lucide-react"
import { useNavigate } from "react-router-dom";

function Management() {

    const navigate = useNavigate();

    return (
        <div className="gestion">
            <div className="dashboardhead">
                <div className="logohead">
                    <img
                        src="/logo.png"
                        alt="Rescate7"
                        className="logoLogIn"
                    />
                </div>
                <div className="iglesiahead">
                    <LayoutPanelTop size={60} />
                    GESTION MISIONERA
                </div>
            </div>
            <div className="contenedorgestion">
                <div>
                    <button onClick={() => navigate("/management/schedule-visit")}>
                        <img src="/management/realizarVisita.png" alt="Realizar Visita" />
                        Realizar Visita Misionera
                    </button>
                    <button onClick={() => navigate("/management/request-visit")}>
                        <img src="/management/solicitarVisita.png" alt="Solicitar Visita" />
                        Solicitar Visita
                    </button>
                </div>
                <div>
                    <button>
                        <img src="/management/estudios.png" alt="Estudios" />
                        Estudios, Materiales y Certificados
                    </button>
                    <button onClick={() => navigate("/management/prayer-request")}>
                        <img src="/management/pedidos.png" alt="Pedidos de Oración" />
                        Pedidos de Oración
                    </button>
                </div>
                <div>
                    <button onClick={() => navigate("/management/testimony")}>
                        <img src="/management/testimonios.png" alt="Testimonios Espirituales" />
                        Testimonios Espirituales
                    </button>
                    <button onClick={() => navigate("/management/friendship")}>
                        <img src="/management/amistades.png" alt="Cultivando amistades" />
                        Cultivando amistades
                    </button>
                </div>
            </div>
            <BottomNav />
        </div>
    )
}
export default Management