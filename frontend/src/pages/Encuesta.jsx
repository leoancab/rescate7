import { useState } from "react";
import BottomNav from "./BottomNav";

function Encuesta() {
    const [indice, setIndice] = useState(0);
    const [respuestas, setRespuestas] = useState([]);
    const colores = ["#F32D39", "#F38C2D", "#45BD4A", "#2D7CF3"];
    const preguntas = [
        {
            pregunta: "1. Con que frecuencia asistes a la iglesia?",
            opciones: ["Muy poco", "Poco", "A menudo", "Siempre"]
        },
        {
            pregunta: "2. Con que frecuencia practicas la oración?",
            opciones: ["Muy poco", "Poco", "A menudo", "Siempre"]
        },
        {
            pregunta: "3. Lee y estudia material de Escuela Sabática?",
            opciones: ["Muy poco", "Poco", "A menudo", "Siempre"]
        }
    ];
    const puntajes = {
        "Muy poco": 4,
        "Poco": 6,
        "A menudo": 8,
        "Siempre": 10
    };
    const manejarRespuesta = (opcion) => {
        const valor = puntajes[opcion];
        setRespuestas([...respuestas, valor]);
        setIndice(indice + 1);
    };

    if (indice >= preguntas.length) {
        const total = respuestas.reduce((a, b) => a + b, 0);
        return (
            <div className="puntaje">
                <div className="contenedorlogoLogin">
                    <img
                        src="/logo.png"
                        alt="Rescate7"
                        className="logoLogIn"
                    />
                </div>
                <h2>No te rindas!</h2>
                <p>Puntaje total: {total}</p>
                <div>
                    
                </div>
                <BottomNav />
            </div>
        );
    }
    return (
        <div className="encuestafondo">
            <div className="contenedorlogoLogin">
                <img
                    src="/logo.png"
                    alt="Rescate7"
                    className="logoLogIn"
                />
            </div>
            <div className="numpreguntaencuesta">
                Pregunta {indice + 1} de {preguntas.length}
            </div>
            <div className="preguntaencuesta">
                {preguntas[indice].pregunta}
            </div>
            <div className="opcionesencuesta">
                {preguntas[indice].opciones.map((opcion, index) => (
                    <button
                        key={opcion}
                        onClick={() => manejarRespuesta(opcion)}
                        style={{
                            backgroundColor: colores[index],
                            color: "white",
                            border: "none",
                            borderRadius: "8px",
                            padding: "10px 20px",
                            margin: "5px",
                            cursor: "pointer"
                        }}
                    >
                        {opcion}
                    </button>
                ))}
            </div>
            <BottomNav />
        </div>
    );
}

export default Encuesta;