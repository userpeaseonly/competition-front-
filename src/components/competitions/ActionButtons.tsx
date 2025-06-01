// components/competitions/ActionButtons.tsx
"use client";

import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";

export default function ActionButtons({
    onEdit,
    onDelete,
}: {
    onEdit: () => void;
    onDelete: () => void;
}) {
    return (
        <div className="flex justify-end space-x-2">
            <button
                onClick={onEdit}
                className="p-2 text-blue-600 hover:text-blue-800 dark:hover:text-blue-400 transition-colors"
            >
                <PencilIcon className="h-5 w-5" />
            </button>
            <button
                onClick={onDelete}
                className="p-2 text-red-600 hover:text-red-800 dark:hover:text-red-400 transition-colors"
            >
                <TrashIcon className="h-5 w-5" />
            </button>
        </div>
    );
}