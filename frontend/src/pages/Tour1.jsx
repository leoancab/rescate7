import BackButton from "../components/BackButton"
function Tour1() {
    return (
        <div className="tour1">
            <BackButton />
            <div>
                <img
                    src="/logo.png"
                    alt="Rescate7"
                    class="titulo"
                />
            </div>
            <h3>Que es Rescate7?</h3>
            <p className="tourtexto">
                Es un aplicativo web cuyo objetivo<br />
                es convertirse en la<br />
                principal herramienta digital para<br />
                todos los miembros de Iglesia con<br />
                el cual podrán realizar<br />
                actividades misioneras siguiendo<br />
                un Modelo de Gestión<br />
                Evangelístico que sigue un “Plan<br />
                de Rescate y Renovación de la<br />
                FE“ el cual los entrenará para<br />
                convertirlos en agentes<br />
                misioneros que van a ir al rescate<br />
                de personas que necesitan<br />
                conocer el amor de<br />
                Dios y su Evangelio.
            </p>
        </div>
    )
}
export default Tour1