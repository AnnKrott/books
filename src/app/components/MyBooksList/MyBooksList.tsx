'use client'

import Button from "@/app/components/ui/Button/Button";

export default function MyBooksList({books, setBooks, loading}) {

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

    const isUrl = (str: string): boolean => {
        try {
            new URL(str)
            return true
        } catch (_) {
            return false
        }
    }

    const cleanImageUrl = (url: string) => {
        const u = new URL(url)
        u.searchParams.delete('edge')
        return u.toString()
    }

    return (
        <ul className="grid grid-cols-3 gap-4">
            {books.map((book) => (
                <li key={book.id} className="flex flex-col justify-between p-4 rounded-2xl bg-gray-100">
                    <div className="flex gap-4 mb-4">
                        <img
                            src={book.thumbnail && isUrl(book.thumbnail) && cleanImageUrl(book.thumbnail) || 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?q=80&w=2073&auto=format&fit=crop&ixlib=rb-4.1.0'}
                            alt={book.title}
                            width={100}
                            className="object-cover rounded book-img"
                        />
                        <div className="flex-1">
                            <h3 className="font-bold text-lg leading-6 mb-2">{book.title}</h3>
                            <p className="text-sm text-gray-600">{book.authors}</p>
                            <p className="text-sm">{book.description?.slice(0, 150)}...</p>
                        </div>
                    </div>

                    <div className="text-right">
                        <Button loading={loading} onClick={() => handleDelete(book.id)} text="Удалить"/>
                    </div>
                </li>
                ))}
        </ul>
    )
}
