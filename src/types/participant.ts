export interface Participant {
    id: number;
    name: string;
    gender: 0 | 1;
    age: number;
    weight: number;
    image: string | null;
    unique_id: string;
    competition: number; // Competition ID
    competition_details?: {
        name: string;
        // Add other competition fields if needed
    };
    miss: boolean;
}
