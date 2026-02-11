// app/final-pairs/page.tsx
"use client";

import { useState } from "react";
import { useFinalPairs, useDeleteFinalPair, useSetFinalPairWinner } from "@/hooks/api/finalPairs";
import MainContent from "@/components/MainContent";
import PageHeader from "@/components/shared/PageHeader";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
import ErrorAlert from "@/components/shared/ErrorAlert";
import { GenderBadge } from "@/components/shared/Badges";
import { TrophyIcon } from "@heroicons/react/24/solid";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import { FinalPair } from "@/types/finalPair";
import ParticipantPhoto from "@/components/participants/ParticipantPhoto";
import FinalPairModal from "@/components/finalPairs/FinalPairModal";

export default function FinalPairsPage() {
    const { data, isLoading, error } = useFinalPairs();
    const { mutate: deleteFinalPair } = useDeleteFinalPair();
    const { mutate: setWinner } = useSetFinalPairWinner();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentFinalPair, setCurrentFinalPair] = useState<FinalPair | null>(null);

    const handleEdit = (finalPair: FinalPair) => {
        setCurrentFinalPair(finalPair);
        setIsModalOpen(true);
    };

    const handleSetWinner = (pairId: number, winnerId: number) => {
        if (confirm("Set this participant as the winner?")) {
            setWinner({ pairId, winnerId });
        }
    };

    const getStageIcon = (stage: string) => {
        switch (stage) {
            case 'final': return <TrophyIcon className="h-5 w-5 text-yellow-500" />;
            case 'half-final': return <TrophyIcon className="h-5 w-5 text-gray-400" />;
            case 'quarter-final': return <TrophyIcon className="h-5 w-5 text-amber-700" />;
            default: return <TrophyIcon className="h-5 w-5" />;
        }
    };

    const getStageName = (stage: string) => {
        switch (stage) {
            case 'final': return 'Final';
            case 'half-final': return 'Semi-Final';
            case 'quarter-final': return 'Quarter-Final';
            default: return stage;
        }
    };

    return (
        <MainContent>
            <div className="p-6">
                <PageHeader
                    title="Final Pairs"
                    onAdd={() => {
                        setCurrentFinalPair(null);
                        setIsModalOpen(true);
                    }}
                />

                {isLoading && <LoadingSpinner />}
                {error && <ErrorAlert message={error.message} />}

                {data?.length === 0 && (
                    <div className="mt-6 text-center py-12 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <TrophyIcon className="mx-auto h-12 w-12 text-gray-400" />
                        <h3 className="mt-2 text-lg font-medium text-gray-900 dark:text-white">No Final Pairs</h3>
                        <p className="mt-1 text-gray-500 dark:text-gray-400">
                            Get started by creating a new final pair.
                        </p>
                        <div className="mt-6">
                            <button
                                onClick={() => setIsModalOpen(true)}
                                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                            >
                                + Create Final Pair
                            </button>
                        </div>
                    </div>
                )}

                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {data?.filter(Boolean).map((pair) => (
                        <div
                            key={pair.id}
                            className={`bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border ${pair.winner ? 'border-green-500' : 'border-gray-200 dark:border-gray-700'
                                } transition-all duration-200 hover:shadow-xl`}
                        >
                            <div className="p-5">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="flex items-center">
                                        {getStageIcon(pair.stage)}
                                        <h3 className="ml-2 font-semibold text-lg text-gray-800 dark:text-white">
                                            {getStageName(pair.stage)}
                                        </h3>
                                    </div>
                                    <div className="flex space-x-1">
                                        <button
                                            onClick={() => handleEdit(pair)}
                                            className="p-1.5 text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                                        >
                                            <PencilIcon className="h-5 w-5" />
                                        </button>
                                        <button
                                            onClick={() => deleteFinalPair(pair.id)}
                                            className="p-1.5 text-gray-500 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                                        >
                                            <TrashIcon className="h-5 w-5" />
                                        </button>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    {/* Participant 1 */}
                                    <div
                                        onClick={() => handleSetWinner(pair.id, pair.participant1.id)}
                                        className={`p-4 rounded-lg cursor-pointer transition-all ${pair.winner === pair.participant1.id
                                                ? 'bg-green-50 border border-green-200 dark:bg-green-900/20 dark:border-green-700'
                                                : 'bg-gray-50 hover:bg-gray-100 dark:bg-gray-700/50 dark:hover:bg-gray-700 border border-gray-100 dark:border-gray-700'
                                            }`}
                                    >
                                        <div className="flex items-center space-x-3">
                                            <ParticipantPhoto
                                                image={pair.participant1.participant.image}
                                                name={pair.participant1.participant.name}
                                                className="h-12 w-12"
                                            />
                                            <div className="flex-1 min-w-0">
                                                <p className="font-medium text-gray-900 dark:text-white truncate">
                                                    {pair.participant1.participant.name}
                                                </p>
                                                <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300 mt-1">
                                                    <GenderBadge gender={pair.participant1.participant.gender} />
                                                    <span>{pair.participant1.participant.age}y • {pair.participant1.participant.weight}kg</span>
                                                </div>
                                                {pair.winner === pair.participant1.id && (
                                                    <div className="mt-2 inline-flex items-center px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200">
                                                        <TrophyIcon className="h-3 w-3 mr-1" />
                                                        Winner
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    {/* VS Separator and Participant 2 */}
                                    {pair.participant2 && (
                                        <>
                                            <div className="flex items-center justify-center">
                                                <div className="h-px w-8 bg-gray-300 dark:bg-gray-600"></div>
                                                <span className="px-2 text-sm font-medium text-gray-500 dark:text-gray-400">VS</span>
                                                <div className="h-px w-8 bg-gray-300 dark:bg-gray-600"></div>
                                            </div>

                                            <div
                                                onClick={() => handleSetWinner(pair.id, pair.participant2!.id)}
                                                className={`p-4 rounded-lg cursor-pointer transition-all ${pair.winner === pair.participant2!.id
                                                        ? 'bg-green-50 border border-green-200 dark:bg-green-900/20 dark:border-green-700'
                                                        : 'bg-gray-50 hover:bg-gray-100 dark:bg-gray-700/50 dark:hover:bg-gray-700 border border-gray-100 dark:border-gray-700'
                                                    }`}
                                            >
                                                <div className="flex items-center space-x-3">
                                                    <ParticipantPhoto
                                                        image={pair.participant2.participant.image}
                                                        name={pair.participant2.participant.name}
                                                        className="h-12 w-12"
                                                    />
                                                    <div className="flex-1 min-w-0">
                                                        <p className="font-medium text-gray-900 dark:text-white truncate">
                                                            {pair.participant2.participant.name}
                                                        </p>
                                                        <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300 mt-1">
                                                            <GenderBadge gender={pair.participant2.participant.gender} />
                                                            <span>{pair.participant2.participant.age}y • {pair.participant2.participant.weight}kg</span>
                                                        </div>
                                                        {pair.winner === pair.participant2!.id && (
                                                            <div className="mt-2 inline-flex items-center px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200">
                                                                <TrophyIcon className="h-3 w-3 mr-1" />
                                                                Winner
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </>
                                    )}
                                </div>

                                <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                                    <div className="text-sm text-gray-600 dark:text-gray-300">
                                        <div className="flex justify-between">
                                            <span>Competition:</span>
                                            <span className="font-medium text-gray-900 dark:text-white">
                                                {pair.competition.name}
                                            </span>
                                        </div>
                                        <div className="flex justify-between mt-1">
                                            <span>Tournament:</span>
                                            <span className="font-medium text-gray-900 dark:text-white">
                                                {pair.tournament.gender === 1 ? 'Male' : 'Female'} • {pair.tournament.min_weight}-{pair.tournament.max_weight}kg
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <FinalPairModal
                    isOpen={isModalOpen}
                    onClose={() => {
                        setIsModalOpen(false);
                        setCurrentFinalPair(null);
                    }}
                    finalPair={currentFinalPair}
                />
            </div>
        </MainContent>
    );
}