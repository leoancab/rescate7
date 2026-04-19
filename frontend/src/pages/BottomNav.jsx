import { Home, UsersRound, LayoutPanelTop, Heart, User, Church } from "lucide-react";
import { Link } from "react-router-dom";
export default function BottomNav() {
    return (
        <div className="bottom-nav">
            <Link to="/dashboard" className="nav-item">
                <Home size={24} />
            </Link>
            <Link to="/group" className="nav-item">
                <UsersRound size={24} />
            </Link>
            <Link to="/management" className="nav-item">
                <LayoutPanelTop size={24} />
            </Link>
            <Link to="/counseling" className="nav-item">
                <Heart size={24} />
            </Link>
            <Link to="/profile" className="nav-item">
                <User size={24} />
            </Link>
            <Link to="/mi-iglesia" className="nav-item">
                <Church size={24} />
            </Link>
        </div>
    );
}