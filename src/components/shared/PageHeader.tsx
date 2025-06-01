// components/shared/PageHeader.tsx
"use client";

import { PlusIcon } from "@heroicons/react/24/outline";

interface PageHeaderProps {
    title: string;
    onAdd?: () => void;
    addButtonText?: string;
}

export default function PageHeader({
    title,
    onAdd,
    addButtonText = "Add New",
}: PageHeaderProps) {
    return (
        <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
                {title}
            </h1>
            {onAdd && (
                <button
                    onClick={onAdd}
                    className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                    <PlusIcon className="h-5 w-5 mr-2" />
                    {addButtonText}
                </button>
            )}
        </div>
    );
}