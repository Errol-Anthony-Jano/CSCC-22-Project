import "./addsales.css";

function AddSales({ onClose }) {
    return (
        <div className="addpopsbg">
            <div className="addpops">
        <h1 className="producttitle">ADDING...</h1>
        <h3>PRODUCT:</h3>
        <input type="text" placeholder="Enter Item" className="input" />
        <h3>DATE & TIME</h3>
        <input type="datetime-local" className="input"/>
        <h3>PAYMENT METHOD:</h3>
        <select className="paymentmethod">
            <option value="">Select Method</option>
            <option value="cash">Cash</option>
             <option value="gcash">Gcash</option>
            <option value="credit">Credit Card</option>
            <option value="debit">Debit Card</option>
            <option value="cheque">Cheque</option>
           
        </select>
        <h3>REVENUE:</h3>
        <input type="number" placeholder="Enter Price" className="input"/>

        <button className="buttonpop">Add</button>
        <button onClick={onClose} className="buttonpop">Cancel</button>
        </div>
        </div>
       
    )
}
export default AddSales;