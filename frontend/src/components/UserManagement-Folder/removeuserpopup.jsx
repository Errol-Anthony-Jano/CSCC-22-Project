import "./removeuserpopup.css";
import { useState } from "react";
import axios from "axios";

function RemoveUserPopup({ onClose }) {
    const [username, setUsername] = useState("");
    const [userId, setUserId] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const API_BASE_URL = "http://localhost:3000";

    const handleArchive = async () => {
        if (!username  && !userId ) {
             setError("Please enter both username and user ID.");
            return;
        } if (!userId) {
             setError("Please enter user ID.");
            return;
        }  if (!username) {
        setError("Please enter username.");
        return;
    }
        setLoading(true);
        setError("");

        try {
            console.log("Sending DELETE request..."); 
            const response = await axios.delete(`${API_BASE_URL}/users/${userId}`);
            console.log("Success:", response.data);
            alert("User archived successfully!");
            onClose();
        } catch (err) {
            console.error("Full error:", err); 
            setError(err.message || "Request failed");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="popup">
            <div className="removepopup">
                <h1 className="removeusertitle">Remove User</h1>
                <h3>Username:</h3>
                <input type="text" placeholder="Enter Username" className="text-design" 
                       value={username} onChange={(e) => setUsername(e.target.value)}/>
                <h3>ID:</h3>
                <input type="text" placeholder="Enter User ID" className="text-design" 
                       value={userId} onChange={(e) => setUserId(e.target.value)}/>
                {error && <div style={{color: "red", margin: "10px 0"}}>{error}</div>}
                <button onClick={handleArchive} className="buttonpop" disabled={loading}>
                    {loading ? "Processing..." : "Confirm"}
                </button>
                <br />
                <button onClick={onClose} className="buttonpop">Cancel</button>
            </div>
        </div>
    );
}

export default RemoveUserPopup;