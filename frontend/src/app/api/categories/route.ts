import { NextResponse } from 'next/server';
import CategoriesData from "@/data/categories.json"

export async function GET() {
    return NextResponse.json(CategoriesData)
}