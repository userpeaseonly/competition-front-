// components/competitions/CompetitionModal.tsx
"use client";

import { useCreateCompetition, useUpdateCompetition } from "@/hooks/api/competitions";
import { useEffect, useState } from "react";
import type { Competition } from "@/hooks/api/competitions";

export default function CompetitionModal({
    isOpen,
    onClose,
    initialData,
}: {
    isOpen: boolean;
    onClose: () => void;
    initialData?: Competition;
}) {
    const isEditMode = Boolean(initialData?.id);

    const { mutate: createComp, isPending: isCreating } = useCreateCompetition();
    const { mutate: updateComp, isPending: isUpdating } = useUpdateCompetition();

    const [formData, setFormData] = useState<Omit<Competition, "id">>({
        name: "",
        start_date: "",
        location: "",
        gender: 0,
    });

    useEffect(() => {
        if (initialData) {
            setFormData(initialData);
        } else {
            setFormData({ name: "", start_date: "", location: "", gender: 0 });
        }
    }, [initialData, isOpen]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (isEditMode && initialData?.id) {
            updateComp({ id: initialData.id, ...formData });
        } else {
            createComp(formData);
        }
        onClose();
    };

    if (!isOpen) {
        return null;
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 w-full max-w-md">
                <h2 className="text-xl font-bold mb-4">
                    {isEditMode ? "Edit Competition" : "New Competition"}
                </h2>
                <form onSubmit={handleSubmit}>
                    <div className="space-y-4">
                        <FormInput
                            label="Name"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            required
                        />
                        <FormInput
                            label="Start Date"
                            type="date"
                            value={formData.start_date}
                            onChange={(e) => setFormData({ ...formData, start_date: e.target.value })}
                            required
                        />
                        <FormInput
                            label="Location"
                            value={formData.location}
                            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                            required
                        />
                    </div>
                    <div className="mt-6 flex justify-end space-x-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isCreating || isUpdating}
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
                        >
                            {isCreating || isUpdating ? "Saving..." : "Save"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

const FormInput = ({ label, ...props }: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) => (
    <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            {label}
        </label>
        <input
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
            {...props}
        />
    </div>
);
