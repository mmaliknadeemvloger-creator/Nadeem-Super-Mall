'use client';

import { useState, useEffect } from 'react';
import styles from '../admin.module.css';

export default function AdminOrders() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await fetch('/api/orders');
      const data = await res.json();
      setOrders(data);
    } catch (error) {
      console.error('Failed to load orders');
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: string, status: string) => {
    try {
      const res = await fetch(`/api/orders/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
      if (res.ok) {
        fetchOrders(); // Refresh list
      } else {
        alert('Failed to update status');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1 className={styles.pageTitle}>Manage Orders</h1>

      <div className={styles.statCard}>
        {loading ? <p>Loading...</p> : (
          <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border)' }}>
                <th style={{ padding: '1rem 0' }}>Order ID</th>
                <th>Date</th>
                <th>Total</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {orders.map(order => (
                <tr key={order.id} style={{ borderBottom: '1px solid var(--border)' }}>
                  <td style={{ padding: '1rem 0', fontFamily: 'monospace', fontSize: '0.9rem' }}>{order.id.slice(-8)}</td>
                  <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                  <td style={{ fontWeight: 600 }}>${order.total.toFixed(2)}</td>
                  <td>
                    <span style={{ 
                      padding: '0.25rem 0.75rem', 
                      borderRadius: '999px', 
                      backgroundColor: order.status === 'Delivered' ? 'rgba(16, 185, 129, 0.1)' : order.status === 'Cancelled' ? 'rgba(244, 63, 94, 0.1)' : 'rgba(79, 70, 229, 0.1)', 
                      color: order.status === 'Delivered' ? 'var(--secondary)' : order.status === 'Cancelled' ? 'var(--accent)' : 'var(--primary)', 
                      fontSize: '0.875rem',
                      fontWeight: 500
                    }}>
                      {order.status}
                    </span>
                  </td>
                  <td>
                    <select 
                      value={order.status} 
                      onChange={(e) => updateStatus(order.id, e.target.value)}
                      style={{ padding: '0.4rem', borderRadius: '4px', border: '1px solid var(--border)', background: 'var(--card-bg)' }}
                    >
                      <option value="Pending">Pending</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </td>
                </tr>
              ))}
              {orders.length === 0 && (
                <tr>
                  <td colSpan={5} style={{ padding: '1rem 0', textAlign: 'center', color: '#64748b' }}>No orders found.</td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
