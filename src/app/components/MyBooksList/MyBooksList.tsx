'use client'

import Button from "@/app/components/ui/Button/Button";
import toast from "react-hot-toast";
import { isUrl, cleanImageUrl } from "@/app/utils/imageUtils";
import BookTimer from "@/app/components/BookTimer/BookTimer";
import { formatTime } from "@/app/utils/formatTime";
import Link from "next/link";

export default function MyBooksList({ books, setBooks, loading }) {
    const handleDelete = async (id: string) => {
        const res = await fetch('/api/delete-book', {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id }),
        });

        if (res.ok) {
            toast.success('Книга удалена успешно!');
            setBooks((prev) => prev.filter((book) => book.id !== id));
        } else {
            const error = await res.json();
            toast.error(`Ошибка при удалении книги: ${error.error}`);
        }
    };

    return (
        <ul className="grid grid-cols-2 gap-4">
            {books.map((book) => {
                const recentSessions = (book.sessions ?? [])
                    .slice()
                    .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
                    .slice(0, 3);

                return (
                    <li
                        key={book.id}
                        className="flex flex-col justify-between gap-2 p-4 rounded-2xl bg-gray-100"
                    >
                        {/* Верхняя часть: обложка и описание */}
                        <div className="flex flex-col gap-4 mb-4">
                            <div className="flex gap-3">
                                <img
                                    src={
                                        book.thumbnail && isUrl(book.thumbnail) && cleanImageUrl(book.thumbnail)
                                            ? cleanImageUrl(book.thumbnail)
                                            : 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?q=80&w=2073&auto=format&fit=crop&ixlib=rb-4.1.0'
                                    }
                                    alt={book.title}
                                    width={100}
                                    className="object-cover rounded book-img"
                                />
                                <div className="flex-1">
                                    <h3 className="font-bold text-lg leading-6 mb-2">{book.title}</h3>
                                    <p className="text-sm text-gray-600">{book.authors}</p>
                                    <p className="text-sm">{book.description?.slice(0, 150)}...</p>
                                    {book.elapsedTime !== undefined && (
                                        <p className="text-sm text-gray-500 mt-2">
                                            Прошло времени: {formatTime(book.elapsedTime)}
                                        </p>
                                    )}
                                </div>
                            </div>


                            <div className="mt-4">
                                <h4 className="font-semibold text-sm mb-1">Недавние сессии:</h4>
                                <ul className="space-y-1 text-sm">
                                    {recentSessions.map((session, idx) => (
                                        <li key={session.id} className="flex justify-between">
                                          <span>
                                            {idx + 1}. {formatTime(session.duration)}
                                          </span>
                                                                        <span className="text-gray-500">
                                            {new Date(session.createdAt).toLocaleDateString("ru-RU")}
                                          </span>
                                        </li>
                                    ))}
                                </ul>

                                <Link
                                    href={`/books/${book.id}/sessions`}
                                    className="text-blue-600 text-xs hover:underline mt-1 block"
                                >
                                    Смотреть все ({book.sessions.length})
                                </Link>

                            </div>
                        </div>


                        {/* Таймер и кнопка удаления */}
                        <div className="relative pt-8 flex justify-between items-center">
                            <BookTimer
                                bookId={book.id}
                                initialTime={book.elapsedTime ?? 0}
                                timerStartedAt={book.timerStartedAt}
                                loading={loading}
                                onTimerStopped={(updatedBook) => {
                                    setBooks((prevBooks) =>
                                        prevBooks.map((b) =>
                                            b.id === updatedBook.id ? { ...b, ...updatedBook } : b
                                        )
                                    );
                                }}
                            />

                            <Button
                                loading={loading}
                                onClick={() => handleDelete(book.id)}
                                text="Удалить"
                            />
                        </div>
                    </li>
                );
            })}
        </ul>
    );
}
