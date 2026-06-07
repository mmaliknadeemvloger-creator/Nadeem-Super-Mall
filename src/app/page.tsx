import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";
import { prisma } from '@/lib/prisma';
import Header from '@/components/Header';
import ProductCard from '@/components/ProductCard';

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
      <Header />

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
            {products.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
            
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
