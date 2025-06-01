import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/lib/axios";
import { Tournament } from "@/types/tournament";

export function useTournaments() {
    return useQuery<Tournament[]>({
        queryKey: ["tournaments"],
        queryFn: async () => {
            const response = await apiClient.get("/tournaments/");
            return response.data;
        },
    });
}

export function useCreateTournament() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newTournament: Omit<Tournament, "id">) =>
            apiClient.post("/tournaments/", newTournament),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["tournaments"] });
        },
    });
}

export function useDeleteTournament() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id: number) => apiClient.delete(`/tournaments/${id}/`),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["tournaments"] });
        },
    });
}