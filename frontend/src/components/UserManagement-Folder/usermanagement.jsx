import "./usermanagement.module.css";
import AddUserPopup from "./adduserpopup";
import RemoveUserPopup from "./removeuserpopup";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
function UserManagement() {
    const [showAdd, setShowAdd] = useState(false);
    const [showRemove, setShowRemove] = useState(false);
    const navigate = useNavigate();
    return (
        <div>
            <div className="header">
            <h1 className="usermantitle1">User Management</h1>
            <button className="backbutton" onClick = {() => navigate("/welcomeadmin")}>Back</button>
            </div>
              <hr className="line1"/>
            <button className="adduserbutton" onClick ={() => setShowAdd(true)}>Add User</button>
            <button className="removeuserbutton" onClick={() => setShowRemove(true)}>Remove User</button>
             <h1 className="recent">Most Recent</h1>
             <input type="search" placeholder="Search..." className="search"/>
             <div className="table">
             <h1> Users </h1>
             <h1> ID </h1>
             <h1> Role </h1>
             <hr className="line2" />
             </div>
             {showAdd && <AddUserPopup onClose={() => setShowAdd(false)} />}
             {showRemove && <RemoveUserPopup onClose={() => setShowRemove(false)} />}
             
             
        </div>
    );
}
export default UserManagement;