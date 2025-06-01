// components/finalPairs/FinalPairModal.tsx
"use client";

import { useCreateFinalPair, useUpdateFinalPair } from "@/hooks/api/finalPairs";
import { useCompetitions } from "@/hooks/api/competitions";
import { useTournaments } from "@/hooks/api/tournaments";
import { useFinalParticipants } from "@/hooks/api/finalParticipants";
import { TrophyIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import { FinalPair } from "@/types/finalPair";
import ModalFooter from "../shared/ModalFooter";

interface FinalPairModalProps {
    isOpen: boolean;
    onClose: () => void;
    finalPair?: FinalPair | null;
}

export default function FinalPairModal({
    isOpen,
    onClose,
    finalPair,
}: FinalPairModalProps) {
    const { mutate: createFinalPair, isPending: isCreating } = useCreateFinalPair();
    const { mutate: updateFinalPair, isPending: isUpdating } = useUpdateFinalPair();
    const { data: competitions } = useCompetitions();
    const { data: tournaments } = useTournaments();
    const { data: finalParticipants } = useFinalParticipants();

    const [formData, setFormData] = useState({
        stage: finalPair?.stage || 'quarter-final',
        participant1: finalPair?.participant1.id || "",
        participant2: finalPair?.participant2.id || "",
        competition: finalPair?.competition.id || "",
        tournament: finalPair?.tournament.id || "",
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const data = {
            stage: formData.stage as 'final' | 'half-final' | 'quarter-final',
            participant1: Number(formData.participant1),
            participant2: Number(formData.participant2),
            competition: Number(formData.competition),
            tournament: Number(formData.tournament),
        };

        if (finalPair) {
            updateFinalPair({ id: finalPair.id, data });
        } else {
            createFinalPair(data);
        }
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl w-full max-w-md overflow-hidden">
                <div className="p-5 border-b border-gray-200 dark:border-gray-700">
                    <div className="flex justify-between items-center">
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                            {finalPair ? "Edit Final Pair" : "Create Final Pair"}
                        </h2>
                        <button
                            onClick={onClose}
                            className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                        >
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="p-5 space-y-4">
                    {/* Stage Selection */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Stage
                        </label>
                        <div className="grid grid-cols-3 gap-2">
                            {(['quarter-final', 'half-final', 'final'] as const).map((stage) => (
                                <button
                                    key={stage}
                                    type="button"
                                    onClick={() => setFormData({ ...formData, stage })}
                                    className={`flex flex-col items-center justify-center p-3 rounded-lg border transition-colors ${formData.stage === stage
                                            ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                                            : 'border-gray-300 hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-700/50'
                                        }`}
                                >
                                    <TrophyIcon className={`h-5 w-5 mb-1 ${stage === 'final' ? 'text-yellow-500' :
                                            stage === 'half-final' ? 'text-gray-400' : 'text-amber-700'
                                        }`} />
                                    <span className="text-sm capitalize">
                                        {stage.replace('-', ' ')}
                                    </span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Participant Selection */}
                    <div className="space-y-3">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Participant 1
                            </label>
                            <select
                                value={formData.participant1}
                                onChange={(e) => setFormData({ ...formData, participant1: e.target.value })}
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                                required
                            >
                                <option value="">Select Participant</option>
                                {finalParticipants?.map((fp) => (
                                    <option key={fp.id} value={fp.id}>
                                        {fp.participant.name} ({fp.participant.age}y, {fp.participant.weight}kg)
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Participant 2
                            </label>
                            <select
                                value={formData.participant2}
                                onChange={(e) => setFormData({ ...formData, participant2: e.target.value })}
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                                required
                            >
                                <option value="">Select Participant</option>
                                {finalParticipants?.map((fp) => (
                                    <option key={fp.id} value={fp.id}>
                                        {fp.participant.name} ({fp.participant.age}y, {fp.participant.weight}kg)
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Competition & Tournament */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Competition
                            </label>
                            <select
                                value={formData.competition}
                                onChange={(e) => setFormData({ ...formData, competition: e.target.value })}
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                                required
                            >
                                <option value="">Select Competition</option>
                                {competitions?.map((c) => (
                                    <option key={c.id} value={c.id}>
                                        {c.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Tournament
                            </label>
                            <select
                                value={formData.tournament}
                                onChange={(e) => setFormData({ ...formData, tournament: e.target.value })}
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                                required
                            >
                                <option value="">Select Tournament</option>
                                {tournaments?.map((t) => (
                                    <option key={t.id} value={t.id}>
                                        {t.gender === 1 ? 'Male' : 'Female'} {t.min_weight}-{t.max_weight}kg
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <ModalFooter
                        onClose={onClose}
                        isPending={isCreating || isUpdating}
                        submitText={finalPair ? "Save Changes" : "Create Pair"}
                    />
                </form>
            </div>
        </div>
    );
}