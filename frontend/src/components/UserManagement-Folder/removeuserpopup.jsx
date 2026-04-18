import styles from "./removeuserpopup.module.css";
import Confirmation from "./confirmation";
import { useState } from "react";
function RemoveUserPopup({ onClose }) {
      const [showConfirm, setShowConfirm] = useState(false);
    return (
        <div className={styles.popup}>
            <div className={styles.removepopup}>
                <h1 className={styles.removeusertitle}>Remove User</h1>
                <h3>Username:</h3>
                <input type="text" placeholder="Enter Username" className={styles.textdesign}/>
                <h3>ID:</h3>
                <input type="text" placeholder="Enter User ID" className={styles.textdesign}/>
                <button onClick={() => setShowConfirm(true)} className={styles.buttonpop}>Confirm</button>
                <br />
                <button onClick={onClose}className={styles.buttonpop}>Cancel</button> {/*will be back */}
            </div>
            {showConfirm && <Confirmation onClose={() => setShowConfirm(false)} />}
      </div>
    );
}
export default RemoveUserPopup;