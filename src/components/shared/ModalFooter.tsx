// components/shared/ModalFooter.tsx
"use client";

interface ModalFooterProps {
    onClose: () => void;
    isPending: boolean;
    submitText?: string;
}

export default function ModalFooter({
    onClose,
    isPending,
    submitText = "Save"
}: ModalFooterProps) {
    return (
        <div className="mt-6 flex justify-end space-x-3">
            <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-700 transition-colors"
            >
                Cancel
            </button>
            <button
                type="submit"
                disabled={isPending}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
                {isPending ? (
                    <span className="flex items-center">
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Processing...
                    </span>
                ) : submitText}
            </button>
        </div>
    );
}
// // components/shared/ModalFooter.tsx
// "use client";

// interface ModalFooterProps {
//     onClose: () => void;
//     isPending: boolean;
// }

// export default function ModalFooter({ onClose, isPending }: ModalFooterProps) {
//     return (
//         <div className="mt-6 flex justify-end space-x-3">
//             <button
//                 type="button"
//                 onClick={onClose}
//                 className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
//             >
//                 Cancel
//             </button>
//             <button
//                 type="submit"
//                 disabled={isPending}
//                 className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
//             >
//                 {isPending ? "Saving..." : "Save"}
//             </button>
//         </div>
//     );
// }