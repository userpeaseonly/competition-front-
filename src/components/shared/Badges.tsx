export const GenderBadge = ({ gender }: { gender: 0 | 1 }) => (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${gender === 1
            ? "bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-200"
            : "bg-pink-100 text-pink-800 dark:bg-pink-900/50 dark:text-pink-200"
        }`}>
        {gender === 1 ? "Male" : "Female"}
    </span>
);
