import BottomNav from "./BottomNav";
import { Church } from "lucide-react";
function Iglesia() {
    return (
        <div className="iglesia">
            <div className="dashboardhead">
                <div className="logohead">
                    <img
                        src="/logo.png"
                        alt="Rescate7"
                        className="logoLogIn"
                    />
                </div>
                <div className="iglesiahead">
                    <Church size={60} />
                    MI IGLESIA
                </div>
            </div>
            <BottomNav />
        </div>
    )
}
export default Iglesia;