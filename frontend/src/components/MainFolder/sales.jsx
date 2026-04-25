import styles from "./sales.module.css";
import { Navbar } from "../MainFolder/Navbar";
import AddSales from "./addsales";
import EditSales from "./editsales";
import { useState, useEffect } from "react";

function Sales() {
    const [showaddsales, setshowaddsales] = useState(false);
    const [showeditsales, setshoweditsales] = useState(false);
    const [transactions, setTransactions] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedTransaction, setSelectedTransaction] = useState(null);

    useEffect(() => {
        loadTransactions();
    }, []);

    const loadTransactions = () => {
        const storedTransactions = localStorage.getItem("transactions");
        if (storedTransactions) {
            setTransactions(JSON.parse(storedTransactions));
        } else {
            const defaultTransactions = [
                { id: 1, product: "Wireless Earbuds", datetime: "2026-04-05T10:30", paymentMethod: "Cash", revenue: 2500, quantity: 2, transactionId: "" },
                { id: 2, product: "Gaming Mouse", datetime: "2026-04-04T15:20", paymentMethod: "Gcash", revenue: 1200, quantity: 1, transactionId: "GCASH-123456" },
                { id: 3, product: "Mechanical Keyboard", datetime: "2026-04-03T11:45", paymentMethod: "Bank Transfer", revenue: 3500, quantity: 1, transactionId: "" },
                { id: 4, product: "USB-C Hub", datetime: "2026-04-02T09:15", paymentMethod: "Cash", revenue: 800, quantity: 3, transactionId: "" },
                { id: 5, product: "Laptop Stand", datetime: "2026-04-01T14:30", paymentMethod: "Gcash", revenue: 1500, quantity: 2, transactionId: "GCASH-789012" },
            ];
            setTransactions(defaultTransactions);
            localStorage.setItem("transactions", JSON.stringify(defaultTransactions));
        }
    };

    const filteredTransactions = transactions.filter(transaction =>
        transaction.product.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const formatDateTime = (datetime) => {
        if (!datetime) return "N/A";
        const date = new Date(datetime);
        return date.toLocaleString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const handleAddTransaction = (newTransaction) => {
        const transactionWithId = {
            ...newTransaction,
            id: Date.now(),
            transactionId: newTransaction.transactionId || ""
        };
        const updatedTransactions = [...transactions, transactionWithId];
        setTransactions(updatedTransactions);
        localStorage.setItem("transactions", JSON.stringify(updatedTransactions));
        return true;
    };

    const handleEditTransaction = (updatedTransaction) => {
        const updatedTransactions = transactions.map(transaction =>
            transaction.id === updatedTransaction.id ? updatedTransaction : transaction
        );
        setTransactions(updatedTransactions);
        localStorage.setItem("transactions", JSON.stringify(updatedTransactions));
    };

    const openEditPopup = (transaction) => {
        setSelectedTransaction(transaction);
        setshoweditsales(true);
    };

    return (
        <div>
            <Navbar/>
            <input 
                type="search" 
                placeholder="Search..." 
                className={styles.search1}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className={styles.add} onClick={() => setshowaddsales(true)}>ADD</button>

            <h1 className={styles.soldtransactions}>Sold Transactions</h1>
             
            <div className={styles.tableHeader}>
                <div className={styles.headerCell}>Products</div>
                <div className={styles.headerCell}>Date & Time</div>
                <div className={styles.headerCell}>Payment Method</div>
                <div className={styles.headerCell}>Revenue</div>
                <div className={styles.headerCell}>Action</div>
            </div>
            <hr className={styles.line2} />
            
            <div className={styles.tableBody}>
                {filteredTransactions.length === 0 ? (
                    <div className={styles.noData}>
                        <p>No transactions found</p>
                    </div>
                ) : (
                    filteredTransactions.map((transaction) => (
                        <div key={transaction.id} className={styles.tableRow}>
                            <div className={styles.cell}>{transaction.product}</div>
                            <div className={styles.cell}>{formatDateTime(transaction.datetime)}</div>
                            <div className={styles.cell}>
                                <span className={styles.methodBadge}>{transaction.paymentMethod}</span>
                                {transaction.paymentMethod === "Gcash" && transaction.transactionId && (
                                    <div className={styles.transactionIdText}>
                                        ID: {transaction.transactionId}
                                    </div>
                                )}
                            </div>
                            <div className={`${styles.cell} ${styles.revenueValue}`}>
                                ₱{transaction.revenue.toLocaleString()}
                            </div>
                            <div className={styles.cell}>
                                <button 
                                    className={styles.editButton}
                                    onClick={() => openEditPopup(transaction)}
                                >
                                    Edit
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
          
            {showaddsales && <AddSales 
                onClose={() => setshowaddsales(false)} 
                onAdd={handleAddTransaction}
            />}
            
            {showeditsales && selectedTransaction && (
                <EditSales 
                    onClose={() => {
                        setshoweditsales(false);
                        setSelectedTransaction(null);
                    }} 
                    transaction={selectedTransaction}
                    onSave={(updatedData) => {
                        const updatedTransaction = { ...selectedTransaction, ...updatedData };
                        handleEditTransaction(updatedTransaction);
                        alert("Transaction updated successfully!");
                        return true;
                    }}
                />
            )}
        </div>  
    )
}

export default Sales;