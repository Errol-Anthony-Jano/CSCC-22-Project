import styles from "./topproduct.module.css";
import { Navbar } from "../MainFolder/Navbar";
import { useTransactions } from "../../hooks/useTransactions";
import { useState, useEffect } from "react";

function TopProduct() {
    const { data: transactionsData, isLoading } = useTransactions();
    const [topProducts, setTopProducts] = useState([]);
    const [bestProduct, setBestProduct] = useState(null);

    useEffect(() => {
        if (transactionsData) {
            // Handle different response structures
            let transactions = [];
            if (Array.isArray(transactionsData)) {
                transactions = transactionsData;
            } else if (transactionsData.data && Array.isArray(transactionsData.data)) {
                transactions = transactionsData.data;
            }
            
            if (transactions.length > 0) {
                // Calculate total quantity sold per product
                const productSales = {};
                transactions.forEach(transaction => {
                    const productName = transaction.product_name;
                    if (productSales[productName]) {
                        productSales[productName].quantity += transaction.quantity || 1;
                        productSales[productName].revenue += transaction.total_revenue || 0;
                    } else {
                        productSales[productName] = {
                            quantity: transaction.quantity || 1,
                            revenue: transaction.total_revenue || 0
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
                setBestProduct(sortedProducts.length > 0 ? sortedProducts[0] : null);
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
        } else {
            // Initial demo data while loading
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
    }, [transactionsData]);

    if (isLoading) return <div className={styles.loading}>Loading...</div>;

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
                    </div>
                </div>
            </div>
        </div>  
    );
}

export default TopProduct;