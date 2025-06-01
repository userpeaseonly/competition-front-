// hooks/api/pairs.ts
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/lib/axios";
import { Pair } from "@/types/pair";

export function usePairs(level?: number, competitionId?: number, tournamentId?: number) {
    return useQuery<Pair[]>({
        queryKey: ["pairs", { level, competitionId, tournamentId }],
        queryFn: async () => {
            const params = new URLSearchParams();
            if (level) params.append("level", level.toString());
            if (competitionId) params.append("competition", competitionId.toString());
            if (tournamentId) params.append("tournament", tournamentId.toString());

            const response = await apiClient.get(`/pairs/?${params.toString()}`);
            return response.data;
        },
        enabled: !!level && !!competitionId && !!tournamentId, // Only fetch when all filters are set
    });
}

// Add this to your existing pairs.ts file
export function useUpdateWinner() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ pair_id, winner_id }: { pair_id: number; winner_id: number }) =>
            apiClient.post("/update-winner/", { pair_id, winner_id }),
        onSuccess: () => {
            // Invalidate the pairs query to refetch data
            queryClient.invalidateQueries({ queryKey: ["pairs"] });
        },
    });
}

export function usePairParticipants() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ competition_id, tournament_id }: { competition_id: number; tournament_id: number }) =>
            apiClient.post("/pair-participants/", { competition_id, tournament_id }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["pairs"] });
        },
    });
}