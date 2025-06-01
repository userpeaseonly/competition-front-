// app/participants/page.tsx
"use client";

import { useState } from "react";
import { useParticipants, useDeleteParticipant } from "@/hooks/api/participants";
import MainContent from "@/components/MainContent";
import PageHeader from "@/components/shared/PageHeader";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
import ErrorAlert from "@/components/shared/ErrorAlert";
import { Participant } from "@/types/participant";
import ParticipantModal from "@/components/participants/ParticipantModal";
import { GenderBadge } from "@/components/tournaments/DisplayComponents";
import ParticipantPhoto from "@/components/participants/ParticipantPhoto";
import ActionButtons from "@/components/competitions/ActionButtons";

export default function ParticipantsPage() {
    const { data, isLoading, error } = useParticipants();
    const { mutate: deleteParticipant } = useDeleteParticipant();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentParticipant, setCurrentParticipant] = useState<Participant | null>(null);

    const handleEdit = (participant: Participant) => {
        setCurrentParticipant(participant);
        setIsModalOpen(true);
    };

    return (
        <MainContent>
            <div className="p-6">
                <PageHeader
                    title="Participants"
                    onAdd={() => {
                        setCurrentParticipant(null);
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
                                <TableHeader>Age</TableHeader>
                                <TableHeader>Weight</TableHeader>
                                <TableHeader>Competition</TableHeader>
                                <TableHeader align="right">Actions</TableHeader>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 dark:divide-gray-700 bg-white dark:bg-gray-800">
                            {data?.map((participant) => (
                                <tr key={participant.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                                    <TableCell>
                                        <ParticipantPhoto image={participant.image} name={participant.name} />
                                    </TableCell>
                                    <TableCell>{participant.name}</TableCell>
                                    <TableCell>
                                        <GenderBadge gender={participant.gender} />
                                    </TableCell>
                                    <TableCell>{participant.age}</TableCell>
                                    <TableCell>{participant.weight} kg</TableCell>
                                    <TableCell>
                                        {participant.competition_details?.name || "N/A"}
                                    </TableCell>
                                    <TableCell align="right">
                                        <ActionButtons
                                            onEdit={() => handleEdit(participant)}
                                            onDelete={() => deleteParticipant(participant.id)}
                                        />
                                    </TableCell>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <ParticipantModal
                    isOpen={isModalOpen}
                    onClose={() => {
                        setIsModalOpen(false);
                        setCurrentParticipant(null);
                    }}
                    participant={currentParticipant}
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