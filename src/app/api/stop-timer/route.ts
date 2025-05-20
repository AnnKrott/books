// /app/api/stop-timer/route.ts
import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
    try {
        const { id, time } = await req.json()

        // создаём сессию
        await prisma.timerSession.create({
            data: {
                bookId: id,
                duration: time,
            }
        })

        // обновляем книгу: увеличиваем elapsedTime и сбрасываем timerStartedAt
        const book = await prisma.book.update({
            where: { id },
            data: {
                elapsedTime: { increment: time },
                timerStartedAt: null,               // ← вот эта строка!
            },
            include: {
                sessions: { orderBy: { createdAt: 'asc' } }
            }
        })

        return NextResponse.json({ book })
    } catch (error) {
        console.error(error)
        return NextResponse.json({ error: 'Не удалось остановить таймер' }, { status: 500 })
    }
}
