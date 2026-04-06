import BottomNav from "./BottomNav";
import { Video, Mic, SquarePen } from "lucide-react"
import { useState } from "react";

function Testimony() {

    const [tipo, setTipo] = useState("texto");

    return (
        <div className="testimonio">
            <div className="dashboardhead">
                <div className="logohead">
                    <img
                        src="/logo.png"
                        alt="Rescate7"
                        className="logoLogIn"
                    />
                </div>
                <div className="iglesiahead">
                    <img src="/management/testimonios.png" alt="Pedido de Oración" />
                    TESTIMONIOS ESPIRITUALES
                </div>
            </div>
            <div className="contenedorbotonestestimonio">
                <button onClick={() => setTipo("video")}>Video<Video /></button>
                <button onClick={() => setTipo("audio")}>Audio<Mic /></button>
                <button onClick={() => setTipo("texto")}>Texto<SquarePen /></button>
            </div>
            <div className="contenedorentrada">
                {tipo === "video" && (
                    <input type="file" accept="video/*" />
                )}
                {tipo === "audio" && (
                    <input type="file" accept="audio/*" />
                )}
                {tipo === "texto" && (
                    <textarea placeholder="Escribe tu mensaje..." />
                )}
            </div>
            <div className="contenedorenviartestimonio">
                <button>
                    Enviar
                </button>
            </div>
            <BottomNav />
        </div>
    )
}
export default Testimony