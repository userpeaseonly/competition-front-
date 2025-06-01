// hooks/api/finalParticipants.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/lib/axios";
import { CreateFinalParticipantDto, FinalParticipant } from "@/types/finalParticipant";

export function useFinalParticipants() {
    return useQuery<FinalParticipant[]>({
        queryKey: ["finalParticipants"],
        queryFn: async () => {
            const response = await apiClient.get("/finals-participants/");
            return response.data;
        },
    });
}

export function useCreateFinalParticipant() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: CreateFinalParticipantDto) =>
            apiClient.post("/finals-participants/", data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["finalParticipants"] });
        },
    });
}

export function useUpdateFinalParticipant() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, data }: { id: number; data: Partial<CreateFinalParticipantDto> }) =>
            apiClient.patch(`/finals-participants/${id}/`, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["finalParticipants"] });
        },
    });
}

export function useDeleteFinalParticipant() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id: number) => apiClient.delete(`/finals-participants/${id}/`),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["finalParticipants"] });
        },
    });
}