'use client'

import Button from "@/app/components/ui/Button/Button";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { isUrl, cleanImageUrl } from "@/app/utils/imageUtils"; // опционально вынеси утилиты
import BookTimer from "@/app/components/BookTimer/BookTimer";
import { formatTime } from "@/app/utils/formatTime";

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
            {books.map((book) => (
                <li key={book.id} className="flex flex-col justify-between gap-2 p-4 rounded-2xl bg-gray-100">
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
                            {book.elapsedTime !== undefined && (
                                <p className="text-sm text-gray-500 mt-2">
                                    Прошло времени: {formatTime(book.elapsedTime)}
                                </p>
                            )}
                        </div>
                    </div>

                    <div className="relative pt-8 flex justify-between items-center">
                        <BookTimer
                            bookId={book.id}
                            initialTime={book.elapsedTime ?? 0}
                            timerStartedAt={book.timerStartedAt}
                            loading={loading}
                            onTimerStopped={(updatedBook) => {
                                setBooks((prevBooks) =>
                                    prevBooks.map((b) => (b.id === updatedBook.id ? { ...b, ...updatedBook } : b))
                                );
                            }}
                        />

                        <div className="flex justify-between items-center">
                            <Button
                                loading={loading}
                                onClick={() => handleDelete(book.id)}
                                text="Удалить"
                            />
                        </div>
                    </div>
                </li>
            ))}
        </ul>
    );
}
