// /app/api/stop-timer/route.ts
import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
    try {
        const { id } = await req.json()

        const book = await prisma.book.findUnique({ where: { id } })

        if (!book?.timerStartedAt) {
            return NextResponse.json({ error: 'Таймер не запущен' }, { status: 400 })
        }

        const now = new Date()
        const startedAt = new Date(book.timerStartedAt)
        const diffInSeconds = Math.floor((now.getTime() - startedAt.getTime()) / 1000)

        const updatedBook = await prisma.book.update({
            where: { id },
            data: {
                elapsedTime: (book.elapsedTime ?? 0) + diffInSeconds,
                timerStartedAt: null
            }
        })

        return NextResponse.json({ book: updatedBook })
    } catch (error) {
        console.error(error)
        return NextResponse.json({ error: 'Не удалось остановить таймер' }, { status: 500 })
    }
}
