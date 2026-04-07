import BottomNav from "./BottomNav";
import { Church } from "lucide-react";
function Iglesia() {
    return (
        <div className="iglesia">
            <div className="dashboardhead">
                <div className="logohead">
                    <img
                        src="/logo.png"
                        alt="Rescate7"
                        className="logoLogIn"
                    />
                </div>
                <div className="iglesiahead">
                    <Church size={60} />
                    MI IGLESIA
                </div>
            </div>
            <div className="datosIglesia">
                <div>
                    <span>Miembros</span>
                    <span className="cantidadIglesia">0</span>
                </div>
                <div>
                    <span>Usuarios</span>
                    <span className="cantidadIglesia">0</span>
                </div>
                <div>
                    <span>Bautizados</span>
                    <span className="cantidadIglesia">0</span>
                </div>
            </div>
            <div className="factorescantidad">
                Factores que Fortalecen mi Espiritualidad
                <div>
                    <div className="datoFactor1">
                        0
                    </div>
                    <div className="datoFactor2">
                        0
                    </div>
                    <div className="datoFactor3">
                        0
                    </div>
                    <div className="datoFactor4">
                        0
                    </div>
                </div>
            </div>
            <BottomNav />
        </div>
    )
}
export default Iglesia;