import { Home, UsersRound, LayoutPanelTop, Heart, User, Church } from "lucide-react";

export default function BottomNav() {
    return (
        <div className="bottom-nav">
            <button className="nav-item">
                <Home size={24} />
            </button>
            <button className="nav-item">
                <UsersRound size={24} />
            </button>
            <button className="nav-item">
                <LayoutPanelTop size={24} />
            </button>
            <button className="nav-item">
                <Heart size={24} />
            </button>
            <button className="nav-item">
                <User size={24} />
            </button>
            <button className="nav-item">
                <Church size={24} />
            </button>
        </div>
    );
}