import styles from './Navbar.module.css';
import { useNavigate } from "react-router-dom";

export const Navbar = () => {
  const navigate = useNavigate();
  return (
    <nav className={styles.navbar}>
      <div className={styles.brand}>
        <span className={styles.brandIcon}>◈</span>
        NexusPos
      </div>
      <div className={styles.nav}>
        <button onClick={() => navigate("/topproduct")}>Top Product</button>
        <button onClick={() => navigate("/sales")}>Sales</button>
        <button onClick={() => navigate("/Available")}>Inventory</button>
        <button onClick={() => navigate("/ActivLog")}>Activity Log</button>
        <button onClick={() => navigate("/Monthlyreport")}>Reports</button>
      </div>
      <button onClick={() => navigate("/login")} className={styles.logoutbutton}>Logout</button>
    </nav>
  );
};

export default Navbar;