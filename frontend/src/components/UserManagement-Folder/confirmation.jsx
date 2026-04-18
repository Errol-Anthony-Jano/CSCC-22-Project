import styles from "./confirmation.module.css";

function Confirmation({onConfirm, onClose}) {
    return (
        <div className={styles.confirmationpage}>
            <div className={styles.confirmationcontainer}>
                <h1 className={styles.confirmationtitle}>REMOVING</h1>
                <p className={styles.confirmationmessage}>Are you sure you want to remove this user?</p>
                <button onClick={onConfirm} className={styles.confirmbuttons}>Yes</button> {/*need to change this if hi connect sa database*/}
                <button onClick={onClose} className={styles.confirmbuttons}>Cancel</button>
            </div>
        </div>
    );
}
export default Confirmation;