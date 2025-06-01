// types/competition.ts
export interface Competition {
    id: number;
    name: string;
    gender: 0 | 1;
    min_age: number;
    max_age: number;
    min_weight: number;
    max_weight: number;
}