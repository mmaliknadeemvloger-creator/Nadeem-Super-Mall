'use client';

import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import styles from '@/app/page.module.css';

export default function Header() {
  const { itemCount } = useCart();

  return (
    <header className={styles.header}>
      <div className={`container ${styles.headerContainer}`}>
        <Link href="/" className={styles.logo}>NADEEM SUPER MALL</Link>
        <nav className={styles.navLinks}>
          <Link href="/" className={styles.navLink}>Home</Link>
          <Link href="/" className={styles.navLink}>Shop</Link>
          <Link href="/cart" className={styles.navLink} style={{ fontWeight: itemCount > 0 ? 700 : 500, color: itemCount > 0 ? 'var(--primary)' : 'inherit' }}>
            Cart ({itemCount})
          </Link>
          <Link href="/admin" className={styles.navLink} style={{ color: 'var(--primary)', fontWeight: 700 }}>Admin Login</Link>
        </nav>
      </div>
    </header>
  );
}
