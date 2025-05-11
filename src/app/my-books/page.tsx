'use client'

import { useEffect, useState } from 'react'

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
            setBooks(data)
            setLoading(false)
        }

        fetchBooks()
    }, [])

    const handleDelete = async (id: string) => {
        const res = await fetch('/api/delete-book', {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id }),
        })

        if (res.ok) {
            alert('Книга удалена успешно!')
            setBooks((prev) => prev.filter((book) => book.id !== id))
        } else {
            const error = await res.json()
            alert(`Ошибка при удалении книги: ${error.error}`)
        }
    }

    return (
        <main className="p-8">
            <h1 className="text-2xl font-bold mb-4">Мои книги</h1>
            {loading ? (
                <p>Загрузка...</p>
            ) : books.length === 0 ? (
                <p>У вас нет сохранённых книг.</p>
            ) : (
                <ul className="grid grid-cols-3 gap-4">
                    {books.map((book) => (
                        <li key={book.id} className="flex gap-2 border p-4 rounded">
                            <img
                                src={book.thumbnail || 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?q=80&w=2073&auto=format&fit=crop&ixlib=rb-4.1.0'}
                                alt={book.title}
                                width={100}
                                className="object-cover rounded book-img"
                            />
                            <div className="flex-1">
                                <h3 className="font-bold text-lg leading-6 mb-2">{book.title}</h3>
                                <p className="text-sm text-gray-600">{book.authors}</p>
                                <p className="text-sm">{book.description?.slice(0, 100)}...</p>
                            </div>
                            <button
                                onClick={() => handleDelete(book.id)}
                                className="bg-red-600 text-white px-3 py-1 rounded h-fit"
                            >
                                Удалить
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </main>
    )
}
