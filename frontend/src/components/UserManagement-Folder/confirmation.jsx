import styles from "./confirmation.module.css";

function Confirmation({ onConfirm, onClose }) {
  return (
    <div className={styles.overlay}>
      <div className={styles.card}>
        <div className={styles.icon}>⚠️</div>
        <h2 className={styles.title}>Are you sure?</h2>
        <p className={styles.message}>This user will be archived and can no longer log in. This action cannot be easily undone.</p>
        <div className={styles.buttonRow}>
          <button className={styles.confirmBtn} onClick={onConfirm}>Yes, Remove</button>
          <button className={styles.cancelBtn} onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
}

export default Confirmation;