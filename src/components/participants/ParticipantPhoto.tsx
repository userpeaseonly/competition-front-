// components/participants/ParticipantPhoto.tsx
"use client";

import Image from "next/image";

interface ParticipantPhotoProps {
    image: string | null;
    name: string;
    className?: string;
}

export default function ParticipantPhoto({
    image,
    name,
    className = "h-10 w-10"
}: ParticipantPhotoProps) {
    return (
        <div className={`flex-shrink-0 ${className}`}>
            {image ? (
                <Image
                    src={image}
                    alt={name}
                    width={200}
                    height={200}
                    className="rounded-lg"
                />
            ) : (
                <div className="rounded-full bg-gray-200 dark:bg-gray-600 flex items-center justify-center h-full w-full">
                    <svg className="h-6 w-6 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 12a5 5 0 110-10 5 5 0 010 10zm0-8a3 3 0 100 6 3 3 0 000-6zm8 14H4a2 2 0 00-2 2v2a2 2 0 002 2h16a2 2 0 002-2v-2a2 2 0 00-2-2zm-8 4H4v-2h8v2zm8-4H4v-2h16v2z" />
                    </svg>
                </div>
            )}
        </div>
    );
}
// // components/participants/ParticipantPhoto.tsx
// "use client";

// import { UserIcon } from "@heroicons/react/24/outline";

// interface ParticipantPhotoProps {
//     image: string | null;
//     name: string;
//     className?: string;
// }

// export default function ParticipantPhoto({
//     image,
//     name,
//     className = "h-10 w-10"
// }: ParticipantPhotoProps) {
//     return (
//         <div className={`flex-shrink-0 ${className}`}>
//             {image ? (
//                 <img
//                     className="rounded-full object-cover"
//                     src={image}
//                     alt={name}
//                 />
//             ) : (
//                 <div className="rounded-full bg-gray-200 dark:bg-gray-600 flex items-center justify-center h-full w-full">
//                     <UserIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
//                 </div>
//             )}
//         </div>
//     );
// }