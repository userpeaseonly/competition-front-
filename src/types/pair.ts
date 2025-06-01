// types/pair.ts
export interface Participant {
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
}

export interface Tournament {
    id: number;
    gender: 0 | 1;
    min_age: number;
    max_age: number;
    min_weight: number;
    max_weight: number;
}

export interface Pair {
    id: number;
    participant1: Participant;
    participant2: Participant;
    competition: {
        id: number;
        name: string;
        start_date: string;
        location: string;
    };
    tournament: Tournament;
    level: number;
    winner: number | null; // ID of winning participant
}