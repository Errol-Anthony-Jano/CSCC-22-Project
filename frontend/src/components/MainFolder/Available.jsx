import React, { useState } from 'react';
import { Navbar } from './Navbar';
import EditAvailable from './editavailable';
import AddProduct from './addproduct';
import './Available.module.css';

const Available = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [products, setProducts] = useState([
    { name: 'PANTS', quantity: 1, id: 214, price: '₱200' },
    { name: 'T-SHIRT', quantity: 3, id: 107, price: '₱350' },
    { name: 'JEANS', quantity: 2, id: 412, price: '₱890' },
    { name: 'JACKET', quantity: 1, id: 156, price: '₱1,250' },
    { name: 'SHORTS', quantity: 5, id: 328, price: '₱180' },
    { name: 'HOODIE', quantity: 2, id: 507, price: '₱1,500' },
    { name: 'SWEATER', quantity: 4, id: 623, price: '₱1,200' },
    { name: 'BLAZER', quantity: 1, id: 789, price: '₱2,500' },
    { name: 'SKIRT', quantity: 3, id: 341, price: '₱450' },
  ]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  const openEdit = (product) => {
    setSelectedProduct(product);
    setIsEditing(true);
    setIsAdding(false);
  };
  const openAdd = () => {
    setIsAdding(true);
    setIsEditing(false);
    setSelectedProduct(null);
  };
  const closeEdit = () => {
    setIsEditing(false);
    setSelectedProduct(null);
  };
  const closeAdd = () => {
    setIsAdding(false);
  };

  const saveProduct = (updatedValues) => {
    setProducts(products.map((product) =>
      product.id === selectedProduct.id ? { ...product, ...updatedValues } : product
    ));
    closeEdit();
  };
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.id.toString().includes(searchTerm)
  );

  return (
    <>
      <Navbar />
      <div className="container">
        <div className="content-card">
          <div className="top-bar">
            <input
              type="text"
              placeholder="Search.."
              className="search-bar"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className="add" onClick={openAdd}>ADD</button>
          </div>

          <div className="header">
            <h1>Available Product</h1>
          </div>

          <div className="product-grid-wrapper">
            <div className="product-list">
              {filteredProducts.map((product) => (
                <div key={product.id} className="product-card">
                  <div className="card-content">
                    <h3 className="product-name">{product.name}</h3>
                    <div className="product-details">
                      <p className="quantity">Quantity: {product.quantity}</p>
                      <p className="product-id">ID: {product.id}</p>
                    </div>
                    <p className="price">{product.price}</p>
                  </div>
                  <button className="edit" onClick={() => openEdit(product)}>Edit</button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {isEditing && selectedProduct && (
          <EditAvailable
            key={selectedProduct.id}
            product={selectedProduct}
            onClose={closeEdit}
            onSave={saveProduct}
          />
        )}
        {isAdding && (
          <AddProduct onClose={closeAdd} />
        )}
      </div>
    </>
  );
};

export default Available;