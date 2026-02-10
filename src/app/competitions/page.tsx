// src/app/competitions/page.tsx
"use client";

import { useState } from "react";
import { useCompetitions, useDeleteCompetition } from "@/hooks/api/competitions";
import { format } from "date-fns";
import CompetitionModal from "@/components/competitions/CompetitionModal";
import ActionButtons from "@/components/competitions/ActionButtons";
import MainContent from "@/components/MainContent";
import type { Competition } from "@/hooks/api/competitions";

export default function CompetitionsPage() {
    const { data, isLoading, error } = useCompetitions();
    const { mutate: deleteComp } = useDeleteCompetition();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingComp, setEditingComp] = useState<Competition | undefined>(undefined);

    const openNewModal = () => {
        setEditingComp(undefined);
        setIsModalOpen(true);
    };

    const openEditModal = (comp: Competition) => {
        setEditingComp(comp);
        setIsModalOpen(true);
    };

    if (isLoading) return <LoadingSpinner />;
    if (error) return <ErrorAlert message={error.message} />;

    return (
        <MainContent>
            <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Competitions</h1>
                    <button
                        onClick={openNewModal}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        + New Competition
                    </button>
                </div>

                <CompetitionModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    initialData={editingComp}
                />

                <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                        <thead className="bg-gray-50 dark:bg-gray-700">
                            <tr>
                                <TableHeader>Name</TableHeader>
                                <TableHeader>Start Date</TableHeader>
                                <TableHeader>Location</TableHeader>
                                <TableHeader align="right">Actions</TableHeader>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                            {data?.map((comp) => (
                                <tr key={comp.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                                    <TableCell>{comp.name}</TableCell>
                                    <TableCell>{format(new Date(comp.start_date), "MMM dd, yyyy")}</TableCell>
                                    <TableCell>{comp.location}</TableCell>
                                    <TableCell align="right">
                                        <ActionButtons
                                            onEdit={() => openEditModal(comp)}
                                            onDelete={() => deleteComp(comp.id)}
                                        />
                                    </TableCell>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </MainContent>
    );
}

const LoadingSpinner = () => <div>Loading...</div>;
const ErrorAlert = ({ message }: { message: string }) => (
    <div className="text-red-500">{message}</div>
);
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
