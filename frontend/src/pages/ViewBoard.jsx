import BottomNav from "./BottomNav";
import { useEffect, useState } from "react";

function ViewBoard() {

    const [tipo, setTipo] = useState("");
    const [alcance, setAlcance] = useState("");
    const [amistades, setAmistades] = useState([]);

    useEffect(() => {
        const obtenerAmistades = async () => {
            try {
                const res = await fetch("http://localhost:3000/friendship", {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem("token")}`
                    }
                });
                const data = await res.json();
                setAmistades(data);
            } catch (error) {
                console.error("Error:", error);
            }
        };

        obtenerAmistades();
        console.log(amistades);
    }, []);

    return (
        <div className="dashboardfondo">
            <div className="dashboardhead">
                <div className="logohead">
                    <img
                        src="/logo.png"
                        alt="Rescate7"
                        className="logoLogIn"
                    />
                </div>
                <div className="opchead">
                    <select className="selectBox" onChange={(e) => setTipo(e.target.value)}>
                        <option></option>
                        <option>Visitas Misioneras</option>
                        <option>Pedidos de Oración</option>
                        <option>Testimonios</option>
                        <option>Relacionamiento</option>
                    </select>
                    <select className="selectBox" onChange={(e) => setAlcance(e.target.value)}>
                        <option></option>
                        <option>Mi Gestión</option>
                        <option>Mi Grupo</option>
                        <option>Mi Iglesia</option>
                    </select>
                </div>
            </div>
            <div style={{ height: "80vh" }}>
                <div style={{ backgroundColor: "white", height: "100%", borderRadius: "20px" }}>

                </div>
            </div>
            <BottomNav />
        </div>
    )
}

export default ViewBoard