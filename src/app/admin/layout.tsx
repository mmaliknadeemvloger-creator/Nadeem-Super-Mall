import Link from 'next/link';
import styles from './admin.module.css';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={styles.adminContainer}>
      <aside className={styles.sidebar}>
        <div className={styles.sidebarHeader}>
          <h2>Admin Panel</h2>
        </div>
        <nav className={styles.nav}>
          <Link href="/admin" className={styles.navLink}>Dashboard</Link>
          <Link href="/admin/products" className={styles.navLink}>Products</Link>
          <Link href="/admin/orders" className={styles.navLink}>Orders</Link>
          <Link href="/admin/banners" className={styles.navLink}>Banners</Link>
          <Link href="/" className={styles.navLink} style={{ marginTop: 'auto' }}>View Store</Link>
        </nav>
      </aside>
      <main className={styles.mainContent}>
        {children}
      </main>
    </div>
  );
}
