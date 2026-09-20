import { NextResponse } from 'next/server';
import ItemsData from "@/data/items.json"

export async function GET(
    request: Request, 
    { params }: { params: Promise<{ id: string }> } 
) {
    const { id } = await params
    const item = ItemsData.find((item) => item.id === Number(id));
    if (!item) {
        return NextResponse.json(
            { error: 'Item not found' },
            { status: 404 }
        )
    }
    return NextResponse.json(item)
}