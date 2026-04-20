import styles from "./welcomeuser.module.css";
import { useNavigate } from "react-router-dom";

function Welcomeuser() {
  const navigate = useNavigate();
  return (
    <div className={styles.welcomeuserpage}>
      <h1 className={styles.welcome}>Welcome 👋</h1>
      <div className={styles["button-group"]}>
        <button onClick={() => navigate("/topproduct")} className={styles.startbutton}>
          Go to Dashboard →
        </button>
      </div>
    </div>
  );
}

export default Welcomeuser;