import Link from 'next/link'

export default function Home() {
  return (
      <main className="p-8">
        <Link href="/admin" className="bg-red-400 text-white px-4 py-2 rounded hover:bg-red-500 transition mr-2">
          Добавить книгу
        </Link>
        <Link
          href="/my-books"
          className="bg-red-400 text-white px-4 py-2 rounded hover:bg-red-500 transition"
        >
          Мои книги
        </Link>
      </main>
  )
}
