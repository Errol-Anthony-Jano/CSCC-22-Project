import "./adduserpopup.module.css";
function AddUserPopup({ onClose }) {
    return (
        <div className="popup">
            <div className="addpopup">
                <h1 className="addusertitle">Add User</h1>
                <h3>Username:</h3>
                <input type="text" placeholder="Enter Username" className="text-design"/>
                <h3>ID:</h3>
                <input type="text" placeholder="Enter User ID" className="text-design"/>
                <h3>Role:</h3>
                <input type="text" placeholder="Enter Role" className="text-design"/>
                <h3>Password:</h3>
                <input type="password" placeholder="Enter Password" className="text-design"/>
                <h3>Confirm Password:</h3>
                <input type="password" placeholder="Confirm Password" className="text-design"/>
                <button onClick={onClose} className="buttonpop">Done</button>
                <br />
                <button onClick={onClose}className="buttonpop">Cancel</button> {/*will be back */}
            </div>
      </div>
    );
}
export default AddUserPopup;