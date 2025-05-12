// /app/api/start-timer/route.ts
import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
    try {
        const { id } = await req.json()

        await prisma.book.update({
            where: { id },
            data: {
                timerStartedAt: new Date()
            }
        })

        return NextResponse.json({ success: true })
    } catch (error) {
        console.error(error)
        return NextResponse.json({ error: 'Не удалось запустить таймер' }, { status: 500 })
    }
}
