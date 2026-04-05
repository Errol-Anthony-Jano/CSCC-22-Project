import "./removesales.css";
function RemoveSales({ onClose }) {
  return (
    <div className="confirmpage">
        <div className="confirmcontainer">
        <h1 className="confirmationtitle">REMOVING</h1>
      <h3 className="confirmationmessage">Are you sure you want to drop this record?</h3>
      <button className="confirmbuttons">Confirm</button>
      <button onClick={onClose} className="confirmbuttons">Cancel</button>
      </div>
    </div>
  );
}
export default RemoveSales;