import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function DELETE(req: Request) {
    try {
        const { id } = await req.json()
        if (!id) {
            return NextResponse.json({ error: 'ID книги не указано' }, { status: 400 })
        }

        await prisma.book.delete({ where: { id } })
        return NextResponse.json({ success: true })
    } catch (error) {
        return NextResponse.json({ error: `Ошибка при удалении книги: ${error instanceof Error ? error.message : error}` }, { status: 500 })
    }
}
