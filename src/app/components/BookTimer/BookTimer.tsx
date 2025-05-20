'use client'

import Button from "@/app/components/ui/Button/Button";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { formatTime } from "@/app/utils/formatTime";

interface BookTimerProps {
    bookId: string;
    initialTime: number;
    timerStartedAt?: string;
    loading: boolean;
    onTimerStopped: (updatedBook: any) => void;
}

export default function BookTimer({ bookId, initialTime, timerStartedAt, loading, onTimerStopped }: BookTimerProps) {
    const [time, setTime] = useState(initialTime); // Храним только прошедшее время
    const [running, setRunning] = useState<boolean>(!!timerStartedAt);

    useEffect(() => {
        if (timerStartedAt) {
            const start = new Date(timerStartedAt).getTime();
            const now = Date.now();
            const passed = Math.floor((now - start) / 1000); // Вычисляем только прошедшее время
            setTime(passed); // Устанавливаем только прошедшее время
            setRunning(true);
        }
    }, [timerStartedAt]);

    useEffect(() => {
        if (!running) {
            setTime(0);
            return
        };

        const interval = setInterval(() => {
            setTime((prev) => prev + 1); // Увеличиваем только прошедшее время
        }, 1000);

        return () => clearInterval(interval);
    }, [running]);

    const handleStart = async () => {
        const res = await fetch('/api/start-timer', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: bookId }),
        });

        if (res.ok) {
            setTime(0); // Сбрасываем время на клиенте
            setRunning(true);
            toast.success('Таймер запущен!');
        } else {
            const error = await res.json();
            toast.error(`Ошибка при запуске таймера: ${error.error}`);
        }
    };

    const handleStop = async () => {
        const res = await fetch('/api/stop-timer', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: bookId, time }),
        });

        if (res.ok) {
            const { book } = await res.json();
            toast.success(`Таймер остановлен! Прошло ${formatTime(time)}.`);
            setRunning(false);
            setTime(0);
            onTimerStopped(book);
        } else {
            const error = await res.json();
            toast.error(`Ошибка при остановке таймера: ${error.error}`);
        }
    };

    return (
        <div>
            {running ? (
                <div>
                    <p className="absolute top-0">Таймер: {formatTime(time)}</p>
                    <Button
                        loading={loading}
                        onClick={handleStop}
                        text="Остановить таймер"
                    />
                </div>
            ) : (
                <Button
                    loading={loading}
                    onClick={handleStart}
                    text="Запустить таймер"
                />
            )}
        </div>
    );
}
