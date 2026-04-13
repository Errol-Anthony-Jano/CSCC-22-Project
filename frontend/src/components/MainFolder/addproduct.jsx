import "./addsales.module.css";

function AddProduct({ onClose }) {
    return (
        <div className="addpopsbg">
            <div className="addpops">
        <h1 className="producttitle">ADDING...</h1>
        <h3>PRODUCT:</h3>
        <input type="text" placeholder="Enter Item" className="input" />
        <h3>QUANTITY</h3>
        <input type="number" placeholder="Enter Quantity" className="input"/>
        <h3>PRICE</h3>
        <input type="number" placeholder="Enter Price" className="input"/>
        <button className="buttonpop">Add</button>
        <button onClick={onClose} className="buttonpop">Cancel</button>
        </div>
        </div>
       
    )
}
export default AddProduct;