import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import type { UnifiedBook } from '@/app/types/book'

export async function POST(req: Request) {
    const { query } = await req.json()

    // Поиск в базе данных
    const allBooks = await prisma.book.findMany()
    const dbBooks = allBooks.filter(book =>
        book.title.toLowerCase().includes(query.toLowerCase())
    )

    const formattedDbBooks: UnifiedBook[] = dbBooks.map(book => ({
        id: `db-${book.id}`,
        volumeInfo: {
            title: book.title,
            authors: book.authors?.split(',').map(a => a.trim()) ?? [],
            description: book.description ?? undefined,
            imageLinks: book.thumbnail ? { thumbnail: book.thumbnail } : undefined,
        },
        fromDatabase: true,
    }))

    // Поиск в Google API
    const googleRes = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}`)
    const googleData = await googleRes.json()

    const googleBooks: UnifiedBook[] = (googleData.items || []).map((item: any) => ({
        id: `google-${item.id}`,
        volumeInfo: {
            title: item.volumeInfo.title,
            authors: item.volumeInfo.authors || [],
            description: item.volumeInfo.description,
            imageLinks: item.volumeInfo.imageLinks ? { thumbnail: item.volumeInfo.imageLinks.thumbnail } : undefined,
        },
        fromDatabase: false,
    }))

    // Никакой записи в БД — только чтение
    return NextResponse.json([...formattedDbBooks, ...googleBooks])
}
