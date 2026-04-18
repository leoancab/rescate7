import BottomNav from "./BottomNav";
import { useRef, useState, useEffect } from "react";
import { Calendar } from "lucide-react";

function ScheduleVisit() {
    const inputRef = useRef(null);

    const [tipo, setTipo] = useState("");
    const [usuario, setUsuario] = useState("");
    const [fecha, setFecha] = useState("");
    const [mensaje, setMensaje] = useState("");
    const [usuarios, setUsuarios] = useState([]);

    const abrirCalendario = () => {
        inputRef.current.showPicker();
    };

    // 🔹 Traer miembros (igual que en otras pantallas)
    useEffect(() => {
        const token = localStorage.getItem("token");

        fetch("http://localhost:3000/users/by-rol?rol=4", {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
            .then(res => res.json())
            .then(data => {
                console.log("Miembros:", data);
                setUsuarios(data);
            })
            .catch(err => console.error(err));
    }, []);

    const handleSubmit = async () => {
        if (!tipo || !usuario || !fecha) {
            alert("Completa los campos obligatorios");
            return;
        }

        try {
            const token = localStorage.getItem("token");

            const res = await fetch("http://localhost:3000/visits", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({
                    tipo,
                    usuario_id: usuario,
                    fecha,
                    mensaje
                })
            });

            if (!res.ok) {
                throw new Error("Error al guardar");
            }

            const data = await res.json();
            console.log("Guardado:", data);

            alert("Visita programada correctamente ✅");

            // 🔥 LIMPIAR CAMPOS
            setTipo("");
            setUsuario("");
            setFecha("");
            setMensaje("");

        } catch (error) {
            console.error(error);
            alert("Error al guardar la visita ❌");
        }
    };

    return (
        <div className="programarvisita">
            <div className="dashboardhead">
                <div className="logohead">
                    <img src="/logo.png" alt="Rescate7" className="logoLogIn" />
                </div>
                <div className="iglesiahead">
                    <img src="/management/realizarVisita.png" alt="Visita" />
                    PROGRAMAR VISITA MISIONERA
                </div>
            </div>

            <div className="contenedorProgramarVisita">

                {/* 🔹 Categoría */}
                <select value={tipo} onChange={(e) => setTipo(e.target.value)}>
                    <option value="">Categoría</option>
                    <option value="reencuentro">Reencuentro</option>
                    <option value="estudio">Estudio Bíblico</option>
                    <option value="escuela">Escuela Sabática</option>
                </select>

                {/* 🔹 Miembros (select en lugar de input) */}
                <select value={usuario} onChange={(e) => setUsuario(e.target.value)}>
                    <option value="">Seleccionar miembro</option>
                    {usuarios.map((u) => (
                        <option key={u.id} value={u.id}>
                            {u.nom_usuario}
                        </option>
                    ))}
                </select>

                {/* 🔹 Input oculto de fecha */}
                <input
                    type="datetime-local"
                    ref={inputRef}
                    value={fecha}
                    onChange={(e) => setFecha(e.target.value)}
                    hidden
                />

                {/* 🔹 Botón calendario */}
                <button type="button" onClick={abrirCalendario}>
                    <Calendar size={24} />
                </button>

                {/* 🔹 Mostrar fecha */}
                {fecha && <p>Fecha seleccionada: {fecha}</p>}

                {/* 🔹 Mensaje */}
                <textarea
                    placeholder="Motivo de visita"
                    value={mensaje}
                    onChange={(e) => setMensaje(e.target.value)}
                />

                {/* 🔹 Botón enviar */}
                <button onClick={handleSubmit}>
                    Enviar
                </button>
            </div>
            <BottomNav />
        </div>
    );
}

export default ScheduleVisit;