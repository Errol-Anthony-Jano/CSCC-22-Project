import styles from "./adduserpopup.module.css";

function AddUserPopup({ onClose }) {
  return (
    <div className={styles.popup}>
      <div className={styles.addpopup}>
        <h1 className={styles.addusertitle}>Add User</h1>
        <h3>Username</h3>
        <input type="text" placeholder="Enter username" className={styles.textdesign} />
        <h3>User ID</h3>
        <input type="text" placeholder="Enter user ID" className={styles.textdesign} />
        <h3>Role</h3>
        <input type="text" placeholder="Enter role (e.g. admin, user)" className={styles.textdesign} />
        <h3>Password</h3>
        <input type="password" placeholder="Enter password" className={styles.textdesign} />
        <h3>Confirm Password</h3>
        <input type="password" placeholder="Confirm password" className={styles.textdesign} />
        <div className={styles.buttonRow}>
          <button onClick={onClose} className={styles.buttonpop}>Done</button>
          <button onClick={onClose} className={styles.buttonpop}>Cancel</button>
        </div>
      </div>
    </div>
  );
}

export default AddUserPopup;