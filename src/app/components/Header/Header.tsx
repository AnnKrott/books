'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import clsx from "clsx";

export default function Header() {
    const pathname = usePathname()

    return (
        <div className="flex fixed w-full gap-4 border-b bg-gray-100 px-6 py-3 z-3">
            <Link
                href="/admin"
                className={clsx(
                    'px-4 py-2 rounded-md font-medium',
                    pathname === '/admin'
                        ? 'bg-red-500 text-white'
                        : 'text-gray-700 hover:bg-gray-200'
                )}
            >
                Добавить книгу
            </Link>
            <Link
                href="/my-books"
                className={clsx(
                    'px-4 py-2 rounded-md font-medium',
                    pathname === '/my-books'
                        ? 'bg-red-500 text-white'
                        : 'text-gray-700 hover:bg-gray-200'
                )}
            >
                Мои книги
            </Link>
        </div>
    )
}
