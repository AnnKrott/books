import { prisma } from '@/lib/prisma'

export default async function Page() {
    const books = await prisma.book.findMany()

    return (
        <main className="p-8">
            <h1 className="text-2xl font-bold mb-4">Мои книги</h1>
            {books.length === 0 ? (
                <p>У вас нет сохранённых книг.</p>
            ) : (
                <ul className="grid grid-cols-3 gap-4">
                    {books.map((book) => (
                        <li key={book.id} className="flex gap-2 border p-4 rounded">
                            <img
                                src={book.thumbnail || 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?q=80&w=2073&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'}
                                alt={book.title}
                                width={100}
                                className="book-img object-cover rounded"
                            />
                            <div>
                                <h3 className="font-bold text-lg leading-6 mb-2">{book.title}</h3>
                                <p className="text-sm text-gray-600">{book.authors}</p>
                                <p className="text-sm">{book.description?.slice(0, 100)}...</p>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </main>
    )
}
