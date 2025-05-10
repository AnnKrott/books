// pages/my-books.tsx
import { prisma } from '@/lib/prisma'

export default async function Page() {
    const books = await prisma.book.findMany()

    return (
        <main className="p-8">
            <h1 className="text-2xl font-bold mb-4">Мои книги</h1>
            {books.length === 0 ? (
                <p>У вас нет сохранённых книг.</p>
            ) : (
                <ul className="space-y-2">
                    {books.map((book) => (
                        <li key={book.id} className="border p-4 rounded">
                            <h3 className="font-bold text-lg">{book.title}</h3>
                            <p className="text-sm text-gray-600">{book.authors}</p>
                            <p className="text-sm">{book.description?.slice(0, 150)}...</p>
                            {book.thumbnail && (
                                <img
                                    src={book.thumbnail}
                                    alt={book.title}
                                    className="mt-4"
                                    width={100}
                                />
                            )}
                        </li>
                    ))}
                </ul>
            )}
        </main>
    )
}
