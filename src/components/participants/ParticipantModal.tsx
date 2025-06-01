// components/participants/ParticipantModal.tsx
"use client";

import ModalFooter from "@/components/shared/ModalFooter";
import ModalWrapper from "@/components/shared/ModalWrapper";
import NumberInput from "@/components/shared/NumberInput";
import { useCompetitions } from "@/hooks/api/competitions";
import { useCreateParticipant, useUpdateParticipant } from "@/hooks/api/participants";
import { Participant } from "@/types/participant";
import { useState } from "react";

interface ParticipantModalProps {
    isOpen: boolean;
    onClose: () => void;
    participant?: Participant | null;
}

export default function ParticipantModal({
    isOpen,
    onClose,
    participant,
}: ParticipantModalProps) {
    const { mutate: createParticipant, isPending: isCreating } = useCreateParticipant();
    const { mutate: updateParticipant, isPending: isUpdating } = useUpdateParticipant();
    const { data: competitions } = useCompetitions();
    const [formData, setFormData] = useState<Partial<Participant>>({
        name: participant?.name || "",
        gender: participant?.gender || 1,
        age: participant?.age || 18,
        weight: participant?.weight || 60,
        competition: participant?.competition || undefined,
        unique_id: participant?.unique_id || "",
        miss: participant?.miss || false,
    });
    const [imageFile, setImageFile] = useState<File | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const form = new FormData();

        // Append all fields
        Object.entries(formData).forEach(([key, value]) => {
            if (value !== undefined) {
                form.append(key, value !== null ? value.toString() : "");
            }
        });

        if (imageFile) {
            form.append("image", imageFile);
        }

        if (participant) {
            await updateParticipant({ id: participant.id, data: form });
        } else {
            await createParticipant(form);
        }
        onClose();
    };

    if (!isOpen) return null;

    return (
        <ModalWrapper onClose={onClose}>
            <h2 className="text-xl font-bold mb-4">
                {participant ? "Edit Participant" : "Add New Participant"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Name</label>
                        <input
                            type="text"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="w-full p-2 border rounded-md"
                            required
                        />
                    </div>

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

                    <NumberInput
                        label="Age"
                        value={formData.age || 0}
                        onChange={(v) => setFormData({ ...formData, age: v })}
                        min={1}
                    />

                    <NumberInput
                        label="Weight (kg)"
                        value={formData.weight || 0}
                        onChange={(v) => setFormData({ ...formData, weight: v })}
                        step="0.1"
                        min={0}
                    />

                    <div>
                        <label className="block text-sm font-medium mb-1">Unique ID</label>
                        <input
                            type="text"
                            value={formData.unique_id || ""}
                            onChange={(e) => setFormData({ ...formData, unique_id: e.target.value })}
                            className="w-full p-2 border rounded-md"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Photo</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                            className="w-full p-2 border rounded-md"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Competition</label>
                        <select
                            value={formData.competition || ""}
                            onChange={(e) => setFormData({ ...formData, competition: Number(e.target.value) })}
                            className="w-full p-2 border rounded-md"
                            required
                        >
                            <option value="">Select Competition</option>
                            {competitions?.map((comp) => (
                                <option key={comp.id} value={comp.id}>
                                    {comp.name} ({comp.gender === 1 ? 'Male' : 'Female'})
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