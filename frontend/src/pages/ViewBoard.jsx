import BottomNav from "./BottomNav";

function ViewBoard() {
    return (
        <div className="dashboardfondo">
            <div className="dashboardhead">
                <div className="logohead">
                    <img
                        src="/logo.png"
                        alt="Rescate7"
                        className="logoLogIn"
                    />
                </div>
                <div className="opchead">

                </div>
            </div>
            <BottomNav />
        </div>
    )
}

export default ViewBoard