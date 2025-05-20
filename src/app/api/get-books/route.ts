import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET() {
    const books = await prisma.book.findMany({ // или любой ваш порядок
        include: {
            sessions: { orderBy: { createdAt: 'asc' } }
        }
    })
    return NextResponse.json(books)
}
