// components/pairs/WinnerSelection.tsx
"use client";

import { Pair } from "@/types/pair";
import { CheckIcon } from "@heroicons/react/24/solid";

interface WinnerSelectionProps {
    pair: Pair;
    onSelectWinner: (winnerId: number) => void;
    isUpdating: boolean;
}

export default function WinnerSelection({
    pair,
    onSelectWinner,
    isUpdating,
}: WinnerSelectionProps) {
    return (
        <div className="flex justify-center space-x-4 mt-3">
            <button
                onClick={() => onSelectWinner(pair.participant1.id)}
                disabled={isUpdating || pair.winner === pair.participant1.id}
                className={`px-3 py-1 rounded-md flex items-center ${pair.winner === pair.participant1.id
                        ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200"
                        : "bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600"
                    } ${isUpdating ? "opacity-50 cursor-not-allowed" : ""}`}
            >
                {pair.winner === pair.participant1.id && (
                    <CheckIcon className="h-4 w-4 mr-1" />
                )}
                Select Winner
            </button>

            <button
                onClick={() => onSelectWinner(pair.participant2.id)}
                disabled={isUpdating || pair.winner === pair.participant2.id}
                className={`px-3 py-1 rounded-md flex items-center ${pair.winner === pair.participant2.id
                        ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200"
                        : "bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600"
                    } ${isUpdating ? "opacity-50 cursor-not-allowed" : ""}`}
            >
                {pair.winner === pair.participant2.id && (
                    <CheckIcon className="h-4 w-4 mr-1" />
                )}
                Select Winner
            </button>
        </div>
    );
}