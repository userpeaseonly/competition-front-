// app/tournaments/page.tsx
"use client";

import { useState } from "react";
import { useTournaments, useDeleteTournament } from "@/hooks/api/tournaments";
import MainContent from "@/components/MainContent";
import TournamentCard from "@/components/tournaments/TournamentCard";
import TournamentModal from "@/components/tournaments/TournamentModal";
import PageHeader from "@/components/shared/PageHeader";

export default function TournamentsPage() {
    const { data, isLoading, error } = useTournaments();
    const { mutate: deleteTournament } = useDeleteTournament();
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <MainContent>
            <div className="p-6">
                <PageHeader
                    title="Tournaments"
                    onAdd={() => setIsModalOpen(true)}
                />

                {isLoading && <LoadingSpinner />}
                {error && <ErrorAlert message={error.message} />}

                <div className="mt-6 flow-root">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {data?.map((tournament) => (
                            <TournamentCard
                                key={tournament.id}
                                tournament={tournament}
                                onEdit={() => setIsModalOpen(true)}
                                onDelete={() => deleteTournament(tournament.id)}
                            />
                        ))}
                    </div>
                </div>

                <TournamentModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                />
            </div>
        </MainContent>
    );
}


// Reusable components (put in separate files)
const LoadingSpinner = () => <div>Loading...</div>;
const ErrorAlert = ({ message }: { message: string }) => (
    <div className="text-red-500">{message}</div>
);
