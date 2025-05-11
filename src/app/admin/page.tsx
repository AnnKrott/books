'use client'

import { useState } from 'react'
import { UnifiedBook } from '@/app/types/book'
import Button from "@/app/components/ui/Button/Button";
import Input from "@/app/components/ui/Input/Input";
import BookList from "@/app/components/BookList/BookList";
import ManualAdd from "@/app/components/ManualAdd/ManualAdd";

export default function Admin() {
    const [query, setQuery] = useState('')
    const [books, setBooks] = useState<UnifiedBook[]>([])
    const [loading, setLoading] = useState(false)


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

    return (
        <div className="grid grid-cols-3 gap-6">
            <div className="col-span-2 overflow-y-auto p-4">
                <h1 className="text-xl font-bold mb-6">Поиск книг</h1>
                <form onSubmit={searchBooks} className="space-y-4 mb-8">
                    <Input value={query} placeholder="Название книги" onChange={e => setQuery(e.target.value)} />
                    <Button loading={loading} onClick={searchBooks} text={loading ? 'Поиск...' : 'Найти книги'} />
                </form>

               <BookList books={books} setBooks={setBooks} loading={loading} />
            </div>

            <ManualAdd books={books} setBooks={setBooks} />
        </div>
    )

}
