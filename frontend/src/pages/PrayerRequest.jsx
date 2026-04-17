import { useEffect, useState } from "react";
import BottomNav from "./BottomNav";

function PrayerRequest() {
    const [categoria, setCategoria] = useState("");
    const [usuario, setUsuario] = useState("");
    const [mensaje, setMensaje] = useState("");
    const [usuarios, setUsuarios] = useState([]);
    const [loading, setLoading] = useState(false);

    // 🔹 Obtener usuarios (simulación API)
    useEffect(() => {
        const fetchUsuarios = async () => {
            try {
                const res = await fetch("http://localhost:3000/users?rol=miembro");
                const data = await res.json();
                setUsuarios(data);
            } catch (error) {
                console.error("Error cargando usuarios:", error);
            }
        };

        fetchUsuarios();
    }, []);

    // 🔹 Enviar pedido
    const handleSubmit = async () => {
        if (!categoria || !usuario || mensaje.length < 10) {
            alert("Completa todos los campos correctamente (mínimo 10 caracteres)");
            return;
        }

        try {
            setLoading(true);

            const res = await fetch("http://localhost:3000/prayer-request", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    categoria,
                    usuario_id: usuario,
                    mensaje,
                }),
            });

            const data = await res.json();

            if (!res.ok) throw new Error(data.message);

            alert("🙏 Pedido de oración enviado correctamente");

            // Reset
            setCategoria("");
            setUsuario("");
            setMensaje("");

        } catch (error) {
            console.error(error);
            alert("Error al enviar el pedido");
        } finally {
            setLoading(false);
        }
    };

    const categorias = [
        "Familia",
        "Salud",
        "Trabajo",
        "Matrimonio",
        "Hijos",
        "Otros",
    ];

    return (
        <div className="pedidosoracion">
            {/* HEADER */}
            <div className="dashboardhead">
                <div className="logohead">
                    <img src="/logo.png" alt="Rescate7" className="logoLogIn" />
                </div>
                <div className="iglesiahead">
                    <img src="/management/pedidos.png" alt="Pedido de Oración" />
                    PEDIDOS DE ORACIÓN
                </div>
            </div>

            {/* CATEGORÍAS */}
            <div className="contenedortipovisita">
                <label>Categoría</label>
                <div className="categorias">
                    {categorias.map((cat) => (
                        <button
                            key={cat}
                            className={categoria === cat ? "active" : ""}
                            onClick={() => setCategoria(cat)}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            {/* USUARIO */}
            <div className="contenedorhorariovisita">
                <label>Seleccionar miembro</label>
                <select
                    value={usuario}
                    onChange={(e) => setUsuario(e.target.value)}
                >
                    <option value="">Selecciona un usuario</option>
                    {usuarios.map((user) => (
                        <option key={user.id} value={user.id}>
                            {user.nombre}
                        </option>
                    ))}
                </select>
            </div>

            {/* MENSAJE */}
            <div className="contenedorresumen">
                <label>Pedido de oración</label>
                <textarea
                    placeholder="Describe de forma breve y concisa el pedido..."
                    value={mensaje}
                    onChange={(e) => setMensaje(e.target.value)}
                    maxLength={300}
                />
                <p>{mensaje.length}/300</p>
            </div>

            {/* BOTÓN */}
            <div className="contenedorenviar">
                <button onClick={handleSubmit} disabled={loading}>
                    {loading ? "Enviando..." : "Enviar"}
                </button>
            </div>

            <BottomNav />
        </div>
    );
}

export default PrayerRequest;