import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function DELETE(req: Request) {
    try {
        const { id } = await req.json()
        console.log('Received ID:', id) // Логируем, чтобы убедиться, что id приходит
        if (!id) {
            return NextResponse.json({ error: 'ID книги не указано' }, { status: 400 })
        }

        await prisma.book.delete({ where: { id } })
        console.log('Book deleted successfully')  // Логируем успех
        return NextResponse.json({ success: true })
    } catch (error) {
        console.error('Error deleting book:', error) // Логируем ошибку
        return NextResponse.json({ error: `Ошибка при удалении книги: ${error instanceof Error ? error.message : error}` }, { status: 500 })
    }
}
