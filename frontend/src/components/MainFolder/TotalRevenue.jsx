import React, { useEffect, useState } from 'react';
import { Navbar } from './Navbar';
import styles from './TotalRevenue.module.css';

const TotalRevenue = () => {
  const [revenueData, setRevenueData] = useState({
    totalRevenue: 0,
    totalQuantitySold: 0,
    loading: true,
    error: null
  });

  useEffect(() => {
    const fetchTotalRevenue = async () => {
      try {
        const response = await fetch('/api/reports/total-revenue');
        if (!response.ok) throw new Error('Failed to fetch');
        const data = await response.json();
        setRevenueData({
          totalRevenue: data.totalRevenue,
          totalQuantitySold: data.totalQuantitySold,
          loading: false,
          error: null
        });
      } catch (err) {
        setRevenueData(prev => ({ ...prev, loading: false, error: err.message }));
      }
    };
    fetchTotalRevenue();
  }, []);

  const handleBack = () => window.history.back();

  if (revenueData.loading) return <div>Loading...</div>;
  if (revenueData.error) return <div>Error: {revenueData.error}</div>;

  return (
    <>
      <Navbar />
      <div className={`${styles.container} ${styles['total-revenue-page']}`}>
        <div className={`${styles['left-panel']} ${styles['revenue-panel']}`}>
          <div className={styles['revenue-summary']}>
            <h1>₱{revenueData.totalRevenue.toLocaleString()}</h1>
            <p className={styles.date}>Overall Revenue</p>
          </div>
          <button className={styles['back-btn']} onClick={handleBack}>Back</button>
        </div>

        <div className={styles['right-panel']}>
          <div className={styles['chart-box']}>
            {/* Placeholder for a chart library (e.g., Recharts) */}
          </div>
          <div className={styles.info}>
            <h2 className={styles['section-title']}>Overall</h2>
            <div className={styles['info-item']}>
              <span className={styles['star-icon']}>★</span>
              <div className={styles['info-text']}>
                <p className={styles.label}>Income</p>
                <p className={styles['sub-label']}>Overall Sales</p>
              </div>
              <p className={styles.value}>₱{revenueData.totalRevenue.toLocaleString()}</p>
            </div>
            <div className={styles['info-item']}>
              <span className={styles['star-icon']}>★</span>
              <div className={styles['info-text']}>
                <p className={styles.label}>Quantity Sold</p>
                <p className={styles['sub-label']}>Overall Sold Products</p>
              </div>
              <p className={styles.value}>{revenueData.totalQuantitySold}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TotalRevenue;