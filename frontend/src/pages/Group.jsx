import BottomNav from "./BottomNav";
import { UsersRound } from "lucide-react";

function Group() {
    return (
        <div className="migrupo">
            <div className="dashboardhead">
                <div className="logohead">
                    <img
                        src="/logo.png"
                        alt="Rescate7"
                        className="logoLogIn"
                    />
                </div>
                <div className="iglesiahead">
                    <UsersRound size={60} />
                    MI GRUPO
                </div>
            </div>
            <div style={{ height: "30vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <div style={{ backgroundColor: "#072A60", width: "75%", height: "75%", borderRadius: "20px", textAlign: "center", display: "flex", flexDirection: "column", justifyContent: "center" }}>
                    <span>Grupo</span>
                    <span>Lider de Grupo</span>
                    <span>NOMBRE</span>
                </div>
            </div>
            <div style={{ height: "20vh", display: "flex", justifyContent: "center", gap: "2.5%" }}>
                <div style={{ height: "100%", width: "30%" }}>
                    <span>Ranking Nro.</span>
                    <div style={{ height: "50%", aspectRatio: "1/1", backgroundColor: "yellowgreen" }}>

                    </div>
                </div>
                <div style={{ height: "100%", width: "30%" }}>
                    <span>Usuarios Invitados</span>
                    <div style={{ height: "50%", aspectRatio: "1/1", backgroundColor: "yellowgreen" }}>

                    </div>
                </div>
                <div style={{ height: "100%", width: "30%" }}>
                    <span>Usuarios Registrados</span>
                    <div style={{ height: "50%", aspectRatio: "1/1", backgroundColor: "yellowgreen" }}>

                    </div>
                </div>
            </div>
            <div style={{ height: "30vh" }}>

            </div>
            <BottomNav />
        </div>
    )
}
export default Group