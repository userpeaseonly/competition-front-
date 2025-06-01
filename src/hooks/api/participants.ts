import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/lib/axios";
import { Participant } from "@/types/participant";

export function useParticipants() {
    return useQuery<Participant[]>({
        queryKey: ["participants"],
        queryFn: async () => {
            const response = await apiClient.get("/participants/");
            return response.data;
        },
    });
}

export function useCreateParticipant() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newParticipant: FormData) =>
            apiClient.post("/participants/", newParticipant, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["participants"] });
        },
    });
}

export function useUpdateParticipant() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, data }: { id: number; data: FormData | Partial<Participant> }) =>
            apiClient.patch(`/participants/${id}/`, data, {
                headers: data instanceof FormData ? {
                    "Content-Type": "multipart/form-data",
                } : {},
            }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["participants"] });
        },
    });
}

export function useDeleteParticipant() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id: number) => apiClient.delete(`/participants/${id}/`),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["participants"] });
        },
    });
}