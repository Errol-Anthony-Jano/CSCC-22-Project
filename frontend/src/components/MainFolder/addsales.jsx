import { useState } from "react";
import styles from "./addsales.module.css";

function AddSales({ onClose }) {
  const [productName, setProductName] = useState('');
  const [datetime, setDatetime] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [revenue, setRevenue] = useState('');
  const [quantity, setQuantity] = useState('');

  const handleAdd = async () => {
    if (!productName || !datetime || !paymentMethod || !revenue || !quantity) {
      alert('Please fill all fields');
      return;
    }

    // You need a valid product_id. For simplicity, we'll first fetch existing products,
    // or you can add a product selection dropdown. Here we'll assume product_id 1 exists.
    // In a real app, you'd select a product from a list.
    const productId = 1; // Replace with actual selected product ID

    try {
      const response = await fetch('/api/transactions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          operation: 'insert',
          transaction_timestamp: datetime,
          payment_type: paymentMethod,
          created_by: 1, // Hardcoded admin user_id – you should get from logged-in user
          items: [{
            product_id: productId,
            product_name: productName,
            product_unit_price: parseInt(revenue),
            quantity_bought: parseInt(quantity)
          }]
        })
      });
      if (!response.ok) throw new Error('Add sale failed');
      onClose(); // closes popup and refreshes sales list in parent
    } catch (err) {
      console.error(err);
      alert('Failed to add sale');
    }
  };

  return (
    <div className={styles.addpopsbg}>
      <div className={styles.addpops}>
        <h1 className={styles.producttitle}>ADDING...</h1>
        <h3>PRODUCT:</h3>
        <input
          type="text"
          placeholder="Enter Product Name"
          className={styles.input}
          value={productName}
          onChange={e => setProductName(e.target.value)}
        />
        <h3>QUANTITY:</h3>
        <input
          type="number"
          placeholder="Enter Quantity"
          className={styles.input}
          value={quantity}
          onChange={e => setQuantity(e.target.value)}
        />
        <h3>DATE & TIME</h3>
        <input
          type="datetime-local"
          className={styles.input}
          value={datetime}
          onChange={e => setDatetime(e.target.value)}
        />
        <h3>PAYMENT METHOD:</h3>
        <select
          className={styles.paymentmethod}
          value={paymentMethod}
          onChange={e => setPaymentMethod(e.target.value)}
        >
          <option value="">Select Method</option>
          <option value="cash">Cash</option>
          <option value="gcash">Gcash</option>
          <option value="credit">Credit Card</option>
          <option value="debit">Debit Card</option>
          <option value="cheque">Cheque</option>
        </select>
        <h3>REVENUE:</h3>
        <input
          type="number"
          placeholder="Enter Price"
          className={styles.input}
          value={revenue}
          onChange={e => setRevenue(e.target.value)}
        />
        <button className={styles.buttonpop} onClick={handleAdd}>Add</button>
        <button onClick={onClose} className={styles.buttonpop}>Cancel</button>
      </div>
    </div>
  );
}

export default AddSales;