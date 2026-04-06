import BottomNav from "./BottomNav";

function RequestVisit() {
    return (
        <div className="visitasolicitar">
            <div className="dashboardhead">
                <div className="logohead">
                    <img
                        src="/logo.png"
                        alt="Rescate7"
                        className="logoLogIn"
                    />
                </div>
                <div className="iglesiahead">
                    <img src="/management/solicitarVisita.png" alt="Solicitar Visita" />
                    SOLICITAR VISITA PERSONAL
                </div>
            </div>
            <div className="contenedortipovisita">
                <select>
                    <option value="">Tipo de visita</option>
                    <option value="orientacion">Orientación</option>
                    <option value="estudio">Estudio Biblico</option>
                    <option value="consejeria">Consejería Cristiana</option>
                </select>
            </div>
            <div className="contenedorhorariovisita">
                <input type="date" />
            </div>
            <div className="contenedorresumen">
                <textarea type="text" placeholder="Resumen corto del motivo de la visita"></textarea>
            </div>
            <div className="contenedorenviar">
                <button>
                    Siguiente
                </button>
            </div>
            <BottomNav />
        </div>
    )
}
export default RequestVisit