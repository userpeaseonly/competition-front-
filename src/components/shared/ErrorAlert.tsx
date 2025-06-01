// components/shared/ErrorAlert.tsx
"use client";

import { XCircleIcon } from "@heroicons/react/24/outline";

export default function ErrorAlert({
    message,
    className = ""
}: {
    message: string;
    className?: string;
}) {
    return (
        <div className={`bg-red-50 border-l-4 border-red-500 p-4 ${className}`}>
            <div className="flex items-center">
                <div className="flex-shrink-0">
                    <XCircleIcon className="h-5 w-5 text-red-500" />
                </div>
                <div className="ml-3">
                    <p className="text-sm text-red-700">{message}</p>
                </div>
            </div>
        </div>
    );
}