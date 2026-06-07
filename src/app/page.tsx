import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";
import { prisma } from '@/lib/prisma';

// Force dynamic rendering to always show fresh DB data
export const dynamic = 'force-dynamic';

async function getProducts() {
  return await prisma.product.findMany({
    take: 8,
    orderBy: { createdAt: 'desc' }
  });
}

async function getBanners() {
  return await prisma.banner.findMany({
    where: { isActive: true },
    orderBy: { createdAt: 'desc' }
  });
}

export default async function Home() {
  const products = await getProducts();
  const banners = await getBanners();
  const heroBanner = banners.length > 0 ? banners[0] : null;

  return (
    <div className={styles.main}>
      <header className={styles.header}>
        <div className={`container ${styles.headerContainer}`}>
          <Link href="/" className={styles.logo}>NADEEM SUPER MALL</Link>
          <nav className={styles.navLinks}>
            <Link href="/" className={styles.navLink}>Home</Link>
            <Link href="/" className={styles.navLink}>Shop</Link>
            <Link href="/" className={styles.navLink}>Cart (0)</Link>
            <Link href="/admin" className={styles.navLink} style={{ color: 'var(--primary)', fontWeight: 700 }}>Admin Login</Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className={styles.hero}>
        {heroBanner && heroBanner.imageUrl && (
          <img src={heroBanner.imageUrl} alt="Hero Banner" className={styles.heroImage} />
        )}
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>
            {heroBanner && heroBanner.title ? heroBanner.title : 'Premium Quality. Massive Discounts.'}
          </h1>
          <p style={{ fontSize: '1.25rem', marginBottom: '2.5rem', textShadow: '0 1px 4px rgba(0,0,0,0.5)', opacity: 0.9 }}>
            Experience the finest shopping at Nadeem Super Mall. Fast delivery, easy returns.
          </p>
          <Link href={heroBanner && heroBanner.link ? heroBanner.link : '/'} className="btn btn-primary" style={{ fontSize: '1.125rem', padding: '1rem 2.5rem', borderRadius: '999px', backgroundColor: 'white', color: 'var(--primary)' }}>
            Start Shopping
          </Link>
        </div>
      </section>

      {/* Featured Products */}
      <section className={styles.section}>
        <div className="container">
          <h2 className={styles.sectionTitle}>Today's Featured Deals</h2>
          <div className={styles.productGrid}>
            {products.map(product => {
              const images = JSON.parse(product.images);
              const mainImage = images[0] || 'https://via.placeholder.com/400x400?text=No+Image';
              const finalPrice = product.price - (product.price * (product.discount / 100));

              return (
                <div key={product.id} className={styles.productCard}>
                  <div className={styles.productImageContainer}>
                    {product.discount > 0 && (
                      <span className={styles.discountBadge}>-{product.discount}%</span>
                    )}
                    <img src={mainImage} alt={product.name} className={styles.productImage} />
                  </div>
                  <div className={styles.productInfo}>
                    <span className={styles.productCategory}>{product.category}</span>
                    <h3 className={styles.productTitle}>{product.name}</h3>
                    <div className={styles.productPriceContainer}>
                      <div>
                        {product.discount > 0 && <span className={styles.originalPrice}>${product.price.toFixed(2)}</span>}
                        <span className={styles.price}>${finalPrice.toFixed(2)}</span>
                      </div>
                    </div>
                    <button className={styles.addToCartBtn} onClick={() => alert('Added to cart!')}>Add to Cart</button>
                  </div>
                </div>
              );
            })}
            
            {products.length === 0 && (
              <p style={{ gridColumn: '1 / -1', textAlign: 'center', color: '#64748b', fontSize: '1.25rem', padding: '4rem 0' }}>
                No products available yet. Head over to the <Link href="/admin/products" style={{ color: 'var(--primary)', textDecoration: 'underline' }}>Admin Panel</Link> to add some!
              </p>
            )}
          </div>
        </div>
      </section>

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
