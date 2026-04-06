import BottomNav from "./BottomNav";

function PrayerRequest() {
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
                    PEDIDOS DE ORACION
                </div>
            </div>
            <div className="contenedortipovisita">
                <select>
                    <option value="">Categoría</option>
                    <option value="familia">Familia</option>
                    <option value="salud">Salud</option>
                    <option value="trabajo">Trabajo</option>
                    <option value="matrimonio">Matrimonio</option>
                    <option value="hijos">Hijos</option>
                    <option value="otros">Otros</option>
                </select>
            </div>
            <div className="contenedorhorariovisita">
                <input type="tel" placeholder="Núm. Celular del Usuario" />
            </div>
            <div className="contenedorresumen">
                <textarea type="text" placeholder="Describe de forma breve y concisa el pedido de oración."></textarea>
            </div>
            <div className="contenedorenviar">
                <button>
                    Enviar
                </button>
            </div>
            <BottomNav />
        </div>
    )
}
export default PrayerRequest