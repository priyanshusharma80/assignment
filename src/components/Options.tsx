"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Tabs() {
  const pathname = usePathname();

  const tabs = [
    { name: "Summary", path: "" },
    { name: "Chart", path: "/" },
    { name: "Statistics", path: "" },
    { name: "Analysis", path: "" },
    { name: "Settings", path: "" },
  ];

  return (
    <nav className="flex justify-start overflow-x-auto border-b   bg-white">
      <hr />
      {tabs.map((tab) => (
        <Link
          key={tab.name}
          href={tab.path}
          className={`px-8 py-3 text-md text-center text-lg font-medium transition ${
            pathname === tab.path
              ? "text-[#1A243A] border-b-2 border-[#4B40EE]"
              : "text-gray-600 hover:text-primary hover:border-b-2 hover:border-primary"
          }`}
        >
          {tab.name}
        </Link>
      ))}
    </nav>
  );
}
