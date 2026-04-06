import BottomNav from "./BottomNav";

function ScheduleVisit() {
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
                <div>
                    <input type="date" />
                    <input type="time" />
                </div>
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