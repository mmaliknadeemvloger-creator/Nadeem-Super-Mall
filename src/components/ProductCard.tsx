'use client';

import { useCart } from '@/context/CartContext';
import styles from '@/app/page.module.css';
import Link from 'next/link';

export default function ProductCard({ product }: { product: any }) {
  const { addToCart } = useCart();
  
  const images = typeof product.images === 'string' ? JSON.parse(product.images) : product.images;
  const mainImage = images[0] || 'https://via.placeholder.com/400x400?text=No+Image';
  const finalPrice = product.price - (product.price * (product.discount / 100));

  return (
    <div className={styles.productCard}>
      <Link href={`/products/${product.id}`} style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
        <div className={styles.productImageContainer}>
          {product.discount > 0 && (
            <span className={styles.discountBadge}>-{product.discount}%</span>
          )}
          <img src={mainImage} alt={product.name} className={styles.productImage} />
        </div>
      </Link>
      <div className={styles.productInfo}>
        <span className={styles.productCategory}>{product.category}</span>
        <Link href={`/products/${product.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
          <h3 className={styles.productTitle}>{product.name}</h3>
        </Link>
        <div className={styles.productPriceContainer}>
          <div>
            {product.discount > 0 && <span className={styles.originalPrice}>${product.price.toFixed(2)}</span>}
            <span className={styles.price}>${finalPrice.toFixed(2)}</span>
          </div>
        </div>
        <button className={styles.addToCartBtn} onClick={() => addToCart(product)}>Add to Cart</button>
      </div>
    </div>
  );
}
