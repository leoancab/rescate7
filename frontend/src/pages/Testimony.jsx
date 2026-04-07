import BottomNav from "./BottomNav";
import { Video, Mic, SquarePen, Upload } from "lucide-react"
import { useState, useRef } from "react";

function Testimony() {

    const [file, setFile] = useState(null);
    const [tipo, setTipo] = useState("texto");
    const fileRef = useRef(null);

    const handleUpload = async () => {
        if (!file) return alert("Selecciona un archivo");

        const formData = new FormData();
        formData.append("file", file);

        try {
            const res = await fetch("http://localhost:5000/upload", {
                method: "POST",
                body: formData,
            });

            const data = await res.json();
            console.log("URL:", data.url);

            alert("Archivo subido correctamente");
        } catch (error) {
            console.error(error);
            alert("Error al subir");
        }
    };

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
                        <input type="file" accept="video/*" ref={fileRef} hidden onChange={(e) => setFile(e.target.files[0])} />
                    </>
                )}
                {tipo === "audio" && (
                    <>
                        <button onClick={() => fileRef.current.click()}><Upload /></button>
                        <input type="file" accept="audio/*" ref={fileRef} hidden onChange={(e) => setFile(e.target.files[0])} />
                    </>
                )}
                {tipo === "texto" && (
                    <textarea placeholder="Escribe tu mensaje..." />
                )}
            </div>
            <div className="contenedorenviartestimonio">
                <button onClick={handleUpload}>
                    Enviar
                </button>
            </div>
            <BottomNav />
        </div>
    )
}
export default Testimony