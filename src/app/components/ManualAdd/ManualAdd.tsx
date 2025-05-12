'use client'

import { useState } from "react";
import Input from "@/app/components/ui/Input/Input";
import Button from "@/app/components/ui/Button/Button";
import toast from "react-hot-toast";

export default function ManualAdd({books, setBooks}) {
    const [manual, setManual] = useState({ title: '', authors: '', description: '', thumbnail: '' })

    const handleManualAdd = async () => {
        await fetch('/api/save-book', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(manual),
        })
        toast.success('Книга добавлена вручную!');

        setBooks([
            ...books,
            {
                id: `manual-${Date.now()}`,
                volumeInfo: {
                    title: manual.title,
                    authors: manual.authors.split(',').map((a) => a.trim()),
                    description: manual.description,
                    imageLinks: manual.thumbnail ? { thumbnail: manual.thumbnail } : undefined,
                },
                fromDatabase: true,
            },
        ])

        setManual({ title: '', authors: '', description: '', thumbnail: '' })
    }

    return (
        <div className="sticky top-0 self-start p-4 h-fit">
            <h2 className="text-xl font-semibold mb-6">Не нашли книгу? Добавьте вручную</h2>
            <div className="space-y-4">
                <Input value={manual.title} onChange={(e) => setManual({ ...manual, title: e.target.value })} placeholder="Название" />
                <Input value={manual.authors} onChange={(e) => setManual({ ...manual, authors: e.target.value })} placeholder="Автор(ы)" />
                <Input value={manual.thumbnail} onChange={(e) => setManual({ ...manual, thumbnail: e.target.value })} placeholder="Ссылка на обложку" />
                <textarea
                    placeholder="Описание"
                    value={manual.description}
                    onChange={(e) => setManual({ ...manual, description: e.target.value })}
                    className="bg-gray-100 py-2 px-4 w-full rounded-xl focus:outline-none focus:border-white focus:ring-2 focus:ring-red-400"
                />
                <Button onClick={handleManualAdd} text="Добавить вручную" />
            </div>
        </div>
    )
}
