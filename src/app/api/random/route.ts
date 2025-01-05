import { NextResponse, type NextRequest } from 'next/server'

export async function GET(request: NextRequest) {   
    const data = await fetch(`${process.env.UNSPLASH_BASE_URL}/photos/random?client_id=${process.env.UNSPLASH_CLIENT_ID}`);
    const response = await data.json();
    return NextResponse.json(response);
}