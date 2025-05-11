'use client'

export default function Button({text, loading = false, onClick, color}) {
    const colorClasses: Record<string, string> = {
        red: 'border-red-400 text-red-400 hover:bg-red-400',
        green: 'border-green-500 text-green-500 hover:bg-green-500',
        blue: 'border-blue-400 text-blue-400 hover:bg-blue-400',
        gray: 'border-gray-400 text-gray-400 hover:bg-gray-400',
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
