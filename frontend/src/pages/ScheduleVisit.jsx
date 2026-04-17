import BottomNav from "./BottomNav";
import { useRef, useState } from "react";
import { Calendar } from "lucide-react";

function ScheduleVisit() {
    const inputRef = useRef(null);

    const [tipo, setTipo] = useState("");
    const [usuario, setUsuario] = useState("");
    const [telefono, setTelefono] = useState("");
    const [fecha, setFecha] = useState("");
    const [mensaje, setMensaje] = useState("");

    const abrirCalendario = () => {
        inputRef.current.showPicker();
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!tipo || !usuario || !fecha) {
            alert("Completa los campos obligatorios");
            return;
        }

        console.log({
            tipo,
            usuario,
            telefono,
            fecha,
            mensaje
        });
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

            <form className="contenedorProgramarVisita" onSubmit={handleSubmit}>

                <select value={tipo} onChange={(e) => setTipo(e.target.value)} required>
                    <option value="">Categoría</option>
                    <option value="reencuentro">Reencuentro</option>
                    <option value="estudio">Estudio Bíblico</option>
                    <option value="escuela">Escuela Sabática</option>
                </select>

                <input
                    type="text"
                    placeholder="Nombre del miembro"
                    value={usuario}
                    onChange={(e) => setUsuario(e.target.value)}
                />

                <input
                    type="tel"
                    placeholder="Teléfono"
                    value={telefono}
                    readOnly
                />

                <input
                    type="datetime-local"
                    ref={inputRef}
                    value={fecha}
                    onChange={(e) => setFecha(e.target.value)}
                    hidden
                />

                <button type="button" onClick={abrirCalendario}>
                    <Calendar size={24} />
                </button>

                {fecha && <p>Fecha seleccionada: {fecha}</p>}

                <textarea
                    placeholder="Motivo de visita"
                    value={mensaje}
                    onChange={(e) => setMensaje(e.target.value)}
                />

                <button type="submit">
                    Enviar
                </button>
            </form>

            <BottomNav />
        </div>
    );
}

export default ScheduleVisit;