import { useState, useEffect } from "react";
import styles from "./editsales.module.css";

function EditSales({ onClose, transaction, onSave }) {
    const [formData, setFormData] = useState({
        product: "",
        datetime: "",
        paymentMethod: "",
        revenue: "",
        quantity: 1,
        transactionId: ""
    });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (transaction) {
            setFormData({
                product: transaction.product || "",
                datetime: transaction.datetime || "",
                paymentMethod: transaction.paymentMethod || "",
                revenue: transaction.revenue || "",
                quantity: transaction.quantity || 1,
                transactionId: transaction.transactionId || ""
            });
        }
    }, [transaction]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        setError("");
    };

    const handleSave = async () => {
        if (!formData.product || !formData.datetime || !formData.paymentMethod || !formData.revenue) {
            setError("Please fill in all required fields.");
            return;
        }

        if (formData.paymentMethod === "Gcash" && !formData.transactionId) {
            setError("Transaction ID is required for GCash payments.");
            return;
        }

        setLoading(true);
        try {
            const success = await onSave({ 
                ...formData, 
                id: transaction.id,
                revenue: parseFloat(formData.revenue),
                quantity: parseInt(formData.quantity)
            });
            if (success) {
                alert("Transaction updated successfully!");
                onClose();
            }
        } catch (err) {
            setError("Failed to update transaction. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.editpopsbg}>
            <div className={styles.editpops}>
                <h1 className={styles.producttitle}>EDIT TRANSACTION</h1>
                <h3 className={styles.message}>Update the transaction details below</h3>
                
                {error && (
                    <div className={styles.errorMessage} style={{ color: "red", textAlign: "center", marginBottom: "10px" }}>
                        {error}
                    </div>
                )}
                
                <h3>PRODUCT:*</h3>
                <input 
                    type="text" 
                    name="product"
                    className={styles.input}
                    value={formData.product}
                    onChange={handleChange}
                />
                
                <h3>QUANTITY:*</h3>
                <input 
                    type="number" 
                    name="quantity"
                    className={styles.input}
                    value={formData.quantity}
                    onChange={handleChange}
                    min="1"
                />
                
                <h3>DATE & TIME:*</h3>
                <input 
                    type="datetime-local" 
                    name="datetime"
                    className={styles.input}
                    value={formData.datetime}
                    onChange={handleChange}
                />
                
                <h3>PAYMENT METHOD:*</h3>
                <select 
                    className={styles.paymentmethod}
                    name="paymentMethod"
                    value={formData.paymentMethod}
                    onChange={handleChange}
                >
                    <option value="">Select Method</option>
                    <option value="Cash">Cash</option>
                    <option value="Gcash">Gcash</option>
                    <option value="Bank Transfer">Bank Transfer</option>
                    <option value="Cheque">Cheque</option>
                </select>
                
                {/* Transaction ID field - only shows when GCash is selected */}
                {formData.paymentMethod === "Gcash" && (
                    <>
                        <h3>TRANSACTION ID:*</h3>
                        <input 
                            type="text" 
                            name="transactionId"
                            placeholder="Enter GCash Transaction ID" 
                            className={styles.input}
                            value={formData.transactionId}
                            onChange={handleChange}
                        />
                    </>
                )}
                
                <h3>REVENUE:*</h3>
                <input 
                    type="number" 
                    name="revenue"
                    className={styles.input}
                    value={formData.revenue}
                    onChange={handleChange}
                    min="0"
                    step="0.01"
                />

                <button 
                    className={styles.buttonpop} 
                    onClick={handleSave}
                    disabled={loading}
                >
                    {loading ? "Saving..." : "Save Changes"}
                </button>
                <button 
                    onClick={onClose} 
                    className={styles.buttonpop}
                >
                    Cancel
                </button>
            </div>
        </div>
    );
}

export default EditSales;