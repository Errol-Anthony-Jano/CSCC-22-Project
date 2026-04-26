import styles from "./sales.module.css";
import { Navbar } from "../MainFolder/Navbar";
import AddSales from "./addsales";
import EditSales from "./editsales";
import { useState } from "react";
import { useTransactions, useAddTransaction, useUpdateTransaction } from "../../hooks/useTransactions";

function Sales() {
    const [showaddsales, setshowaddsales] = useState(false);
    const [showeditsales, setshoweditsales] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedTransaction, setSelectedTransaction] = useState(null);
    
    const { data: transactionsData, isLoading, isError } = useTransactions();
    const addTransactionMutation = useAddTransaction();
    const updateTransactionMutation = useUpdateTransaction();
    
    // Handle different response structures
    let transactions = [];
    if (transactionsData) {
        if (Array.isArray(transactionsData)) {
            transactions = transactionsData;
        } else if (transactionsData.data && Array.isArray(transactionsData.data)) {
            transactions = transactionsData.data;
        }
    }

    if (isLoading) return <div className={styles.loading}>Loading transactions...</div>;
    if (isError) return <div className={styles.error}>Connection lost to server. Using local data.</div>;

    const filteredTransactions = transactions.filter(transaction =>
        transaction.product_name?.toLowerCase().includes(searchTerm.toLowerCase())
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

    const handleAddTransaction = async (newTransaction) => {
        // Transform frontend format to API format
        const apiTransaction = {
            payment_type: newTransaction.paymentMethod === "Gcash" ? "GCash" : newTransaction.paymentMethod,
            payment_refstr: newTransaction.paymentMethod === "Gcash" ? newTransaction.transactionId : null,
            transaction_items: [{
                product_id: 1, // You'll need to map product name to ID
                quantity_bought: newTransaction.quantity
            }]
        };
        
        try {
            await addTransactionMutation.mutateAsync(apiTransaction);
            alert("Transaction added successfully!");
            return true;
        } catch (error) {
            console.error("Failed to add transaction:", error);
            alert("Failed to add transaction. Please try again.");
            return false;
        }
    };

    const handleEditTransaction = async (updatedTransaction) => {
        const updateData = {
            payment_type: updatedTransaction.paymentMethod === "Gcash" ? "GCash" : updatedTransaction.paymentMethod,
            payment_refstr: updatedTransaction.paymentMethod === "Gcash" ? updatedTransaction.transactionId : null,
            transaction_items: [{
                product_id: updatedTransaction.productId || 1,
                quantity_bought: updatedTransaction.quantity
            }]
        };
        
        try {
            await updateTransactionMutation.mutateAsync({
                transactionId: updatedTransaction.transaction_id,
                updateData: updateData
            });
            return true;
        } catch (error) {
            console.error("Failed to update transaction:", error);
            return false;
        }
    };

    const openEditPopup = (transaction) => {
        // Transform to frontend format for editing
        const frontendFormat = {
            ...transaction,
            id: transaction.transaction_id,
            product: transaction.product_name,
            datetime: transaction.transaction_timestamp?.slice(0, 16),
            paymentMethod: transaction.payment_type === "GCash" ? "Gcash" : transaction.payment_type,
            revenue: transaction.total_revenue,
            quantity: transaction.quantity || 1,
            transactionId: transaction.payment_refstr
        };
        setSelectedTransaction(frontendFormat);
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
                        <div key={transaction.transaction_id} className={styles.tableRow}>
                            <div className={styles.cell}>{transaction.product_name}</div>
                            <div className={styles.cell}>{formatDateTime(transaction.transaction_timestamp)}</div>
                            <div className={styles.cell}>
                                <span className={styles.methodBadge}>{transaction.payment_type}</span>
                                {transaction.payment_type === "GCash" && transaction.payment_refstr && (
                                    <div className={styles.transactionIdText}>
                                        ID: {transaction.payment_refstr}
                                    </div>
                                )}
                            </div>
                            <div className={`${styles.cell} ${styles.revenueValue}`}>
                                ₱{transaction.total_revenue?.toLocaleString() || 0}
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
                    onSave={async (updatedData) => {
                        const success = await handleEditTransaction(updatedData);
                        if (success) {
                            alert("Transaction updated successfully!");
                            return true;
                        }
                        return false;
                    }}
                />
            )}
        </div>  
    )
}

export default Sales;