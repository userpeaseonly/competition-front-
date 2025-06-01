// app/pairs/page.tsx
"use client";

import { useState } from "react";
import { usePairParticipants, usePairs, useUpdateWinner } from "@/hooks/api/pairs";
import { useCompetitions } from "@/hooks/api/competitions";
import { useTournaments } from "@/hooks/api/tournaments";
import MainContent from "@/components/MainContent";
import PageHeader from "@/components/shared/PageHeader";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
import ErrorAlert from "@/components/shared/ErrorAlert";
import { GenderBadge } from "@/components/shared/Badges";
import ParticipantPhoto from "@/components/participants/ParticipantPhoto";
import WinnerSelection from "@/components/pairs/WinnerSelection";
import { CheckIcon } from "@heroicons/react/24/outline";

export default function PairsPage() {
    const [filters, setFilters] = useState({
        level: "",
        competitionId: "",
        tournamentId: "",
    });

    const { data: competitions } = useCompetitions();
    const { data: tournaments } = useTournaments();
    const { data, isLoading, error } = usePairs(
        filters.level ? Number(filters.level) : undefined,
        filters.competitionId ? Number(filters.competitionId) : undefined,
        filters.tournamentId ? Number(filters.tournamentId) : undefined
    );
    const { mutate: updateWinner, isPending: isUpdatingWinner } = useUpdateWinner();
    const { mutate: pairParticipants } = usePairParticipants();



    const handleSelectWinner = (pairId: number, winnerId: number) => {
        // if (confirm("Are you sure you want to set this participant as the winner?")) {
        //     updateWinner({ pair_id: pairId, winner_id: winnerId });
        // }
        updateWinner({ pair_id: pairId, winner_id: winnerId });
    };


    const handlePairParticipants = () => {
        if (!filters.competitionId || !filters.tournamentId) {
            alert("Please select both competition and tournament first");
            return;
        }

        pairParticipants(
            {
                competition_id: Number(filters.competitionId),
                tournament_id: Number(filters.tournamentId)
            },
            {
                onSuccess: (response) => {
                    if (response.status === 201) {
                        alert("Participants paired successfully!");
                    }
                    // For status 200, no message will be shown
                }
            }
        );
    };

    const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFilters(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmitFilters = (e: React.FormEvent) => {
        e.preventDefault();
        // The query will automatically run when all filters are set due to the enabled condition
    };


    return (
        <MainContent>
            <div className="p-6">
                <PageHeader title="Pairs" />

                {/* Filter Section */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden mb-4">
                    <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                        <h2 className="text-lg font-medium text-gray-900 dark:text-white">Filter Pairs</h2>
                    </div>

                    <div className="p-4">
                        <form onSubmit={handleSubmitFilters} className="space-y-4">
                            {/* Filter Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {/* Level Input */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                        Level
                                    </label>
                                    <input
                                        type="number"
                                        name="level"
                                        value={filters.level}
                                        onChange={handleFilterChange}
                                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                                        min="1"
                                        required
                                    />
                                </div>

                                {/* Competition Select */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                        Competition
                                    </label>
                                    <select
                                        name="competitionId"
                                        value={filters.competitionId}
                                        onChange={handleFilterChange}
                                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                                        required
                                    >
                                        <option value="">Select Competition</option>
                                        {competitions?.map((comp) => (
                                            <option key={comp.id} value={comp.id}>
                                                {comp.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                {/* Tournament Select */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                        Tournament
                                    </label>
                                    <select
                                        name="tournamentId"
                                        value={filters.tournamentId}
                                        onChange={handleFilterChange}
                                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                                        required
                                    >
                                        <option value="">Select Tournament</option>
                                        {tournaments?.map((tournament) => (
                                            <option key={tournament.id} value={tournament.id}>
                                                {tournament.gender === 1 ? 'Male' : 'Female'} {tournament.min_weight}-{tournament.max_weight}kg
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex flex-col sm:flex-row gap-3 pt-2">
                                <button
                                    type="submit"
                                    disabled={!filters.level || !filters.competitionId || !filters.tournamentId}
                                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex-1"
                                >
                                    Get Pairs
                                </button>

                                <button
                                    type="button"
                                    onClick={handlePairParticipants}
                                    disabled={!filters.competitionId || !filters.tournamentId}
                                    className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex-1"
                                >
                                    Pair Participants
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

                {isLoading && <LoadingSpinner />}
                {error && <ErrorAlert message={error.message} />}

                {/* Pairs List */}
                <div className="space-y-4">
                    {data?.map((pair) => (
                        <div
                            key={pair.id}
                            className={`bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden border-l-4 pb-5 ${pair.winner === pair.participant1.id ? 'border-green-500' :
                                pair.winner === pair.participant2.id ? 'border-green-500' :
                                    'border-gray-200 dark:border-gray-700'
                                }`}
                        >
                            <div className="p-4">
                                <div className="flex justify-between items-center mb-2">
                                    <h3 className="font-medium">Level {pair.level}</h3>
                                    <span className="text-sm text-gray-500 dark:text-gray-400">
                                        {pair.competition.name} - {pair.tournament.gender === 1 ? 'Male' : 'Female'}
                                    </span>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {/* Participant 1 */}
                                    <div className={`p-3 rounded-lg ${pair.winner === pair.participant1.id ? 'bg-green-50 dark:bg-green-900/30' : 'bg-gray-50 dark:bg-gray-700'
                                        }`}>
                                        <div className="flex items-center space-x-3">
                                            <ParticipantPhoto image={pair.participant1.image} name={pair.participant1.name} />
                                            <div>
                                                <p className="font-medium">{pair.participant1.name}</p>
                                                <div className="flex items-center space-x-2 text-sm">
                                                    <GenderBadge gender={pair.participant1.gender} />
                                                    <span>{pair.participant1.age}y • {pair.participant1.weight}kg</span>
                                                </div>
                                                {pair.winner === pair.participant1.id && (
                                                    <div className="mt-2 text-xs font-medium text-green-600 dark:text-green-300 flex items-center">
                                                        <CheckIcon className="h-3 w-3 mr-1" />
                                                        Winner
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Participant 2 */}
                                    <div className={`p-3 rounded-lg ${pair.winner === pair.participant2.id ? 'bg-green-50 dark:bg-green-900/30' : 'bg-gray-50 dark:bg-gray-700'
                                        }`}>
                                        <div className="flex items-center space-x-3">
                                            <ParticipantPhoto image={pair.participant2.image} name={pair.participant2.name} />
                                            <div>
                                                <p className="font-medium">{pair.participant2.name}</p>
                                                <div className="flex items-center space-x-2 text-sm">
                                                    <GenderBadge gender={pair.participant2.gender} />
                                                    <span>{pair.participant2.age}y • {pair.participant2.weight}kg</span>
                                                </div>
                                                {pair.winner === pair.participant2.id && (
                                                    <span className="inline-block mt-1 px-2 py-0.5 text-xs font-medium rounded bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                                                        Winner
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <WinnerSelection
                                pair={pair}
                                onSelectWinner={(winnerId) => handleSelectWinner(pair.id, winnerId)}
                                isUpdating={isUpdatingWinner}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </MainContent>
    );
}