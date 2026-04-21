import React, { useState, useEffect } from 'react';
import { Navbar } from './Navbar';
import EditAvailable from './editavailable';
import AddProduct from './addproduct';
import styles from './Available.module.css';

const Available = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/products');
      if (!response.ok) throw new Error('Failed to fetch products');
      const data = await response.json();
      const mapped = data.map(p => ({
        id: p.product_id,
        name: p.product_name,
        quantity: p.product_quantity,
        price: `₱${p.product_unit_price}`
      }));
      setProducts(mapped);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const openEdit = (product) => {
    setSelectedProduct(product);
    setIsEditing(true);
  };

  const openAdd = () => {
    setIsAdding(true);
    setSelectedProduct(null);
  };

  const closeEdit = () => {
    setIsEditing(false);
    setSelectedProduct(null);
  };

  const closeAdd = () => {
    setIsAdding(false);
    fetchProducts(); // refresh list after adding
  };

  const saveProduct = async (updatedValues) => {
    try {
      const response = await fetch(`/api/products/${selectedProduct.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          product_quantity: updatedValues.quantity,
          product_unit_price: parseInt(updatedValues.price.replace(/[^\d]/g, ''))
        })
      });
      if (!response.ok) throw new Error('Update failed');
      fetchProducts();
      closeEdit();
    } catch (err) {
      console.error(err);
      alert('Failed to update product');
    }
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.id.toString().includes(searchTerm)
  );

  if (loading) return <div>Loading products...</div>;

  return (
    <>
      <Navbar />
      <div className={styles.container}>
        <div className={styles['content-card']}>
          <div className={styles['top-bar']}>
            <input
              type="text"
              placeholder="Search.."
              className={styles['search-bar']}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className={styles.add} onClick={openAdd}>ADD</button>
          </div>
          <div className={styles.header}>
            <h1>Available Product</h1>
          </div>
          <div className={styles['product-grid-wrapper']}>
            <div className={styles['product-list']}>
              {filteredProducts.map((product) => (
                <div key={product.id} className={styles['product-card']}>
                  <div className={styles['card-content']}>
                    <h3 className={styles['product-name']}>{product.name}</h3>
                    <div className={styles['product-details']}>
                      <p className={styles.quantity}>Quantity: {product.quantity}</p>
                      <p className={styles['product-id']}>ID: {product.id}</p>
                    </div>
                    <p className={styles.price}>{product.price}</p>
                  </div>
                  <button className={styles.edit} onClick={() => openEdit(product)}>Edit</button>
                </div>
              ))}
            </div>
          </div>
        </div>
        {isEditing && selectedProduct && (
          <EditAvailable product={selectedProduct} onClose={closeEdit} onSave={saveProduct} />
        )}
        {isAdding && <AddProduct onClose={closeAdd} />}
      </div>
    </>
  );
};

export default Available;