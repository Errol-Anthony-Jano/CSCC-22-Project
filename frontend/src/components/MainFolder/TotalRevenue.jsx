import React from 'react';
import { Navbar } from './Navbar';
import './Monthlyreport.css';

const TotalRevenue = () => {
  const handleBack = () => {
    window.history.back();
  };

 

  return (
    <>
      <Navbar />
      <div className="container total-revenue-page">
        {/* Left Panel */}
        <div className="left-panel revenue-panel">
          <div className="revenue-summary">
            <h1>₱20,000</h1>
            <p className="date">Overall Revenue</p>
          </div>
          <button className="back-btn" onClick={handleBack}>Back</button>
        </div>

        {/* Right Panel */}
        <div className="right-panel">
         
          <div className="chart-box">
            // Placeholder for the chart component, pwede na siya i-replace sa actual chart nga mag-display sa revenue data
          </div>

          <div className="info">
            <h2 className="section-title">Overall</h2>

            <div className="info-item">
              <span className="star-icon">★</span>
              <div className="info-text">
                <p className="label">Income</p>
                <p className="sub-label">Overall Sales</p>
              </div>
              <p className="value">₱10,000</p>
            </div>

            <div className="info-item">
              <span className="star-icon">★</span>
              <div className="info-text">
                <p className="label">Quantity Sold</p>
                <p className="sub-label">Overall Sold Products</p>
              </div>
              <p className="value">100</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TotalRevenue;