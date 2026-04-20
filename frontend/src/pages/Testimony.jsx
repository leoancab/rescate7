import BottomNav from "./BottomNav";
import { Video, Mic, SquarePen, Upload } from "lucide-react"
import { useState, useRef } from "react";

function Testimony() {

    const [file, setFile] = useState(null);
    const [tipo, setTipo] = useState("texto");
    const [texto, setTexto] = useState("");
    const fileRef = useRef(null);

    function parseJwt(token) {
        try {
            const base64Payload = token.split('.')[1];
            const payload = atob(base64Payload);
            return JSON.parse(payload);
        } catch (e) {
            return null;
        }
    }

    const token = localStorage.getItem("token");
    const user = token ? parseJwt(token) : null;
    const id_usuario = user?.id;

    const handleUpload = async () => {
        try {
            const formData = new FormData();

            formData.append("tipo", tipo);

            if (tipo === "texto") {
                if (!texto) return alert("Escribe un mensaje");
                formData.append("contenido", texto);
            } else {
                if (!file) return alert("Selecciona un archivo");
                formData.append("file", file);
            }

            const token = localStorage.getItem("token");

            const res = await fetch("http://https://fragility-culinary-charter.ngrok-free.dev/testimony", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`
                },
                body: formData,
            });

            const data = await res.json();

            alert("Testimonio enviado correctamente");
            setTexto("")
            setFile(null);

        } catch (error) {
            console.error(error);
            alert("Error");
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
                    <textarea
                        placeholder="Escribe tu mensaje..."
                        value={texto}
                        onChange={(e) => setTexto(e.target.value)}
                    />
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