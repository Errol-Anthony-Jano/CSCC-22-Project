import "./welcomeuser.css";
import { useNavigate } from "react-router-dom";
function Welcomeuser() {
    const navigate = useNavigate();
    return (
        <div className ="welcomeuserpage">
            <h1 className ="welcome">Welcome</h1>
            <div className="button-group">
            <button onClick={() => navigate("/topproduct")} className = "startbutton">Start</button>
            <button onClick={() => {localStorage.clear(); window.location.href = "about:blank";}}className="exitbutton">Exit</button>
            </div>
        </div>
    );
}

export default Welcomeuser;