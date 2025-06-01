"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSidebar } from "./SidebarProvider";

const NAV_ITEMS = [
    { name: "Tournaments", path: "/tournaments" },
    { name: "Competitions", path: "/competitions" },
    { name: "Participants", path: "/participants" },
    { name: "Pairs", path: "/pairs" },
    { name: "Final Participants", path: "/final-participants" },
    { name: "Final Pairs", path: "/final-pairs" },
];

export default function Sidebar() {
    const { isSidebarOpen } = useSidebar();
    const pathname = usePathname();

    return (
        <aside
            className={`fixed top-0 left-0 h-full bg-white dark:bg-gray-800 shadow-lg transition-all duration-300 ease-in-out z-50 ${isSidebarOpen ? "w-64" : "w-20"
                }`}
        >
            <div className="flex flex-col h-full p-4 border-r border-gray-200 dark:border-gray-700">
                <div className="mb-8 p-2 flex items-center justify-center">
                    {isSidebarOpen ? (
                        <h1 className="text-xl font-bold text-gray-800 dark:text-white">
                            Tournament App
                        </h1>
                    ) : (
                        <div className="w-8 h-8 bg-blue-500 rounded-full" />
                    )}
                </div>

                <nav className="flex-1">
                    <ul className="space-y-2">
                        {NAV_ITEMS.map((item) => (
                            <li key={item.path}>
                                <Link
                                    href={item.path}
                                    className={`flex items-center p-3 rounded-lg transition-colors ${pathname === item.path
                                        ? "bg-blue-100 text-blue-600 dark:bg-blue-900/50 dark:text-blue-300"
                                        : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                                        } ${isSidebarOpen ? "justify-start" : "justify-center"}`}
                                >
                                    <span className={`${isSidebarOpen ? "ml-2" : ""}`}>
                                        {item.name}
                                    </span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>

                <div className="p-2">
                    <button className="w-full p-3 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                        {isSidebarOpen ? "Collapse" : "Expand"}
                    </button>
                </div>
            </div>
        </aside>
    );
}