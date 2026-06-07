import { Metadata } from 'next';
import Header from '@/components/Header';
import styles from '@/app/page.module.css';
import { prisma } from '@/lib/prisma';
import AddToCartDetail from './AddToCartDetail';

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const product = await prisma.product.findUnique({ where: { id } });
  
  if (!product) return { title: 'Product Not Found' };
  
  return {
    title: product.name,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      images: [JSON.parse(product.images)[0] || ''],
    }
  }
}

export default async function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = await prisma.product.findUnique({ where: { id } });
  
  if (!product) {
    return (
      <div className={styles.main}>
        <Header />
        <div className="container" style={{ textAlign: 'center', padding: '4rem 0' }}>
          <h1 style={{ fontSize: '2rem', color: 'var(--foreground)' }}>Product not found</h1>
        </div>
      </div>
    );
  }

  const images = JSON.parse(product.images);
  const mainImage = images[0] || 'https://via.placeholder.com/400x400?text=No+Image';
  const finalPrice = product.price - (product.price * (product.discount / 100));

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    image: images,
    description: product.description,
    sku: product.id,
    offers: {
      '@type': 'Offer',
      url: `https://nadeemsupermall.com/products/${product.id}`,
      priceCurrency: 'USD',
      price: finalPrice,
      itemCondition: 'https://schema.org/NewCondition',
      availability: product.stock > 0 ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
    }
  };

  return (
    <div className={styles.main}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />
      <div className="container" style={{ padding: '4rem 1rem', flex: 1 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'start' }}>
          <div style={{ backgroundColor: '#f8fafc', padding: '2rem', borderRadius: '24px', border: '1px solid var(--border)', display: 'flex', justifyContent: 'center' }}>
            <img src={mainImage} alt={product.name} style={{ width: '100%', maxWidth: '500px', objectFit: 'contain' }} />
          </div>
          <div>
            <span style={{ color: 'var(--primary)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: '0.875rem' }}>{product.category}</span>
            <h1 style={{ fontSize: '3rem', color: 'var(--foreground)', marginTop: '0.5rem', marginBottom: '1rem', lineHeight: 1.1 }}>{product.name}</h1>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
              <span style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--foreground)' }}>${finalPrice.toFixed(2)}</span>
              {product.discount > 0 && (
                <>
                  <span style={{ fontSize: '1.25rem', color: '#94a3b8', textDecoration: 'line-through' }}>${product.price.toFixed(2)}</span>
                  <span style={{ backgroundColor: 'rgba(244, 63, 94, 0.1)', color: 'var(--accent)', padding: '0.25rem 0.75rem', borderRadius: '999px', fontWeight: 700 }}>Save {product.discount}%</span>
                </>
              )}
            </div>
            
            <p style={{ fontSize: '1.125rem', color: '#64748b', lineHeight: 1.8, marginBottom: '3rem' }}>
              {product.description}
            </p>
            
            <div style={{ borderTop: '1px solid var(--border)', paddingTop: '2rem' }}>
              <AddToCartDetail product={product} />
              <p style={{ marginTop: '1rem', color: product.stock > 0 ? 'var(--secondary)' : 'var(--accent)', fontWeight: 600 }}>
                {product.stock > 0 ? `✓ In Stock (${product.stock} available)` : '✗ Out of Stock'}
              </p>
            </div>
          </div>
        </div>
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
