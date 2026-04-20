import React, { useState, useMemo } from 'react';
import { Navbar } from './Navbar';
import styles from './ActivLog.module.css';

const transactions = [
  { name: 'Wireless Earbuds Pro', datetime: '2026-04-05T10:32:00', qty: 2, type: 'remove' },
  { name: 'USB-C Hub 7-in-1', datetime: '2026-04-04T15:15:00', qty: 1, type: 'add' },
  { name: 'Mechanical Keyboard', datetime: '2026-04-03T11:20:00', qty: 3, type: 'remove' },
  { name: 'Gaming Monitor 27"', datetime: '2026-04-02T09:45:00', qty: 1, type: 'add' },
  { name: 'Webcam HD 1080p', datetime: '2026-04-01T14:05:00', qty: 10, type: 'remove' },
  { name: 'Wireless Earbuds Pro', datetime: '2026-03-31T08:50:00', qty: 20, type: 'add' },
  { name: 'Laptop Stand Aluminum', datetime: '2026-03-30T16:30:00', qty: 2, type: 'remove' },
  { name: 'Noise-Cancel Headset', datetime: '2026-03-29T12:00:00', qty: 1, type: 'add' },
  { name: 'Smart Power Strip', datetime: '2026-03-28T10:10:00', qty: 5, type: 'remove' },
  { name: 'Ergonomic Mouse', datetime: '2026-03-27T17:45:00', qty: 15, type: 'add' },
];

const ActivLog = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const formatDateTime = (iso) => {
    const d = new Date(iso);
    const date = d.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
    const time = d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
    return (
      <>
        <span className={styles['dt-date']}>{date}</span>
        <span className={styles['dt-time']}>{time}</span>
      </>
    );
  };

  const activityLabel = (type) => {
    const map = { remove: 'Remove', add: 'Add', sale: 'Sale', restock: 'Restock' };
    return map[type] || type;
  };

  const filteredTransactions = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return q ? transactions.filter(tx =>
      tx.name.toLowerCase().includes(q) || tx.type.toLowerCase().includes(q)
    ) : transactions;
  }, [searchQuery]);

  return (
    <>
      <Navbar />
      <section className={styles.page}>
        <div className={styles.topBar}>
          <div className={styles['center-title']}>
            <h2 className={styles.title}>Activity Log</h2>
            {searchQuery && (
              <p className={styles['result-note']}>
                {filteredTransactions.length} result{filteredTransactions.length !== 1 ? 's' : ''} found
              </p>
            )}
          </div>
          <input
            type="search"
            placeholder="Search..."
            className={styles.search1}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className={styles['table-container']}>
          <table>
            <thead>
              <tr>
                <th>Product</th>
                <th>Date & Time</th>
                <th>Quantity</th>
                <th>Activity</th>
              </tr>
            </thead>
            <tbody>
              {filteredTransactions.length === 0 ? (
                <tr className={styles['empty-row']}>
                  <td colSpan="4">No transactions found.</td>
                </tr>
              ) : (
                filteredTransactions.map((tx, i) => (
                  <tr key={i}>
                    <td><span className={styles.star}>★</span> {tx.name}</td>
                    <td>{formatDateTime(tx.datetime)}</td>
                    <td>{tx.qty}</td>
                    <td>{activityLabel(tx.type)}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
};

export default ActivLog;