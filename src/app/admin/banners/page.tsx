'use client';

import { useState, useEffect } from 'react';
import styles from '../admin.module.css';

export default function AdminBanners() {
  const [banners, setBanners] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Form state
  const [title, setTitle] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [link, setLink] = useState('');

  useEffect(() => {
    fetchBanners();
  }, []);

  const fetchBanners = async () => {
    try {
      const res = await fetch('/api/banners');
      const data = await res.json();
      setBanners(data);
    } catch (error) {
      console.error('Failed to load banners');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/banners', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, imageUrl, link, isActive: true }),
      });
      if (res.ok) {
        setTitle('');
        setImageUrl('');
        setLink('');
        fetchBanners();
      } else {
        alert('Failed to add banner');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1 className={styles.pageTitle}>Manage Banners & Popups</h1>
      
      <div className={styles.statCard} style={{ marginBottom: '2rem' }}>
        <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem', color: 'var(--foreground)' }}>Add New Banner</h3>
        <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '1rem' }}>
          <input required type="text" placeholder="Banner Title (e.g., Summer Sale 50% Off)" value={title} onChange={e => setTitle(e.target.value)} style={{ padding: '0.8rem', borderRadius: '8px', border: '1px solid var(--border)' }} />
          <input required type="url" placeholder="Image URL (e.g., https://example.com/banner.jpg)" value={imageUrl} onChange={e => setImageUrl(e.target.value)} style={{ padding: '0.8rem', borderRadius: '8px', border: '1px solid var(--border)' }} />
          <input type="text" placeholder="Destination Link (e.g., /category/summer)" value={link} onChange={e => setLink(e.target.value)} style={{ padding: '0.8rem', borderRadius: '8px', border: '1px solid var(--border)' }} />
          <button type="submit" className="btn btn-primary" style={{ justifySelf: 'start', marginTop: '0.5rem' }}>Add Banner</button>
        </form>
      </div>

      <div className={styles.statCard}>
        <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem', color: 'var(--foreground)' }}>Active Banners</h3>
        {loading ? <p>Loading...</p> : (
          <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border)' }}>
                <th style={{ padding: '1rem 0' }}>Title</th>
                <th>Link</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {banners.map(banner => (
                <tr key={banner.id} style={{ borderBottom: '1px solid var(--border)' }}>
                  <td style={{ padding: '1rem 0' }}>{banner.title || 'Untitled'}</td>
                  <td>{banner.link || 'N/A'}</td>
                  <td>
                    <span style={{ padding: '0.25rem 0.75rem', borderRadius: '999px', backgroundColor: banner.isActive ? 'rgba(16, 185, 129, 0.1)' : 'rgba(244, 63, 94, 0.1)', color: banner.isActive ? 'var(--secondary)' : 'var(--accent)', fontSize: '0.875rem' }}>
                      {banner.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                </tr>
              ))}
              {banners.length === 0 && (
                <tr>
                  <td colSpan={3} style={{ padding: '1rem 0', textAlign: 'center', color: '#64748b' }}>No banners found. Add one above!</td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
