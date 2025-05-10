'use client'

import BookSearch from '@/app/components/Booksearch'

export default function AdminPage() {
    return (
        <main className="p-8 max-w-2xl mx-auto">
            <h1 className="text-2xl font-bold mb-6">Поиск книг</h1>
            <BookSearch />
        </main>
    )
}
