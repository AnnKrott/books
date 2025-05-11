'use client'

export default function Input({value, placeholder, onChange}) {
    return (
        <input
            value={value}
            type="text"
            placeholder={placeholder}
            onChange={onChange}
            className="bg-gray-100 py-2 px-4 w-full rounded-xl focus:outline-none focus:border-white focus:ring-2 focus:ring-red-400"
        />
    )
}
