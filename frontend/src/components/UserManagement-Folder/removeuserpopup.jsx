import styles from "./removeuserpopup.module.css";
import Confirmation from "./confirmation";
import { useState } from "react";

function RemoveUserPopup({ onClose, onUserRemoved, users = [] }) {
    const [showConfirm, setShowConfirm] = useState(false);
    const [username, setUsername] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [foundUser, setFoundUser] = useState(null);

    const handleUsernameChange = (e) => {
        const value = e.target.value;
        setUsername(value);
        setError("");
        
        // Auto-search as user types
        if (value.trim()) {
            const user = users.find(u => u.username.toLowerCase() === value.toLowerCase());
            setFoundUser(user || null);
            if (!user) {
                setError(`User "${value}" not found.`);
            } else {
                setError("");
            }
        } else {
            setFoundUser(null);
            setError("");
        }
    };

    const handleArchive = () => {
        return new Promise((resolve) => {
            setLoading(true);
            setTimeout(() => {
                if (foundUser && onUserRemoved) {
                    onUserRemoved(foundUser.username);
                    resolve(true);
                } else {
                    resolve(false);
                }
                setLoading(false);
            }, 500);
        });
    };

    const handleConfirmClick = () => {
        setError("");
        if (!username.trim()) {
            setError("Please enter username.");
            return;
        }
        
        const user = users.find(u => u.username.toLowerCase() === username.toLowerCase());
        if (!user) {
            setError(`User "${username}" not found.`);
            return;
        }
        
        setFoundUser(user);
        setShowConfirm(true);
    };

    return (
        <div className={styles.popup}>
            <div className={styles.removepopup}>
                <h1 className={styles.removeusertitle}>Remove User</h1>
                
                <h3>Username:</h3>
                <input 
                    type="text" 
                    placeholder="Enter Username" 
                    className={styles.textdesign}
                    value={username} 
                    onChange={handleUsernameChange}
                />
                
                {foundUser && (
                    <div className={styles.userInfo} style={{ 
                        backgroundColor: "#f9f5f0", 
                        padding: "12px", 
                        borderRadius: "8px",
                        marginTop: "10px",
                        border: "1px solid #e0d0c5"
                    }}>
                        <p style={{ margin: "5px 0" }}><strong>Username:</strong> {foundUser.username}</p>
                        <p style={{ margin: "5px 0" }}><strong>Role:</strong> {foundUser.role}</p>
                        <p style={{ margin: "5px 0", fontSize: "12px", color: "#666" }}>
                            <strong>Created:</strong> {foundUser.createdAt}
                        </p>
                    </div>
                )}
                
                {error && (
                    <div className={styles.errorMessage} style={{ color: "red", textAlign: "center", marginTop: "10px", fontSize: "13px" }}>
                        {error}
                    </div>
                )}
                
                <button 
                    onClick={handleConfirmClick} 
                    className={styles.buttonpop}
                    disabled={loading || !foundUser}
                >
                    {loading ? "Processing..." : "Confirm Remove"}
                </button>
                <br />
                <button onClick={onClose} className={styles.buttonpop}>Cancel</button>
            </div>
            
            {showConfirm && foundUser && (
                <Confirmation 
                    onConfirm={handleArchive} 
                    onClose={() => setShowConfirm(false)}
                    username={foundUser.username}
                />
            )}
        </div>
    );
}

export default RemoveUserPopup;