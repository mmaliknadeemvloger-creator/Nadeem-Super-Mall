import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const ordersCount = await prisma.order.count();
    const productsCount = await prisma.product.count();
    const revenueObj = await prisma.order.aggregate({
      _sum: { total: true },
      where: { status: { not: 'Cancelled' } }
    });
    
    return NextResponse.json({
      orders: ordersCount,
      products: productsCount,
      revenue: revenueObj._sum.total || 0,
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch stats' }, { status: 500 });
  }
}
