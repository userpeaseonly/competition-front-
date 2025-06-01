// types/finalParticipant.ts
export interface FinalParticipant {
    id: number;
    participant: {
        id: number;
        name: string;
        gender: 0 | 1;
        age: number;
        weight: number;
        image: string | null;
        unique_id: string;
        competition: number;
        competition_details: {
            id: number;
            name: string;
            start_date: string;
            location: string;
        };
        miss: boolean;
    };
    competition: {
        id: number;
        name: string;
        start_date: string;
        location: string;
    };
    tournament: {
        id: number;
        gender: 0 | 1;
        min_age: number;
        max_age: number;
        min_weight: number;
        max_weight: number;
    };
    place: number | null;
}

export interface CreateFinalParticipantDto {
    place: number;
    participant: number;
    tournament: number;
    competition: number;
}