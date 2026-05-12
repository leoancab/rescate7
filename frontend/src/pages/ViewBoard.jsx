import BottomNav from "./BottomNav";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function ViewBoard() {

    const [tipo, setTipo] = useState("");
    const [alcance, setAlcance] = useState("");
    const [amistades, setAmistades] = useState([]);
    const navigate = useNavigate();

    const goToVideoCall = () => {
        const roomId = Math.random().toString(36).substring(2, 8);
        navigate(`/call/${roomId}`);
    };

    const tiempoRelativo = (fechaStr) => {
        const fecha = new Date(fechaStr);
        const ahora = new Date();

        const diffMs = ahora - fecha; // diferencia en milisegundos

        const segundos = Math.floor(diffMs / 1000);
        const minutos = Math.floor(segundos / 60);
        const horas = Math.floor(minutos / 60);
        const dias = Math.floor(horas / 24);

        if (segundos < 60) return "hace unos segundos";
        if (minutos < 60) return `hace ${minutos} minuto${minutos !== 1 ? "s" : ""}`;
        if (horas < 24) return `hace ${horas} hora${horas !== 1 ? "s" : ""}`;
        if (dias < 7) return `hace ${dias} día${dias !== 1 ? "s" : ""}`;

        // Si ya es más antiguo
        return fecha.toLocaleDateString("es-EC");
    };

    const obtenerAmistades = async () => {
        try {
            const token = localStorage.getItem("token");

            if (!token) {
                console.error("No hay token disponible");
                return;
            }

            const res = await fetch("http://localhost:3000/friendship", {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });

            if (!res.ok) {
                throw new Error("Error en la respuesta del servidor");
            }

            const data = await res.json();
            setAmistades(data);

        } catch (error) {
            console.error("Error:", error);
        }
    };

    useEffect(() => {
        obtenerAmistades();
    }, []);

    useEffect(() => {
        console.log("Amistades actualizadas:", amistades);
    }, [amistades]);

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

                <div className="opcfiltros">
                    <select
                        className="selectBox"
                        onChange={(e) => setTipo(e.target.value)}
                    >
                        <option value=""></option>
                        <option value="visitas">Visitas Misioneras</option>
                        <option value="oracion">Pedidos de Oración</option>
                        <option value="testimonios">Testimonios</option>
                        <option value="relacionamiento">Relacionamiento</option>
                    </select>

                    <select
                        className="selectBox"
                        onChange={(e) => setAlcance(e.target.value)}
                    >
                        <option value=""></option>
                        <option value="gestion">Mi Gestión</option>
                        <option value="grupo">Mi Grupo</option>
                        <option value="iglesia">Mi Iglesia</option>
                    </select>
                </div>
            </div>

            <div style={{ height: "80vh" }}>
                <div style={{ backgroundColor: "white", height: "100%", borderRadius: "20px", padding: "10px" }}>

                    {amistades.length === 0 ? (
                        <p>No hay amistades disponibles</p>
                    ) : (
                        amistades.map((amigo, index) => (
                            <div key={index} style={{ color: "black" }} onClick={goToVideoCall}>
                                <p>De: liderGrupo
                                    <br />
                                    Mensaje: {amigo.mensaje}<br />
                                    Fecha: {tiempoRelativo(amigo.fecha_envio)}</p>
                                <hr style={{ border: "1px solid black" }} />
                            </div>

                        ))
                    )}

                </div>
            </div>

            <BottomNav />
        </div>
    );
}

export default ViewBoard;