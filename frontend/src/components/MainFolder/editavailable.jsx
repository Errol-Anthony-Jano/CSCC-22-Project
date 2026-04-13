import { useState } from "react";
import "./editsales.module.css";

function EditAvailable({ product, onClose, onSave }) {
  const [quantity, setQuantity] = useState(product?.quantity ?? "");
  const [price, setPrice] = useState(product?.price ? product.price.replace(/[^\d]/g, "") : "");

  const handleSave = () => {
    const updatedQuantity = quantity === "" ? product.quantity : Number(quantity);
    const sanitizedPrice = price === "" ? product.price : `₱${price.replace(/[^\d]/g, "")}`;

    onSave({
      quantity: updatedQuantity,
      price: sanitizedPrice,
    });
  };

  return (
    <div className="editpopsbg">
      <div className="editpops">
        <h1 className="producttitle">EDITING...</h1>
        <h3 className="message">Leave blank if no changes are needed</h3>
        <h3>PRODUCT:</h3>
        <input type="text" value={product.name} className="input" disabled />
        <h3>QUANTITY</h3>
        <input
          type="number"
          placeholder="Enter Quantity"
          className="input"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />
        <h3>PRICE</h3>
        <input
          type="number"
          placeholder="Enter Price"
          className="input"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        <button className="buttonpop" onClick={handleSave}>Save</button>
        <button onClick={onClose} className="buttonpop">Cancel</button>
      </div>
    </div>
  );
}

export default EditAvailable;