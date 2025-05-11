'use client'

import Button from "@/app/components/ui/Button/Button";

export default function BookList({books, setBooks, loading}) {
    const handleDelete = async (bookId: string) => {
        const cleanId = bookId.replace('db-', '')
        const res = await fetch('/api/delete-book', {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: Number(cleanId) }),
        })
        if (res.ok) {
            alert('Книга удалена из Моих книг!')
            setBooks(books.filter((b) => b.id !== bookId))
        } else {
            const error = await res.json()
            alert(`Ошибка при удалении книги: ${error.error}`)
        }
    }

    const handleAdd = async (book) => {
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
            const error = await res.json()
            alert(`Ошибка при сохранении книги: ${error.error}`)
        }
    }

    const cleanImageUrl = (url: string) => {
        const u = new URL(url)
        u.searchParams.delete('edge')
        return u.toString()
    }

    const isUrl = (str: string): boolean => {
        try {
            new URL(str)
            return true
        } catch (_) {
            return false
        }
    }

   return (
       <ul className="space-y-4 mb-12 grid grid-cols-2 gap-4">
           {books.map((book) => (
               <li key={book.id} className="p-4 rounded-2xl bg-gray-100">
                   <div className="flex gap-4 mb-4">
                       {book.volumeInfo.imageLinks?.thumbnail && (
                           <img
                               src={
                                   isUrl(book.volumeInfo.imageLinks.thumbnail)
                                       ? cleanImageUrl(book.volumeInfo.imageLinks.thumbnail)
                                       : 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?q=80&w=2073&auto=format&fit=crop&ixlib=rb-4.1.0'
                               }
                               alt={book.volumeInfo.title}
                               className="rounded-xl book-img object-cover"
                               width={100}
                           />
                       )}
                       <div>
                           <h3 className="font-bold text-lg">{book.volumeInfo.title}</h3>
                           <p className="text-sm text-gray-600">{book.volumeInfo.authors?.join(', ')}</p>
                           <p className="text-sm">{book.volumeInfo.description?.slice(0, 150)}...</p>
                       </div>
                   </div>

                   <div className="text-right">
                       {book.fromDatabase ? (
                           <Button onClick={() => handleDelete(book.id)} text="Удалить" loading={loading} />
                       ) : (
                           <Button onClick={() => handleAdd(book)} text="Добавить" loading={loading} color="green" />
                       )}
                   </div>

               </li>
           ))}
       </ul>
   )
}
