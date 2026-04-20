import styles from "./welcomeadmin.module.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function Welcomeadmin() {
  const navigate = useNavigate();
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setTimeout(() => setMounted(true), 50); }, []);

  return (
    <div className={styles.welcomeadminpage}>
      <button onClick={() => navigate("/usermanagement")} className={styles.usermanagement}>
        User Management
      </button>
      <h1 className={styles.welcome}>Welcome, Admin 👋</h1>
      <p className={styles.subtitle}>Manage your business from the dashboard below.</p>
      <div className={styles.buttonGroup}>
        <button onClick={() => navigate("/topproduct")} className={styles.startbutton}>
          Go to Dashboard →
        </button>
      </div>
    </div>
  );
}

export default Welcomeadmin;