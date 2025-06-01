// components/finalParticipants/FinalParticipantModal.tsx
"use client";

import { useCreateFinalParticipant, useUpdateFinalParticipant } from "@/hooks/api/finalParticipants";
import { useCompetitions } from "@/hooks/api/competitions";
import { useTournaments } from "@/hooks/api/tournaments";
import { useParticipants } from "@/hooks/api/participants";
import { useState } from "react";
import { FinalParticipant } from "@/types/finalParticipant";
import NumberInput from "../shared/NumberInput";
import ModalWrapper from "../shared/ModalWrapper";
import ModalFooter from "../shared/ModalFooter";

interface FinalParticipantModalProps {
    isOpen: boolean;
    onClose: () => void;
    finalParticipant?: FinalParticipant | null;
}

export default function FinalParticipantModal({
    isOpen,
    onClose,
    finalParticipant,
}: FinalParticipantModalProps) {
    const { mutate: createFinalParticipant, isPending: isCreating } = useCreateFinalParticipant();
    const { mutate: updateFinalParticipant, isPending: isUpdating } = useUpdateFinalParticipant();
    const { data: competitions } = useCompetitions();
    const { data: tournaments } = useTournaments();
    const { data: participants } = useParticipants();

    const [formData, setFormData] = useState({
        place: finalParticipant?.place || 1,
        participant: finalParticipant?.participant.id || "",
        tournament: finalParticipant?.tournament.id || "",
        competition: finalParticipant?.competition.id || "",
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const data = {
            place: Number(formData.place),
            participant: Number(formData.participant),
            tournament: Number(formData.tournament),
            competition: Number(formData.competition),
        };

        if (finalParticipant) {
            updateFinalParticipant({ id: finalParticipant.id, data });
        } else {
            createFinalParticipant(data);
        }
        onClose();
    };

    if (!isOpen) return null;

    return (
        <ModalWrapper onClose={onClose}>
            <h2 className="text-xl font-bold mb-4">
                {finalParticipant ? "Edit Final Participant" : "Add Final Participant"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <NumberInput
                        label="Place"
                        value={formData.place}
                        onChange={(v) => setFormData({ ...formData, place: v })}
                        min={1}
                    />

                    <div>
                        <label className="block text-sm font-medium mb-1">Participant</label>
                        <select
                            value={formData.participant}
                            onChange={(e) => setFormData({ ...formData, participant: e.target.value })}
                            className="w-full p-2 border rounded-md"
                            required
                        >
                            <option value="">Select Participant</option>
                            {participants?.map((p) => (
                                <option key={p.id} value={p.id}>
                                    {p.name} ({p.age}y, {p.weight}kg)
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Competition</label>
                        <select
                            value={formData.competition}
                            onChange={(e) => setFormData({ ...formData, competition: e.target.value })}
                            className="w-full p-2 border rounded-md"
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
                        <label className="block text-sm font-medium mb-1">Tournament</label>
                        <select
                            value={formData.tournament}
                            onChange={(e) => setFormData({ ...formData, tournament: e.target.value })}
                            className="w-full p-2 border rounded-md"
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
                />
            </form>
        </ModalWrapper>
    );
}