'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import clsx from "clsx";

export default function Header() {
    const pathname = usePathname()

    return (
        <header className="flex fixed w-full gap-4 border-b border-gray-100 bg-gray-100 px-6 py-3 z-3">
            <div className="container mx-auto flex gap-4 justify-end items-center">
                <Link
                    href="/admin"
                    className={clsx(
                        'px-4 py-2 rounded-xl font-medium',
                        pathname === '/admin'
                            ? 'bg-red-400 text-white'
                            : 'text-gray-700 hover:bg-gray-200'
                    )}
                >
                    Добавить книгу
                </Link>
                <Link
                    href="/my-books"
                    className={clsx(
                        'px-4 py-2 rounded-xl font-medium',
                        pathname === '/my-books'
                            ? 'bg-red-400 text-white'
                            : 'text-gray-700 hover:bg-gray-200'
                    )}
                >
                    Мои книги
                </Link>
            </div>

        </header>
    )
}
