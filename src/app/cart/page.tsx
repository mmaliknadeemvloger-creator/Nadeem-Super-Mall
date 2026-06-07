'use client';

import { useState } from 'react';
import { useCart } from '@/context/CartContext';
import Header from '@/components/Header';
import styles from '@/app/page.module.css';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, total, clearCart } = useCart();
  const [address, setAddress] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) return;
    
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items, shippingAddress: address })
      });
      
      if (res.ok) {
        clearCart();
        router.push('/checkout/success');
      } else {
        alert('Failed to place order. Please try again.');
        setIsSubmitting(false);
      }
    } catch (error) {
      console.error(error);
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.main}>
      <Header />
      <div className="container" style={{ padding: '4rem 1rem', flex: 1 }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '2rem', color: 'var(--foreground)' }}>Your Shopping Cart</h1>
        
        {items.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '4rem 0' }}>
            <p style={{ fontSize: '1.25rem', color: '#64748b', marginBottom: '2rem' }}>Your cart is empty.</p>
            <Link href="/products" className="btn btn-primary">Continue Shopping</Link>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: '2rem', alignItems: 'start' }}>
            
            {/* Cart Items */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {items.map(item => (
                <div key={item.id} style={{ display: 'flex', gap: '1.5rem', padding: '1.5rem', backgroundColor: 'var(--card-bg)', border: '1px solid var(--border)', borderRadius: '16px' }}>
                  <img src={item.image} alt={item.name} style={{ width: '100px', height: '100px', objectFit: 'contain', backgroundColor: '#f8fafc', borderRadius: '8px', padding: '0.5rem' }} />
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <h3 style={{ fontSize: '1.25rem', color: 'var(--foreground)' }}>{item.name}</h3>
                    <p style={{ color: 'var(--primary)', fontWeight: 700, fontSize: '1.25rem', marginTop: '0.5rem' }}>${item.price.toFixed(2)}</p>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <button onClick={() => updateQuantity(item.id, item.quantity - 1)} style={{ width: '30px', height: '30px', borderRadius: '50%', border: '1px solid var(--border)', backgroundColor: 'var(--card-bg)' }}>-</button>
                        <span>{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)} style={{ width: '30px', height: '30px', borderRadius: '50%', border: '1px solid var(--border)', backgroundColor: 'var(--card-bg)' }}>+</button>
                      </div>
                      <button onClick={() => removeFromCart(item.id)} style={{ color: 'var(--accent)', textDecoration: 'underline' }}>Remove</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary & Checkout Form */}
            <div style={{ padding: '2rem', backgroundColor: 'var(--card-bg)', border: '1px solid var(--border)', borderRadius: '16px', position: 'sticky', top: '100px' }}>
              <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', color: 'var(--foreground)', borderBottom: '1px solid var(--border)', paddingBottom: '1rem' }}>Order Summary</h2>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', color: '#64748b' }}>
                <span>Subtotal</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem', color: '#64748b' }}>
                <span>Shipping</span>
                <span>Free</span>
              </div>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem', fontSize: '1.5rem', fontWeight: 800, color: 'var(--foreground)', borderTop: '1px solid var(--border)', paddingTop: '1rem' }}>
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>

              <form onSubmit={handleCheckout} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500, fontSize: '0.875rem' }}>Shipping Address</label>
                  <textarea 
                    required 
                    value={address} 
                    onChange={e => setAddress(e.target.value)} 
                    placeholder="Enter your full shipping address..."
                    style={{ width: '100%', padding: '1rem', borderRadius: '8px', border: '1px solid var(--border)', minHeight: '100px', fontFamily: 'inherit' }}
                  />
                </div>
                <button type="submit" disabled={isSubmitting} className="btn btn-primary" style={{ width: '100%', padding: '1rem', fontSize: '1.125rem' }}>
                  {isSubmitting ? 'Processing...' : 'Place Order'}
                </button>
              </form>
            </div>
            
          </div>
        )}
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
