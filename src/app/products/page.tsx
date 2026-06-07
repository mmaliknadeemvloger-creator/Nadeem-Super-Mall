import Link from 'next/link';
import Header from '@/components/Header';
import ProductCard from '@/components/ProductCard';
import styles from '@/app/page.module.css';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; sort?: string }>;
}) {
  const { category, sort } = await searchParams;

  let orderBy: any = { createdAt: 'desc' };
  if (sort === 'price_asc') orderBy = { price: 'asc' };
  if (sort === 'price_desc') orderBy = { price: 'desc' };
  
  const where = category ? { category } : {};

  const products = await prisma.product.findMany({
    where,
    orderBy,
  });

  // Get unique categories for filter
  const categoriesRaw = await prisma.product.findMany({
    select: { category: true },
    distinct: ['category']
  });
  const categories = categoriesRaw.map(c => c.category);

  return (
    <div className={styles.main}>
      <Header />
      <div className="container" style={{ padding: '4rem 1rem', flex: 1 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '3rem', borderBottom: '1px solid var(--border)', paddingBottom: '1rem' }}>
          <div>
            <h1 style={{ fontSize: '2.5rem', color: 'var(--foreground)' }}>
              {category ? `${category} Products` : 'All Products'}
            </h1>
            <p style={{ color: '#64748b', marginTop: '0.5rem' }}>Showing {products.length} results</p>
          </div>
          
          <div style={{ display: 'flex', gap: '1rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--foreground)' }}>Category</label>
              <form>
                <select name="category" defaultValue={category || ''} onChange={(e) => e.target.form?.submit()} style={{ padding: '0.5rem', borderRadius: '8px', border: '1px solid var(--border)', backgroundColor: 'var(--card-bg)' }}>
                  <option value="">All Categories</option>
                  {categories.map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
                {sort && <input type="hidden" name="sort" value={sort} />}
              </form>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--foreground)' }}>Sort By</label>
              <form>
                {category && <input type="hidden" name="category" value={category} />}
                <select name="sort" defaultValue={sort || ''} onChange={(e) => e.target.form?.submit()} style={{ padding: '0.5rem', borderRadius: '8px', border: '1px solid var(--border)', backgroundColor: 'var(--card-bg)' }}>
                  <option value="">Newest</option>
                  <option value="price_asc">Price: Low to High</option>
                  <option value="price_desc">Price: High to Low</option>
                </select>
              </form>
            </div>
          </div>
        </div>

        <div className={styles.productGrid}>
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
          {products.length === 0 && (
            <p style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '4rem 0', color: '#64748b', fontSize: '1.25rem' }}>No products found matching your criteria.</p>
          )}
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
