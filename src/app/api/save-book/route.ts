import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(req: Request) {
    const { title, authors, description, thumbnail } = await req.json()
    const book = await prisma.book.create({
        data: { title, authors, description, thumbnail },
    })
    return NextResponse.json(book)
}
