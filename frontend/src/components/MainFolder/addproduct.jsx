import { useState } from "react";
import styles from "./addproduct.module.css";

function AddProduct({ onClose }) {
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');

  const handleAdd = async () => {
    if (!name || !quantity || !price) {
      alert('Please fill all fields');
      return;
    }
    try {
      const response = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          product_name: name,
          product_quantity: parseInt(quantity),
          product_unit_price: parseInt(price),
          is_still_offered: true
        })
      });
      if (!response.ok) throw new Error('Add failed');
      onClose(); // close popup and refresh list in parent
    } catch (err) {
      console.error(err);
      alert('Failed to add product');
    }
  };

  return (
    <div className={styles.addpopsbg}>
      <div className={styles.addpops}>
        <h1 className={styles.producttitle}>ADDING...</h1>
        <h3>PRODUCT:</h3>
        <input type="text" placeholder="Enter Item" className={styles.input}
          value={name} onChange={e => setName(e.target.value)} />
        <h3>QUANTITY</h3>
        <input type="number" placeholder="Enter Quantity" className={styles.input}
          value={quantity} onChange={e => setQuantity(e.target.value)} />
        <h3>PRICE</h3>
        <input type="number" placeholder="Enter Price" className={styles.input}
          value={price} onChange={e => setPrice(e.target.value)} />
        <button className={styles.buttonpop} onClick={handleAdd}>Add</button>
        <button onClick={onClose} className={styles.buttonpop}>Cancel</button>
      </div>
    </div>
  );
}

export default AddProduct;