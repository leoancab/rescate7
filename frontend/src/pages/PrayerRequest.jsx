import { useEffect, useState } from "react";
import BottomNav from "./BottomNav";

function PrayerRequest() {

    const [categoria, setCategoria] = useState("");
    const [usuario, setUsuario] = useState("");
    const [mensaje, setMensaje] = useState("");
    const [usuarios, setUsuarios] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchUsuarios = async () => {
            try {
                const res = await fetch("http://localhost:3000/users/by-rol?rol=4", {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem("token")}`
                    }
                });

                const data = await res.json();

                setUsuarios(Array.isArray(data) ? data : []);

            } catch (error) {
                console.error("Error cargando usuarios:", error);
            }
        };

        fetchUsuarios();
    }, []);

    const handleEnviar = async () => {
        if (!categoria || !usuario || !mensaje) return;

        try {
            setLoading(true);

            const res = await fetch("http://localhost:3000/prayer", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                },
                body: JSON.stringify({
                    categoria,
                    usuario_id: usuario,
                    mensaje
                })
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || "Error al enviar");
            }

            alert("🙏 Pedido enviado correctamente");

            setCategoria("");
            setUsuario("");
            setMensaje("");

        } catch (error) {
            console.error(error);
            alert("Error al enviar pedido ❌");
        } finally {
            setLoading(false);
        }
    };

    const isValid = categoria && usuario && mensaje;

    return (
        <div className="pedidosoracion">
            <div className="dashboardhead">
                <div className="logohead">
                    <img
                        src="/logo.png"
                        alt="Rescate7"
                        className="logoLogIn"
                    />
                </div>
                <div className="iglesiahead">
                    <img src="/management/pedidos.png" alt="Pedido de Oración" />
                    PEDIDOS DE ORACIÓN
                </div>
            </div>

            {/* Categoría */}
            <div className="contenedortipovisita">
                <select
                    value={categoria}
                    onChange={(e) => setCategoria(e.target.value)}
                >
                    <option value="">Categoría</option>
                    <option value="familia">Familia</option>
                    <option value="salud">Salud</option>
                    <option value="trabajo">Trabajo</option>
                    <option value="matrimonio">Matrimonio</option>
                    <option value="hijos">Hijos</option>
                    <option value="otros">Otros</option>
                </select>
            </div>

            {/* Usuario */}
            <div className="contenedorhorariovisita">
                <select
                    value={usuario}
                    onChange={(e) => setUsuario(e.target.value)}
                >
                    <option value="">Seleccionar miembro</option>

                    {usuarios.map((u) => (
                        <option key={u.id} value={u.id}>
                            {u.nom_usuario}
                        </option>
                    ))}
                </select>
            </div>

            {/* Mensaje */}
            <div className="contenedorresumen">
                <textarea
                    placeholder="Escribe tu pedido de oración 🙏"
                    value={mensaje}
                    onChange={(e) => setMensaje(e.target.value)}
                />
            </div>

            {/* Botón */}
            <div className="contenedorenviar">
                <button
                    onClick={handleEnviar}
                    disabled={!isValid || loading}
                >
                    {loading ? "Enviando..." : "Enviar pedido"}
                </button>
            </div>

            <BottomNav />
        </div>
    );
}

export default PrayerRequest;