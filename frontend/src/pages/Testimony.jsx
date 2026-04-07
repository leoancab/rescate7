import BottomNav from "./BottomNav";
import { Video, Mic, SquarePen, Upload } from "lucide-react"
import { useState, useRef } from "react";

function Testimony() {

    const [tipo, setTipo] = useState("texto");

    const fileRef = useRef(null);

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
                    <>
                        <button onClick={() => fileRef.current.click()}><Upload /></button>
                        <input type="file" accept="video/*" ref={fileRef} hidden />
                    </>
                )}
                {tipo === "audio" && (
                    <>
                        <button onClick={() => fileRef.current.click()}><Upload /></button>
                        <input type="file" accept="audio/*" ref={fileRef} hidden />
                    </>
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