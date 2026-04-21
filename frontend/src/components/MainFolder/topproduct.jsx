import { useState, useEffect } from "react";
import styles from "./topproduct.module.css";
import { Navbar } from "../MainFolder/Navbar";

function TopProduct() {
  const [topProduct, setTopProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTopProduct = async () => {
      try {
        const response = await fetch('/api/reports/top-product');
        if (!response.ok) throw new Error('Failed to fetch');
        const data = await response.json();
        setTopProduct(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchTopProduct();
  }, []);

  if (loading) return <div>Loading top product...</div>;

  return (
    <div className={styles.page}>
      <Navbar />
      <div className={styles.main}>
        <h1 className={styles.bestsold}>
          {topProduct ? topProduct.product_name : 'No sales yet'}
        </h1>
        <h1 className={styles.topproduct}>Best Selling Product</h1>
        <div className={styles.container}>
          <h1 className={styles.type}>
            Total sold: {topProduct ? topProduct.total_quantity : 0}
          </h1>
          <hr />
        </div>
      </div>
    </div>
  );
}

export default TopProduct;