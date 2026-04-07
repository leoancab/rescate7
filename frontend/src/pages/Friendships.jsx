import BottomNav from "./BottomNav";

function Friendships() {
    return (
        <div className="amistad">
            <div className="dashboardhead">
                <div className="logohead">
                    <img
                        src="/logo.png"
                        alt="Rescate7"
                        className="logoLogIn"
                    />
                </div>
                <div className="iglesiahead">
                    <img src="/management/amistades.png" alt="Cultivando amistades" />
                    CULTIVANDO AMISTADES
                </div>
            </div>
            <div className="contenedortipovisita">
                <select>
                    <option value="">Categoría</option>
                    <option value="cumple">Cumpleaños</option>
                    <option value="aniv">Aniversario de Bodas</option>
                    <option value="bautiz">Bautizmo</option>
                    <option value="trabajo">Buen Trabajo Misionero</option>
                    <option value="nacim">Nacimiento</option>
                    <option value="grad">Graduación</option>
                </select>
            </div>
            <div className="contenedorhorariovisita">
                <input type="tel" placeholder="Núm. Celular del Usuario" />
            </div>
            <div className="contenedorresumen">
                <textarea placeholder="Resumen corto del saludo o felicitación" />
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
export default Friendships