// components/tournaments/TournamentModal.tsx
"use client";

import { useCreateTournament } from "@/hooks/api/tournaments";
import { Tournament } from "@/types/tournament";
import { useState } from "react";
import ModalWrapper from "../shared/ModalWrapper";
import NumberInput from "../shared/NumberInput";
import ModalFooter from "../shared/ModalFooter";

export default function TournamentModal({
    isOpen,
    onClose,
}: {
    isOpen: boolean;
    onClose: () => void;
}) {
    const { mutate: createTournament, isPending } = useCreateTournament();
    const [formData, setFormData] = useState<Omit<Tournament, "id">>({
        gender: 1,
        min_age: 18,
        max_age: 30,
        min_weight: 50,
        max_weight: 70,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        createTournament(formData);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <ModalWrapper onClose={onClose}>
            <h2 className="text-xl font-bold mb-4">Create Tournament</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium mb-1">Gender</label>
                    <select
                        value={formData.gender}
                        onChange={(e) => setFormData({ ...formData, gender: Number(e.target.value) as 0 | 1 })}
                        className="w-full p-2 border rounded-md"
                    >
                        <option value={1}>Male</option>
                        <option value={0}>Female</option>
                    </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <NumberInput
                        label="Min Age"
                        value={formData.min_age}
                        onChange={(v) => setFormData({ ...formData, min_age: v })}
                    />
                    <NumberInput
                        label="Max Age"
                        value={formData.max_age}
                        onChange={(v) => setFormData({ ...formData, max_age: v })}
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <NumberInput
                        label="Min Weight (kg)"
                        value={formData.min_weight}
                        onChange={(v) => setFormData({ ...formData, min_weight: v })}
                        step="0.1"
                    />
                    <NumberInput
                        label="Max Weight (kg)"
                        value={formData.max_weight}
                        onChange={(v) => setFormData({ ...formData, max_weight: v })}
                        step="0.1"
                    />
                </div>

                <ModalFooter onClose={onClose} isPending={isPending} />
            </form>
        </ModalWrapper>
    );
}