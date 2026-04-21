import BottomNav from "./BottomNav";
import { UsersRound } from "lucide-react";
import { useState, useEffect } from "react";

function Group() {

    const [user, setUser] = useState(null);
    const [liderGrupo, setLiderGrupo] = useState("");

    function parseJwt(token) {
        try {
            const base64Payload = token.split('.')[1];
            const payload = atob(base64Payload);
            return JSON.parse(payload);
        } catch (e) {
            return null;
        }
    }

    useEffect(() => {
        const token = localStorage.getItem("token");
        const decoded = parseJwt(token);
        setUser(decoded);
    }, []);

    const idGrupo = user?.id_grupo;

    const [data, setData] = useState({
        visitas: 0,
        pedidos: 0,
        testimonios: 0,
        amistades: 0
    });

    const [infoGrupo, setInfoGrupo] = useState(null);

    useEffect(() => {
        const obtenerCantidadActividades = async () => {
            try {
                const res = await fetch(`http://localhost:3000/groups/cant/${idGrupo}`);
                const result = await res.json();

                setData(result);
            } catch (error) {
                console.error("Error:", error);
            }
        };

        const obtenerDatosGrupo = async () => {
            try {
                const res = await fetch(`http://localhost:3000/groups/${idGrupo}`);
                const result = await res.json();
                setInfoGrupo(result);
            } catch (error) {
                console.error("Error:", error);
            }
        };

        const obtenerLiderGrupo = async () => {
            try {
                const res = await fetch(`http://localhost:3000/users/${idGrupo}/lider`);
                const result = await res.json();

                setLiderGrupo(result.lider);
            } catch (error) {
                console.error("Error:", error);
            }
        }

        if (idGrupo) {
            obtenerCantidadActividades();
            obtenerDatosGrupo();
            obtenerLiderGrupo();
        }
    }, [idGrupo]);

    return (
        <div className="migrupo">
            <div className="dashboardhead">
                <div className="logohead">
                    <img
                        src="/logo.png"
                        alt="Rescate7"
                        className="logoLogIn"
                    />
                </div>
                <div className="iglesiahead">
                    <UsersRound size={60} />
                    MI GRUPO
                </div>
            </div>
            <div style={{ height: "30vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <div style={{ fontSize: "150%", fontWeight: "bolder", backgroundColor: "#072A60", width: "75%", height: "75%", borderRadius: "20px", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                    <img style={{ height: "50px", width: "50px" }} src="logogrupo.png" />
                    <span>Grupo {infoGrupo?.nom_grupo}</span>
                    <br />
                    <span>Lider de Grupo</span>
                    <span>{liderGrupo}</span>
                </div>
            </div>
            <div style={{ height: "20vh", display: "flex", justifyContent: "center", gap: "2.5%" }}>
                <div style={{ height: "100%", width: "30%", display: "flex", flexDirection: "column" }}>
                    <div style={{ height: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "bolder", fontSize: "150%", textAlign: "center" }}>
                        Ranking Nro.
                    </div>
                    <div style={{ height: "50%", aspectRatio: "1/1", color: "#184281", fontWeight: "bolder", fontSize: "200%", backgroundColor: "#EF7077", borderRadius: "50%", alignItems: "center", justifyContent: "center", display: "flex", alignSelf: "center" }}>
                        0
                    </div>
                </div>
                <div style={{ height: "100%", width: "30%", display: "flex", flexDirection: "column" }}>
                    <div style={{ height: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "bolder", fontSize: "150%", textAlign: "center" }}>
                        Usuarios Invitados
                    </div>
                    <div style={{ height: "50%", aspectRatio: "1/1", color: "#184281", fontWeight: "bolder", fontSize: "200%", backgroundColor: "#3BEBD6", borderRadius: "50%", alignItems: "center", justifyContent: "center", display: "flex", alignSelf: "center" }}>
                        0
                    </div>
                </div>
                <div style={{ height: "100%", width: "30%", display: "flex", flexDirection: "column" }}>
                    <div style={{ height: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "bolder", fontSize: "150%", textAlign: "center" }}>
                        Usuarios Registrados
                    </div>
                    <div style={{ height: "50%", aspectRatio: "1/1", color: "#184281", fontWeight: "bolder", fontSize: "200%", backgroundColor: "#E3C318", borderRadius: "50%", alignItems: "center", justifyContent: "center", display: "flex", alignSelf: "center" }}>
                        {infoGrupo?.cantidad_miembros}
                    </div>
                </div>
            </div>
            <div style={{ height: "30vh", display: "flex", flexDirection: "column", alignItems: "center" }}>
                <div style={{ height: "15%", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "bolder" }}>
                    Gestión {new Date().getFullYear()}
                </div>
                <div style={{ height: "85%", width: "85%", backgroundColor: "#CCCCCC", borderRadius: "20px", display: "flex" }}>
                    <div className="dashboardgestioninfo1">
                        <div>
                            <img src="/management/realizarVisita.png" /><span style={{ color: "black" }}>Visitas Recibidas</span>
                        </div>
                        <div>
                            <img src="/management/pedidos.png" /><span style={{ color: "black" }}>Pedidos de Oración</span>
                        </div>
                        <div>
                            <img src="/management/testimonios.png" /><span style={{ color: "black" }}>Testimonios Espirituales</span>
                        </div>
                        <div>
                            <img src="/management/amistades.png" /><span style={{ color: "black" }}>Cultivando Amistades</span>
                        </div>
                    </div>
                    <div className="dashboardgestioninfo2">
                        <div style={{ color: "black" }}>
                            {data.visitas}
                        </div>
                        <div style={{ color: "black" }}>
                            {data.pedidos}
                        </div>
                        <div style={{ color: "black" }}>
                            {data.testimonios}
                        </div>
                        <div style={{ color: "black" }}>
                            {data.amistades}
                        </div>
                    </div>
                </div>
            </div>
            <BottomNav />
        </div>
    )
}
export default Group