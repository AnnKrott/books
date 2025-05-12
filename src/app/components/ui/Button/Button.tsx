'use client'

export default function Button({text, loading = false, onClick, color}) {
    const colorClasses: Record<string, string> = {
        red: 'bg-red-400 text-white hover:bg-red-500',
        green: 'bg-green-500 text-white hover:bg-green-600',
        blue: 'bg-blue-400 text-white hover:bg-blue-500',
        gray: 'bg-gray-400 text-white hover:bg-gray-500',
    }

    const selectedClasses = colorClasses[color] || colorClasses.red

    return (
        <button
            className={`${selectedClasses} border px-4 py-2 rounded-xl hover:text-white transition-colors disabled:opacity-50`}
            disabled={loading}
            onClick={onClick}
        >
            {loading ? 'Загрузка...' : text}
        </button>
    )

}
