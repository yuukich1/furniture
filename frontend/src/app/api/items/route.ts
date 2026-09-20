import { NextResponse } from 'next/server';
import ItemData from '@/data/items.json';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const categoryId = searchParams.get('categoryId');

  if (categoryId) {
    const filteredProducts = ItemData.filter(
      (item) => item.category.id === Number(categoryId)
    );
    return NextResponse.json(filteredProducts);
  }

  return NextResponse.json(ItemData);
}