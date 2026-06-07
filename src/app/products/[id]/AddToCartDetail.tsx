'use client';

import { useCart } from '@/context/CartContext';

export default function AddToCartDetail({ product }: { product: any }) {
  const { addToCart } = useCart();
  
  return (
    <button 
      onClick={() => addToCart(product)}
      disabled={product.stock <= 0}
      style={{
        width: '100%',
        padding: '1.25rem',
        backgroundColor: product.stock > 0 ? 'var(--primary)' : '#cbd5e1',
        color: 'white',
        border: 'none',
        borderRadius: '12px',
        fontSize: '1.25rem',
        fontWeight: 700,
        cursor: product.stock > 0 ? 'pointer' : 'not-allowed',
        transition: 'transform 0.2s',
        boxShadow: product.stock > 0 ? '0 4px 6px -1px rgba(79, 70, 229, 0.2)' : 'none'
      }}
      onMouseOver={e => product.stock > 0 && (e.currentTarget.style.transform = 'translateY(-2px)')}
      onMouseOut={e => product.stock > 0 && (e.currentTarget.style.transform = 'translateY(0)')}
    >
      {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
    </button>
  );
}
