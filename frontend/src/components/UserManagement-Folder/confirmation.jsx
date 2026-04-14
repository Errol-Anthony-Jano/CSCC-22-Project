import "./confirmation.module.css";

function Confirmation({onClose}) {
    return (
        <div className="confirmationpage">
            <div className="confirmationcontainer">
                <h1 className="confirmationtitle">REMOVING</h1>
                <p className="confirmationmessage">Are you sure you want to remove this user?</p>
                <button onClick={onClose} className="confirmbuttons">Yes</button> {/*need to change this if hi connect sa database*/}
                <button onClick={onClose} className="confirmbuttons">Cancel</button>
            </div>
        </div>
    );
}
export default Confirmation;