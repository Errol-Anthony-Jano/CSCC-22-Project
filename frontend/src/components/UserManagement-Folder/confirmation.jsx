import styles from "./confirmation.module.css";
import { useState } from "react";

function Confirmation({ onConfirm, onClose, username }) {
    const [loading, setLoading] = useState(false);

    const handleYes = async () => {
        setLoading(true);
        try {
            const success = await onConfirm();
            if (success) {
                alert(`User "${username || 'the user'}" has been removed successfully!`);
                onClose();
            }
        } catch (err) {
            console.error(err);
            alert("Failed to remove user. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.confirmationpage}>
            <div className={styles.confirmationcontainer}>
                <h1 className={styles.confirmationtitle}>REMOVING</h1>
                <p className={styles.confirmationmessage}>
                    {username 
                        ? `Are you sure you want to remove "${username}"?` 
                        : "Are you sure you want to remove this user?"}
                </p>
                <p style={{ fontSize: "12px", color: "#999", marginTop: "-10px", marginBottom: "15px" }}>
                    This action cannot be undone.
                </p>
                <button 
                    onClick={handleYes} 
                    className={styles.confirmbuttons}
                    disabled={loading}
                >
                    {loading ? "Removing..." : "Yes"}
                </button>
                <button 
                    onClick={onClose} 
                    className={styles.confirmbuttons}
                    disabled={loading}
                >
                    Cancel
                </button>
            </div>
        </div>
    );
}

export default Confirmation;