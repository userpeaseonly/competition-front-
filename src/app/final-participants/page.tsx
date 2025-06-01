// app/final-participants/page.tsx
"use client";

import { useState } from "react";
import { useFinalParticipants, useDeleteFinalParticipant } from "@/hooks/api/finalParticipants";
import MainContent from "@/components/MainContent";
import PageHeader from "@/components/shared/PageHeader";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
import ErrorAlert from "@/components/shared/ErrorAlert";
import FinalParticipantModal from "@/components/finalParticipants/FinalParticipantModal";
import { GenderBadge } from "@/components/shared/Badges";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import { FinalParticipant } from "@/types/finalParticipant";
import ParticipantPhoto from "@/components/participants/ParticipantPhoto";

export default function FinalParticipantsPage() {
    const { data, isLoading, error } = useFinalParticipants();
    const { mutate: deleteFinalParticipant } = useDeleteFinalParticipant();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentFinalParticipant, setCurrentFinalParticipant] = useState<FinalParticipant | null>(null);

    const handleEdit = (finalParticipant: FinalParticipant) => {
        setCurrentFinalParticipant(finalParticipant);
        setIsModalOpen(true);
    };

    return (
        <MainContent>
            <div className="p-6">
                <PageHeader
                    title="Final Participants"
                    onAdd={() => {
                        setCurrentFinalParticipant(null);
                        setIsModalOpen(true);
                    }}
                />

                {isLoading && <LoadingSpinner />}
                {error && <ErrorAlert message={error.message} />}

                <div className="mt-6 overflow-hidden shadow ring-1 ring-black ring-opacity-5 rounded-lg">
                    <table className="min-w-full divide-y divide-gray-300 dark:divide-gray-600">
                        <thead className="bg-gray-50 dark:bg-gray-700">
                            <tr>
                                <TableHeader>Photo</TableHeader>
                                <TableHeader>Name</TableHeader>
                                <TableHeader>Gender</TableHeader>
                                <TableHeader>Age/Weight</TableHeader>
                                <TableHeader>Competition</TableHeader>
                                <TableHeader>Place</TableHeader>
                                <TableHeader align="right">Actions</TableHeader>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 dark:divide-gray-700 bg-white dark:bg-gray-800">
                            {data?.map((fp) => (
                                <tr key={fp.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                                    <TableCell>
                                        <ParticipantPhoto image={fp.participant.image} name={fp.participant.name} />
                                    </TableCell>
                                    <TableCell>{fp.participant.name}</TableCell>
                                    <TableCell>
                                        <GenderBadge gender={fp.participant.gender} />
                                    </TableCell>
                                    <TableCell>
                                        {fp.participant.age}y • {fp.participant.weight}kg
                                    </TableCell>
                                    <TableCell>{fp.competition.name}</TableCell>
                                    <TableCell>
                                        {fp.place ? (
                                            <span className="px-2 py-1 rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-200 text-xs font-medium">
                                                {fp.place}
                                            </span>
                                        ) : (
                                            <span className="text-gray-400">Not set</span>
                                        )}
                                    </TableCell>
                                    <TableCell align="right">
                                        <button
                                            onClick={() => handleEdit(fp)}
                                            className="p-2 text-blue-600 hover:text-blue-800 dark:hover:text-blue-400 transition-colors"
                                        >
                                            <PencilIcon className="h-5 w-5" />
                                        </button>
                                        <button
                                            onClick={() => deleteFinalParticipant(fp.id)}
                                            className="p-2 text-red-600 hover:text-red-800 dark:hover:text-red-400 transition-colors"
                                        >
                                            <TrashIcon className="h-5 w-5" />
                                        </button>
                                    </TableCell>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <FinalParticipantModal
                    isOpen={isModalOpen}
                    onClose={() => {
                        setIsModalOpen(false);
                        setCurrentFinalParticipant(null);
                    }}
                    finalParticipant={currentFinalParticipant}
                />
            </div>
        </MainContent>
    );
}

const TableHeader = ({ children, align = "left" }: { children: React.ReactNode; align?: "left" | "right" }) => (
    <th
        scope="col"
        className={`px-6 py-3 text-${align} text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider`}
    >
        {children}
    </th>
);

const TableCell = ({ children, align = "left" }: { children: React.ReactNode; align?: "left" | "right" }) => (
    <td className={`px-6 py-4 whitespace-nowrap text-${align} text-sm text-gray-900 dark:text-gray-200`}>
        {children}
    </td>
);