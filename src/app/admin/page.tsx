import styles from './admin.module.css';

export default function AdminDashboard() {
  return (
    <div>
      <h1 className={styles.pageTitle}>Dashboard</h1>
      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <h3>Total Orders</h3>
          <p className={styles.statValue}>0</p>
        </div>
        <div className={styles.statCard}>
          <h3>Total Products</h3>
          <p className={styles.statValue}>0</p>
        </div>
        <div className={styles.statCard}>
          <h3>Revenue</h3>
          <p className={styles.statValue}>$0.00</p>
        </div>
      </div>
    </div>
  );
}
