// components/tournaments/TournamentCard.tsx
"use client";

import { Tournament } from "@/types/tournament";
import { GenderBadge, AgeWeightDisplay } from "./DisplayComponents";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";

export default function TournamentCard({
    tournament,
    onEdit,
    onDelete,
}: {
    tournament: Tournament;
    onEdit: () => void;
    onDelete: () => void;
}) {
    return (
        <div className="rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm overflow-hidden">
            <div className="p-4">
                <div className="flex justify-between items-start">
                    <GenderBadge gender={tournament.gender} />
                    <div className="flex space-x-2">
                        <button
                            onClick={onEdit}
                            className="text-gray-400 hover:text-blue-500 transition-colors"
                        >
                            <PencilIcon className="h-5 w-5" />
                        </button>
                        <button
                            onClick={onDelete}
                            className="text-gray-400 hover:text-red-500 transition-colors"
                        >
                            <TrashIcon className="h-5 w-5" />
                        </button>
                    </div>
                </div>

                <AgeWeightDisplay
                    min_age={tournament.min_age}
                    max_age={tournament.max_age}
                    min_weight={tournament.min_weight}
                    max_weight={tournament.max_weight}
                />
            </div>
        </div>
    );
}