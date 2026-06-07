'use client';

import { useState, useEffect } from 'react';
import styles from '../admin.module.css';

export default function AdminProducts() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Form state
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [discount, setDiscount] = useState('');
  const [stock, setStock] = useState('');
  const [category, setCategory] = useState('');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await fetch('/api/products');
      const data = await res.json();
      setProducts(data);
    } catch (error) {
      console.error('Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, description, price, discount, stock, category }),
      });
      if (res.ok) {
        // Reset form and reload products
        setName('');
        setDescription('');
        setPrice('');
        setDiscount('');
        setStock('');
        setCategory('');
        fetchProducts();
      } else {
        alert('Failed to add product');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1 className={styles.pageTitle}>Manage Products</h1>
      
      <div className={styles.statCard} style={{ marginBottom: '2rem' }}>
        <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem', color: 'var(--foreground)' }}>Add New Product</h3>
        <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '1rem' }}>
          <input required type="text" placeholder="Product Name" value={name} onChange={e => setName(e.target.value)} style={{ padding: '0.8rem', borderRadius: '8px', border: '1px solid var(--border)' }} />
          <textarea required placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} style={{ padding: '0.8rem', borderRadius: '8px', border: '1px solid var(--border)', minHeight: '100px' }} />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <input required type="number" step="0.01" placeholder="Price ($)" value={price} onChange={e => setPrice(e.target.value)} style={{ padding: '0.8rem', borderRadius: '8px', border: '1px solid var(--border)' }} />
            <input type="number" step="0.01" placeholder="Discount (%)" value={discount} onChange={e => setDiscount(e.target.value)} style={{ padding: '0.8rem', borderRadius: '8px', border: '1px solid var(--border)' }} />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <input required type="number" placeholder="Stock" value={stock} onChange={e => setStock(e.target.value)} style={{ padding: '0.8rem', borderRadius: '8px', border: '1px solid var(--border)' }} />
            <input required type="text" placeholder="Category" value={category} onChange={e => setCategory(e.target.value)} style={{ padding: '0.8rem', borderRadius: '8px', border: '1px solid var(--border)' }} />
          </div>
          <button type="submit" className="btn btn-primary" style={{ justifySelf: 'start', marginTop: '0.5rem' }}>Add Product</button>
        </form>
      </div>

      <div className={styles.statCard}>
        <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem', color: 'var(--foreground)' }}>Product List</h3>
        {loading ? <p>Loading...</p> : (
          <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border)' }}>
                <th style={{ padding: '1rem 0' }}>Name</th>
                <th>Price</th>
                <th>Discount</th>
                <th>Stock</th>
                <th>Category</th>
              </tr>
            </thead>
            <tbody>
              {products.map(product => (
                <tr key={product.id} style={{ borderBottom: '1px solid var(--border)' }}>
                  <td style={{ padding: '1rem 0' }}>{product.name}</td>
                  <td>${product.price}</td>
                  <td>{product.discount}%</td>
                  <td>{product.stock}</td>
                  <td>{product.category}</td>
                </tr>
              ))}
              {products.length === 0 && (
                <tr>
                  <td colSpan={5} style={{ padding: '1rem 0', textAlign: 'center', color: '#64748b' }}>No products found. Add one above!</td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
