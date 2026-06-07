import Link from 'next/link';
import Header from '@/components/Header';
import styles from '@/app/page.module.css';

export default function CheckoutSuccessPage() {
  return (
    <div className={styles.main}>
      <Header />
      <div className="container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flex: 1, padding: '4rem 1rem', textAlign: 'center' }}>
        <div style={{ width: '80px', height: '80px', borderRadius: '50%', backgroundColor: 'rgba(16, 185, 129, 0.1)', color: 'var(--secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '3rem', marginBottom: '2rem' }}>
          ✓
        </div>
        <h1 style={{ fontSize: '3rem', color: 'var(--foreground)', marginBottom: '1rem' }}>Order Placed Successfully!</h1>
        <p style={{ fontSize: '1.25rem', color: '#64748b', maxWidth: '600px', marginBottom: '3rem' }}>
          Thank you for shopping at Nadeem Super Mall. Your order has been received and is currently being processed. You can track your order status from the admin panel.
        </p>
        <Link href="/" className="btn btn-primary" style={{ padding: '1rem 2rem', fontSize: '1.125rem' }}>
          Continue Shopping
        </Link>
      </div>
      
      {/* Footer */}
      <footer style={{ backgroundColor: 'var(--card-bg)', borderTop: '1px solid var(--border)', padding: '4rem 0', marginTop: 'auto' }}>
        <div className="container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', color: '#64748b' }}>
          <h2 style={{ fontFamily: 'var(--font-heading)', color: 'var(--foreground)', fontSize: '1.5rem', fontWeight: 800 }}>NADEEM SUPER MALL</h2>
          <p>The ultimate destination for your shopping needs.</p>
          <p style={{ marginTop: '2rem', fontSize: '0.875rem' }}>&copy; {new Date().getFullYear()} Nadeem Super Mall. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
