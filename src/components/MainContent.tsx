// components/MainContent.tsx
"use client";

import { useSidebar } from "./sidebar/SidebarProvider";


export default function MainContent({
    children,
}: {
    children: React.ReactNode;
}) {
    const { isSidebarOpen } = useSidebar();

    return (
        <div
            className={`min-h-screen transition-all duration-300 ${isSidebarOpen ? "ml-64" : "ml-20"
                }`}
        >
            {children}
        </div>
    );
}