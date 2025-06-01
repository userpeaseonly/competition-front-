// components/tournaments/DisplayComponents.tsx
import { CalendarIcon, ScaleIcon } from "@heroicons/react/24/outline";
import { Tournament } from "@/types/tournament";

interface BadgeProps {
    gender: 0 | 1;
}

export const GenderBadge = ({ gender }: BadgeProps) => (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${gender === 1
            ? "bg-blue-100 text-blue-800"
            : "bg-pink-100 text-pink-800"
        }`}>
        {gender === 1 ? "Male" : "Female"}
    </span>
);

export const AgeWeightDisplay = ({
    min_age,
    max_age,
    min_weight,
    max_weight,
}: Pick<Tournament, "min_age" | "max_age" | "min_weight" | "max_weight">) => (
    <div className="mt-2 space-y-1 text-sm text-gray-600 dark:text-gray-300">
        <div className="flex items-center">
            <CalendarIcon className="h-4 w-4 mr-1" />
            Ages: {min_age}-{max_age} years
        </div>
        <div className="flex items-center">
            <ScaleIcon className="h-4 w-4 mr-1" />
            Weight: {min_weight}-{max_weight} kg
        </div>
    </div>
);