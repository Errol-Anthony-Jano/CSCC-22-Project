import styles from "./topproduct.module.css";
import { Navbar } from "../MainFolder/Navbar";
import { useState, useEffect } from "react";

function TopProduct() {
    const [topProducts, setTopProducts] = useState([]);
    const [bestProduct, setBestProduct] = useState(null);

    useEffect(() => {
        loadTopProducts();
    }, []);

    const loadTopProducts = () => {
        // Get transactions from localStorage
        const storedTransactions = localStorage.getItem("transactions");
        
        if (storedTransactions) {
            const transactions = JSON.parse(storedTransactions);
            
            // Calculate total quantity sold per product
            const productSales = {};
            transactions.forEach(transaction => {
                if (productSales[transaction.product]) {
                    productSales[transaction.product].quantity += transaction.quantity;
                    productSales[transaction.product].revenue += transaction.revenue;
                } else {
                    productSales[transaction.product] = {
                        quantity: transaction.quantity,
                        revenue: transaction.revenue
                    };
                }
            });
            
            // Convert to array and sort by quantity sold
            const sortedProducts = Object.entries(productSales)
                .map(([name, data]) => ({ 
                    name, 
                    quantity: data.quantity, 
                    revenue: data.revenue 
                }))
                .sort((a, b) => b.quantity - a.quantity)
                .slice(0, 5);
            
            setTopProducts(sortedProducts);
            
            // Set the #1 best selling product
            if (sortedProducts.length > 0) {
                setBestProduct(sortedProducts[0]);
            } else {
                setBestProduct(null);
            }
        } else {
            // Demo data if no transactions exist
            const demoTopProducts = [
                { name: "Wireless Earbuds", quantity: 45, revenue: 112500 },
                { name: "Gaming Mouse", quantity: 38, revenue: 45600 },
                { name: "Mechanical Keyboard", quantity: 32, revenue: 112000 },
                { name: "USB-C Hub", quantity: 28, revenue: 22400 },
                { name: "Laptop Stand", quantity: 25, revenue: 37500 },
            ];
            setTopProducts(demoTopProducts);
            setBestProduct(demoTopProducts[0]);
        }
    };

    return (
        <div className={styles.page}>
            <Navbar/>
            <div className={styles.main}>
                <div className={styles.bestsold}>
                    {bestProduct ? (
                        <div className={styles.bestProductContent}>
                            <span className={styles.bestProductName}>{bestProduct.name}</span>
                            <span className={styles.bestProductSold}>Best Sold Product</span>
                        </div>
                    ) : (
                        <span>Best Sold Product</span>
                    )}
                </div>
                <h1 className={styles.topproduct}>Top 5 Best Selling Products</h1>
                <div className={styles.container}>
                    <div className={styles.listHeader}>
                        <span>#</span>
                        <span>Product Name</span>
                        <span>Quantity</span>
                        <span>Revenue</span>
                    </div>
                    <hr />
                    <div className={styles.productList}>
                        {topProducts.map((product, index) => (
                            <div key={index} className={styles.productItem}>
                                <span className={styles.rank}>{index + 1}</span>
                                <span className={styles.productName}>{product.name}</span>
                                <span className={styles.productQuantity}>{product.quantity} units</span>
                                <span className={styles.productRevenue}>₱{product.revenue.toLocaleString()}</span>
                            </div>
                        ))}
                        {topProducts.length === 0 && (
                            <div className={styles.noData}>
                                <p>No sales data available yet.</p>
                                <p style={{ fontSize: "12px", marginTop: "10px" }}>Add transactions in Sales page to see top products.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>  
    );
}

export default TopProduct;