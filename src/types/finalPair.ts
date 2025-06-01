// types/finalPair.ts
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

export interface FinalPair {
    id: number;
    participant1: FinalParticipant;
    participant2: FinalParticipant;
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
    stage: 'final' | 'half-final' | 'quarter-final';
    winner: number | null;
}

export interface CreateFinalPairDto {
    stage: 'final' | 'half-final' | 'quarter-final';
    participant1: number;
    participant2: number;
    competition: number;
    tournament: number;
    winner?: number | null;
}