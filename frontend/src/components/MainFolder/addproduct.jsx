import styles from "./addsales.module.css";

function AddProduct({ onClose }) {
    return (
        <div className={styles.addpopsbg}>
            <div className={styles.addpops}>
        <h1 className={styles.producttitle}>ADDING...</h1>
        <h3>PRODUCT:</h3>
        <input type="text" placeholder="Enter Item" className={styles.input} />
        <h3>QUANTITY</h3>
        <input type="number" placeholder="Enter Quantity" className={styles.input}/>
        <h3>PRICE</h3>
        <input type="number" placeholder="Enter Price" className={styles.input}/>
        <button className={styles.buttonpop}>Add</button>
        <button onClick={onClose} className={styles.buttonpop}>Cancel</button>
        </div>
        </div>
       
    )
}
export default AddProduct;