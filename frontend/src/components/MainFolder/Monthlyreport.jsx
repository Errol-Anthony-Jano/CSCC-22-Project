import React, { useState, useEffect } from 'react';
import { Navbar } from './Navbar';
import styles from './Monthlyreport.module.css';

const Monthlyreport = () => {
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth() + 1); // 1‑12
  const [monthNames] = useState([
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ]);
  const [reportData, setReportData] = useState({
    revenue: 0,
    quantity: 0,
    loading: true,
    error: null
  });
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  useEffect(() => {
    const fetchMonthlyData = async () => {
      setReportData(prev => ({ ...prev, loading: true, error: null }));
      try {
        const response = await fetch(`/api/reports/monthly-revenue?year=${currentYear}`);
        if (!response.ok) throw new Error('Failed to fetch');
        const { data } = await response.json();
        const selectedMonthData = data.find(item => item.month === currentMonth);
        setReportData({
          revenue: selectedMonthData?.revenue || 0,
          quantity: selectedMonthData?.quantity || 0,
          loading: false,
          error: null
        });
      } catch (err) {
        setReportData(prev => ({ ...prev, loading: false, error: err.message }));
      }
    };
    fetchMonthlyData();
  }, [currentYear, currentMonth]);

  const handleMonthSelect = (monthIndex) => {
    setCurrentMonth(monthIndex + 1);
    setIsPopupOpen(false);
  };

  const handleOverallRevenue = () => {
    window.location.href = '/totalrevenue';
  };

  if (reportData.loading) return <div>Loading monthly report...</div>;
  if (reportData.error) return <div>Error: {reportData.error}</div>;

  return (
    <>
      <Navbar />
      <div className={styles.container}>
        <div className={styles['left-panel']}>
          <h1>₱{reportData.revenue.toLocaleString()}</h1>
          <p className={styles.date}>{monthNames[currentMonth - 1]} {currentYear}</p>
          <button className={styles['revenue-btn']} onClick={handleOverallRevenue}>
            Overall Revenue
          </button>
        </div>

        <div className={styles['right-panel']}>
          <div className={styles['chart-box']}></div>
          <div className={styles.info}>
            <div className={styles['month-select']}>
              <h2>Select a Month</h2>
              <button className={styles['arrow-btn']} onClick={() => setIsPopupOpen(true)}>
                ▼
              </button>
            </div>
            <hr className={styles.divider} />
            <div className={styles['info-item']}>
              <span className={styles['star-icon']}>☆</span>
              <div className={styles['info-text']}>
                <p className={styles.label}>Income</p>
                <p className={styles['sub-label']}>Overall Sales</p>
              </div>
              <p className={styles.value}>₱{reportData.revenue.toLocaleString()}</p>
            </div>
            <hr className={styles.divider} />
            <div className={styles['info-item']}>
              <span className={styles['star-icon']}>☆</span>
              <div className={styles['info-text']}>
                <p className={styles.label}>Quantity Sold</p>
                <p className={styles['sub-label']}>Overall Sold Products</p>
              </div>
              <p className={styles.value}>{reportData.quantity}</p>
            </div>
          </div>
        </div>
      </div>

      {isPopupOpen && (
        <div className={styles['month-popup-overlay']} onClick={() => setIsPopupOpen(false)}>
          <div className={styles['month-popup-card']} onClick={e => e.stopPropagation()}>
            <div className={styles['month-popup-header']}>
              <h3>Select a Month</h3>
              <button className={styles['close-popup']} onClick={() => setIsPopupOpen(false)}>✕</button>
            </div>
            <div className={styles['month-grid']}>
              {monthNames.map((month, idx) => (
                <button key={month} className={styles['month-option']} onClick={() => handleMonthSelect(idx)}>
                  {month}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Monthlyreport;