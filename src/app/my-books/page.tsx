'use client'

import { useEffect, useState } from 'react'
import MyBooksList from "@/app/components/MyBooksList/MyBooksList";

interface Book {
    id: string
    title: string
    authors: string
    description: string
    thumbnail: string | null
}

export default function MyBooks() {
    const [books, setBooks] = useState<Book[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchBooks = async () => {
            const res = await fetch('/api/get-books')
            const data = await res.json()

            const formatted = data.map((book: Book) => ({
                ...book,
                elapsedTime: book.elapsedTime ?? 0,
            }))

            setBooks(formatted)
            setLoading(false)
        }

        fetchBooks()
    }, [])

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Мои книги</h1>
            {loading ? (
                <p>Загрузка...</p>
            ) : books.length === 0 ? (
                <p>У вас нет сохранённых книг.</p>
            ) : (
                <MyBooksList books={books} setBooks={setBooks} loading={loading}/>
            )}
        </div>
    )
}
