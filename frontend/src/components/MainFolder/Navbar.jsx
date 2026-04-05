import "./Navbar.css";
import { useNavigate } from "react-router-dom";
export const Navbar = () => {
  const navigate = useNavigate();
  return (
    <nav>
      <div className = "header">
      <button onClick={() => navigate("/topproduct")}>Top Product</button>
      <button onClick ={()=> navigate("/sales")}>Sales</button>
      <button>Inventory</button>
      <button onClick ={()=> navigate("/returns")}>Returns</button>
      <button>Activity Log</button>
      <button>Overall reports</button>
       <button onClick ={()=> navigate("/login")}className="logoutbutton">Logout</button>
      </div>
      <hr />
      
    </nav>
  );
};
export default Navbar;