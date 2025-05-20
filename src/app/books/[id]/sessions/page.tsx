// app/books/[id]/sessions/page.tsx
import { prisma } from "@/lib/prisma";
import { formatTime } from "@/app/utils/formatTime";
import Link from "next/link";

interface Params {
    params: { id: string };
}

export const dynamic = "force-dynamic";

export default async function BookSessionsPage({ params }: Params) {
    const { id } = params;
    const book = await prisma.book.findUnique({
        where: { id },
        include: {
            sessions: { orderBy: { createdAt: "desc" } },
        },
    });

    if (!book) {
        return <p>Книга не найдена.</p>;
    }

    // Находим максимальную длительность среди всех сессий
    const maxDuration =
        book.sessions.reduce((max, s) => (s.duration > max ? s.duration : max), 0) ?? 0;

    return (
        <div className="max-w-2xl mx-auto p-4">
            <Link href="/" className="text-blue-600 underline mb-4 inline-block">
                ← Назад к списку книг
            </Link>

            <h1 className="text-2xl font-bold mb-2">{book.title}</h1>
            <p className="text-gray-600 mb-6">Все сессии чтения</p>

            <div className="mt-4">
                <h4 className="font-semibold text-sm mb-1">Сессии чтения:</h4>
                <ul className="space-y-2">
                    {book.sessions.map((session, idx) => {
                        // рассчитываем процент заполнения полоски
                        const pct =
                            maxDuration > 0
                                ? Math.round((session.duration / maxDuration) * 100)
                                : 0;

                        return (
                            <li key={session.id} className="flex items-center space-x-3">
                                {/* Текст: № запуска и время */}
                                <span className="text-sm w-40">
                  {idx + 1} запуск: {formatTime(session.duration)}
                </span>

                                {/* Полоса-фон */}
                                <div className="flex-1 bg-gray-300 h-2 rounded overflow-hidden">
                                    {/* Заполнение */}
                                    <div
                                        className="h-full rounded"
                                        style={{ width: `${pct}%`, backgroundColor: '#3b82f6' }}
                                    />
                                </div>

                                {/* Процент (опционально) */}
                                <span className="text-xs text-gray-500 w-8 text-right">
                  {pct}%
                </span>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>
    );
}
