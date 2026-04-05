import "./removeuserpopup.css";
import Confirmation from "./confirmation";
import { useState } from "react";
function RemoveUserPopup({ onClose }) {
      const [showConfirm, setShowConfirm] = useState(false);
    return (
        <div className="popup">
            <div className="removepopup">
                <h1 className="removeusertitle">Remove User</h1>
                <h3>Username:</h3>
                <input type="text" placeholder="Enter Username" className="text-design"/>
                <h3>ID:</h3>
                <input type="text" placeholder="Enter User ID" className="text-design"/>
                <button onClick={() => setShowConfirm(true)} className="buttonpop">Confirm</button>
                <br />
                <button onClick={onClose}className="buttonpop">Cancel</button> {/*will be back */}
            </div>
            {showConfirm && <Confirmation onClose={() => setShowConfirm(false)} />}
      </div>
    );
}
export default RemoveUserPopup;