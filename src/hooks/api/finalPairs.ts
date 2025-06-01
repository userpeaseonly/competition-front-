// hooks/api/finalPairs.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/lib/axios";
import { CreateFinalPairDto, FinalPair } from "@/types/finalPair";

export function useFinalPairs() {
    return useQuery<FinalPair[]>({
        queryKey: ["finalPairs"],
        queryFn: async () => {
            const response = await apiClient.get("/finals-pairs/");
            return response.data;
        },
    });
}

export function useCreateFinalPair() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: CreateFinalPairDto) =>
            apiClient.post("/finals-pairs/", data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["finalPairs"] });
        },
    });
}

export function useUpdateFinalPair() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, data }: { id: number; data: Partial<CreateFinalPairDto> }) =>
            apiClient.patch(`/finals-pairs/${id}/`, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["finalPairs"] });
        },
    });
}

export function useDeleteFinalPair() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id: number) => apiClient.delete(`/finals-pairs/${id}/`),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["finalPairs"] });
        },
    });
}

export function useSetFinalPairWinner() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ pairId, winnerId }: { pairId: number; winnerId: number }) =>
            apiClient.patch(`/finals-pairs/${pairId}/`, { winner: winnerId }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["finalPairs"] });
        },
    });
}