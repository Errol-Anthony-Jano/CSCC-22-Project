import styles from "./addsales.module.css";
import { useState } from "react";

function AddSales({ onClose, onAdd }) {
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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        setError("");
    };

    const handleSubmit = async () => {
        // Validation
        if (!formData.product || !formData.datetime || !formData.paymentMethod || !formData.revenue) {
            setError("Please fill in all required fields.");
            return;
        }

        if (formData.revenue <= 0) {
            setError("Revenue must be greater than 0.");
            return;
        }

        if (formData.quantity <= 0) {
            setError("Quantity must be greater than 0.");
            return;
        }

        // Validate Transaction ID if payment method is GCash
        if (formData.paymentMethod === "Gcash" && !formData.transactionId) {
            setError("Transaction ID is required for GCash payments.");
            return;
        }

        setLoading(true);
        try {
            const success = await onAdd(formData);
            if (success) {
                alert("Transaction added successfully!");
                onClose();
            }
        } catch (err) {
            setError("Failed to add transaction. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.addpopsbg}>
            <div className={styles.addpops}>
                <h1 className={styles.producttitle}>ADD TRANSACTION</h1>
                
                {error && (
                    <div className={styles.errorMessage} style={{ color: "red", textAlign: "center", marginBottom: "10px" }}>
                        {error}
                    </div>
                )}
                
                <h3>PRODUCT:</h3>
                <input 
                    type="text" 
                    name="product"
                    placeholder="Enter Product Name" 
                    className={styles.input}
                    value={formData.product}
                    onChange={handleChange}
                />
                
                <h3>QUANTITY:</h3>
                <input 
                    type="number"
                    name="quantity"
                    placeholder="Enter Quantity" 
                    className={styles.input}
                    value={formData.quantity}
                    onChange={handleChange}
                    min="1"
                />
                
                <h3>DATE & TIME:</h3>
                <input 
                    type="datetime-local" 
                    name="datetime"
                    className={styles.input}
                    value={formData.datetime}
                    onChange={handleChange}
                />
                
                <h3>PAYMENT METHOD:</h3>
                <select 
                    name="paymentMethod"
                    className={styles.paymentmethod}
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
                        <h3>TRANSACTION ID:</h3>
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
                
                <h3>REVENUE:</h3>
                <input 
                    type="number" 
                    name="revenue"
                    placeholder="Enter Amount" 
                    className={styles.input}
                    value={formData.revenue}
                    onChange={handleChange}
                    min="0"
                    step="0.01"
                />
                <button 
                    onClick={onClose} 
                    className={styles.buttonpop}
                >
                    Cancel
                </button>
                <button 
                    className={styles.buttonpop} 
                    onClick={handleSubmit}
                    disabled={loading}
                >
                    {loading ? "Adding..." : "Add Transaction"}
                </button>
            </div>
        </div>
    );
}

export default AddSales;