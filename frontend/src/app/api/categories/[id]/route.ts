import { NextResponse } from 'next/server';
import CategoriesData from "@/data/categories.json"

export async function GET(
    request: Request, 
    { params }: { params: Promise<{ id: string }> } 
) {
    const { id } = await params
    const category = CategoriesData.find((item) => item.id === Number(id));
    if (!category) {
        return NextResponse.json(
            { error: 'Category not found' },
            { status: 404 }
        )
    }
    return NextResponse.json(category)
}