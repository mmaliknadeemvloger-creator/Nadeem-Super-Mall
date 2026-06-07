import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const banners = await prisma.banner.findMany({
      orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json(banners);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch banners' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const banner = await prisma.banner.create({
      data: {
        title: body.title,
        imageUrl: body.imageUrl,
        link: body.link,
        isActive: body.isActive ?? true,
      }
    });
    return NextResponse.json(banner);
  } catch (error) {
    console.error('Error creating banner:', error);
    return NextResponse.json({ error: 'Failed to create banner' }, { status: 500 });
  }
}
