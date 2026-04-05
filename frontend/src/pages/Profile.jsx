import BottomNav from "./BottomNav";
import { CircleUserRound } from "lucide-react";
function Profile() {
    return (
        <div className="login">
            <div className="dashboardhead">
                <div className="logohead">
                    <img
                        src="/logo.png"
                        alt="Rescate7"
                        className="logoLogIn"
                    />
                </div>
                <div className="iglesiahead">
                    <CircleUserRound size={60}/>
                    PERFIL DE USUARIO
                </div>
            </div>
            <BottomNav />
        </div>
    )
}
export default Profile;