export interface Tournament {
    id: number;
    gender: 0 | 1; // 0: Female, 1: Male
    min_age: number;
    max_age: number;
    min_weight: number;
    max_weight: number;
}
