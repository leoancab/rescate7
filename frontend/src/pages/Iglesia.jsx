import BottomNav from "./BottomNav";
import { Church } from "lucide-react";
import { useState, useEffect } from "react";

function parseJwt(token) {
    try {
        const base64Payload = token.split('.')[1];
        const payload = atob(base64Payload);
        return JSON.parse(payload);
    } catch (e) {
        return null;
    }
}

function Iglesia() {
    const [totalUsuarios, setTotalUsuarios] = useState(0);
    const [user, setUser] = useState(null);
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            const decoded = parseJwt(token);
            setUser(decoded);
        }
        if (token) {
            fetch("http://localhost:3000/users/count", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then(res => res.json())
                .then(data => {
                    setTotalUsuarios(data.total);
                })
                .catch(err => console.error(err));
        }
    }, []);
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
                    <span className="cantidadIglesia">{totalUsuarios}</span>
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