import { useState, useEffect } from "react";
import styles from "./sales.module.css";
import { Navbar } from "../MainFolder/Navbar";
import AddSales from "./addsales";
import EditSales from "./editsales";

function Sales() {
  const [sales, setSales] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showaddsales, setshowaddsales] = useState(false);
  const [showeditsales, setshoweditsales] = useState(false);

  const fetchSales = async () => {
    try {
      const response = await fetch('/api/transactions');
      if (!response.ok) throw new Error('Failed to fetch');
      const data = await response.json();
      // Flatten each transaction with its items
      const flattened = [];
      data.forEach(txn => {
        if (txn.transaction_items) {
          txn.transaction_items.forEach(item => {
            flattened.push({
              id: txn.transaction_id,
              product: item.product_name,
              datetime: txn.transaction_timestamp,
              paymentMethod: txn.payment_type,
              revenue: item.quantity_bought * item.product_unit_price
            });
          });
        }
      });
      setSales(flattened);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSales();
  }, []);

  if (loading) return <div>Loading sales...</div>;

  return (
    <div>
      <Navbar />
      <input type="search" placeholder="Search..." className={styles.search1} />
      <button className={styles.add} onClick={() => setshowaddsales(true)}>ADD</button>
      <button className={styles.edit} onClick={() => setshoweditsales(true)}>EDIT</button>
      <h1 className={styles.soldtransactions}>Sold Transactions</h1>
      <div className={styles.container1}>
        <h1 className={styles.products}>Products</h1>
        <h1 className={styles.datentime}>Date & Time</h1>
        <h1 className={styles.method}>Payment Method</h1>
        <h1 className={styles.revenue}>Revenue</h1>
        <h1 className={styles.action}>Action</h1>
        <hr className={styles.line} />
        {sales.map((sale, idx) => (
          <div key={idx} className={styles.row}>
            <span>{sale.product}</span>
            <span>{new Date(sale.datetime).toLocaleString()}</span>
            <span>{sale.paymentMethod}</span>
            <span>₱{sale.revenue}</span>
            <button>Edit</button>
          </div>
        ))}
      </div>
      {showaddsales && <AddSales onClose={() => { setshowaddsales(false); fetchSales(); }} />}
      {showeditsales && <EditSales onClose={() => setshoweditsales(false)} />}
    </div>
  );
}

export default Sales;