import BottomNav from "./BottomNav";
import { useRef } from "react";
import { Calendar } from "lucide-react";

function ScheduleVisit() {
    const inputRef = useRef(null);
    const abrirCalendario = () => {
        inputRef.current.showPicker();
    };
    return (
        <div className="programarvisita">
            <div className="dashboardhead">
                <div className="logohead">
                    <img
                        src="/logo.png"
                        alt="Rescate7"
                        className="logoLogIn"
                    />
                </div>
                <div className="iglesiahead">
                    <img src="/management/realizarVisita.png" alt="Pedido de Oración" />
                    PROGRAMAR VISITA MISIONERA
                </div>
            </div>
            <div className="contenedorProgramarVisita">
                <select>
                    <option value="">Categoría</option>
                    <option value="reencuentro">Reencuentro</option>
                    <option value="estudio">Estudio Bíblico</option>
                    <option value="escuela">Escuela Sabática</option>
                </select>
                <input type="text" />
                <input type="tel" />
                <input type="datetime-local" ref={inputRef} hidden/>
                <button onClick={abrirCalendario}><Calendar size={24}/></button>
                <textarea type="text" placeholder="Motivo de visita"></textarea>
                <button>
                    Enviar
                </button>
            </div>
            <BottomNav />
        </div>
    )
}
export default ScheduleVisit