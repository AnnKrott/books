'use client'

import { useState } from 'react'
import { UnifiedBook } from '@/app/types/book'

export default function BookSearch() {
    const [query, setQuery] = useState('')
    const [books, setBooks] = useState<UnifiedBook[]>([])
    const [loading, setLoading] = useState(false)
    const [manual, setManual] = useState({ title: '', authors: '', description: '', thumbnail: '' })

    const searchBooks = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        const res = await fetch('/api/search-books', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ query }),
        })

        const data: UnifiedBook[] = await res.json()
        setBooks(data)
        setLoading(false)
    }

    const handleManualAdd = async () => {
        await fetch('/api/save-book', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(manual),
        })
        alert('Книга добавлена вручную!')

        setBooks([
            ...books,
            {
                id: `manual-${Date.now()}`,
                volumeInfo: {
                    title: manual.title,
                    authors: manual.authors.split(',').map((a) => a.trim()),
                    description: manual.description,
                    imageLinks: manual.thumbnail ? { thumbnail: manual.thumbnail } : undefined,
                },
                fromDatabase: true,
            },
        ])

        setManual({ title: '', authors: '', description: '', thumbnail: '' })
    }

    return (
        <>
            <form onSubmit={searchBooks} className="space-y-4 mb-8">
                <input
                    type="text"
                    placeholder="Название книги"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="border p-2 w-full"
                />
                <button
                    className="bg-red-400 text-white px-4 py-2 rounded hover:bg-red-500"
                    disabled={loading}
                >
                    {loading ? 'Поиск...' : 'Найти книги'}
                </button>
            </form>

            <ul className="space-y-4 mb-12">
                {books.map((book) => (
                    <li key={book.id} className="border p-4 rounded">
                        <h3 className="font-bold text-lg">{book.volumeInfo.title}</h3>
                        <p className="text-sm text-gray-600">{book.volumeInfo.authors?.join(', ')}</p>
                        <p className="text-sm">{book.volumeInfo.description?.slice(0, 150)}...</p>
                        {book.volumeInfo.imageLinks?.thumbnail && (
                            <img
                                src={book.volumeInfo.imageLinks.thumbnail}
                                alt={book.volumeInfo.title}
                                className="mt-2"
                                width={100}
                            />
                        )}

                        {!book.fromDatabase && (
                            <button
                                onClick={async () => {
                                    const payload = {
                                        title: book.volumeInfo.title,
                                        authors: book.volumeInfo.authors.join(', '),
                                        description: book.volumeInfo.description,
                                        thumbnail: book.volumeInfo.imageLinks?.thumbnail,
                                    }

                                    const res = await fetch('/api/save-book', {
                                        method: 'POST',
                                        headers: { 'Content-Type': 'application/json' },
                                        body: JSON.stringify(payload),
                                    })

                                    if (res.ok) {
                                        alert('Книга добавлена в Мои книги!')
                                    } else {
                                        alert('Ошибка при сохранении книги')
                                    }
                                }}
                                className="mt-2 text-sm bg-green-600 text-white px-3 py-1 rounded"
                            >
                                Добавить в мои книги
                            </button>
                        )}
                    </li>
                ))}
            </ul>

            <div className="border-t pt-6">
                <h2 className="text-xl font-semibold mb-2">Не нашли книгу? Добавьте вручную</h2>
                <div className="space-y-2">
                    <input
                        type="text"
                        placeholder="Название"
                        value={manual.title}
                        onChange={(e) => setManual({ ...manual, title: e.target.value })}
                        className="border p-2 w-full"
                    />
                    <input
                        type="text"
                        placeholder="Автор(ы)"
                        value={manual.authors}
                        onChange={(e) => setManual({ ...manual, authors: e.target.value })}
                        className="border p-2 w-full"
                    />
                    <textarea
                        placeholder="Описание"
                        value={manual.description}
                        onChange={(e) => setManual({ ...manual, description: e.target.value })}
                        className="border p-2 w-full"
                    />
                    <input
                        type="text"
                        placeholder="Ссылка на обложку"
                        value={manual.thumbnail}
                        onChange={(e) => setManual({ ...manual, thumbnail: e.target.value })}
                        className="border p-2 w-full"
                    />
                    <button
                        onClick={handleManualAdd}
                        type="button"
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    >
                        Добавить вручную
                    </button>
                </div>
            </div>
        </>
    )
}
