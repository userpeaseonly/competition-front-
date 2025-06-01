// components/shared/ModalWrapper.tsx
"use client";

import { XMarkIcon } from "@heroicons/react/24/solid";

export default function ModalWrapper({
    children,
    onClose,
}: {
    children: React.ReactNode;
    onClose: () => void;
}) {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 w-full max-w-md relative">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
                >
                    <XMarkIcon className="h-6 w-6" />
                </button>
                {children}
            </div>
        </div>
    );
}