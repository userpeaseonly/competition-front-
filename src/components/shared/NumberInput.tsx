// components/shared/NumberInput.tsx
"use client";

interface NumberInputProps {
    label: string;
    value: number;
    onChange: (value: number) => void;
    step?: string;
    min?: number;
    max?: number;
}

export default function NumberInput({
    label,
    value,
    onChange,
    step = "1",
    min,
    max,
}: NumberInputProps) {
    return (
        <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                {label}
            </label>
            <input
                type="number"
                value={value}
                onChange={(e) => onChange(Number(e.target.value))}
                step={step}
                min={min}
                max={max}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
            />
        </div>
    );
}