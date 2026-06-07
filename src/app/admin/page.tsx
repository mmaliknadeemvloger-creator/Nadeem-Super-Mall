'use client';

import { useState, useEffect } from 'react';
import styles from './admin.module.css';

export default function AdminDashboard() {
  const [stats, setStats] = useState({ orders: 0, products: 0, revenue: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/stats')
      .then(res => res.json())
      .then(data => {
        if (!data.error) setStats(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <h1 className={styles.pageTitle}>Dashboard</h1>
      {loading ? <p>Loading stats...</p> : (
        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <h3>Total Orders</h3>
            <p className={styles.statValue}>{stats.orders}</p>
          </div>
          <div className={styles.statCard}>
            <h3>Total Products</h3>
            <p className={styles.statValue}>{stats.products}</p>
          </div>
          <div className={styles.statCard}>
            <h3>Revenue</h3>
            <p className={styles.statValue}>${stats.revenue.toFixed(2)}</p>
          </div>
        </div>
      )}
    </div>
  );
}
