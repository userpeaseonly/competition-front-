// hooks/api/competitions.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/lib/axios";

// Types
export interface Competition {
    id: number;
    name: string;
    start_date: string; // ISO date format
    location: string;
    gender: 0 | 1; // 0 for male, 1 for female
}

// GET all competitions
export function useCompetitions() {
    return useQuery<Competition[]>({
        queryKey: ["competitions"],
        queryFn: async () => {
            const response = await apiClient.get("/competitions/");
            return response.data;
        },
    });
}

// POST new competition
export function useCreateCompetition() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newCompetition: Omit<Competition, "id">) =>
            apiClient.post("/competitions/", newCompetition),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["competitions"] });
        },
    });
}

// DELETE competition
export function useDeleteCompetition() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id: number) => apiClient.delete(`/competitions/${id}/`),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["competitions"] });
        },
    });
}