"use client";
import { subjectsWithChapters, Subject } from "@/data/Subjects";
import Link from "next/link";
import React, { useState } from "react";

interface ChaptersOfSubProps {
  subject: Subject; // Use the Subject type here
}

const ChaptersOfSub: React.FC<ChaptersOfSubProps> = ({ subject }) => {
  const [activeLink, setActiveLink] = useState<number | null>(null);
  const chapters = subjectsWithChapters[subject] || [];

  const getClass = (index: number) => {
    const isActive = activeLink === index;
    return isActive
      ? "bg-[var(--second)] text-[var(--bg)] text-xl font-bold rounded-full w-10 h-10 flex items-center justify-center" // Active state
      : "bg-[var(--first)] text-[var(--bg)] text-xl font-bold rounded-full w-10 h-10 flex items-center justify-center group-hover:bg-[var(--second)]"; // Default and hover state
  };

  return (
    <div className="bg-[var(--bg)] relative flex flex-col items-center justify-center min-h-screen p-2">
      <div className="text-center">
        <h1 className="text-[var(--first)] text-3xl font-bold mb-1">
          {subject}
        </h1>
        <hr className="border-t-2 border-[var(--first)] w-1/2 mx-auto mb-4" />
      </div>
      <div className="w-full max-w-md">
        {chapters.map((chapter, index) => (
          <div className={`flex items-center mb-2 group`} key={index}>
            <div className={`flex items-center w-full`}>
              <div className={getClass(index)}>{index + 1}.</div>
              <Link
                href={`/dashboard/students/${subject}/${chapter.replace(
                  / /g,
                  "-"
                )}`}
                className={`text-[var(--bg)] ${
                  activeLink === index
                    ? "bg-[var(--second)]"
                    : "bg-[var(--first)]"
                } text-sm font-semibold ml-2 p-2 rounded-r-full group-hover:bg-[var(--second)] flex-1 h-12 flex items-center`}
                onClick={() => setActiveLink(index)} // Set active link on click
              >
                {chapter}
              </Link>
            </div>
          </div>
        ))}
      </div>
      <h2 className="text-[var(--first)] absolute bottom-0 text-end right-0 text-xl font-bold">
        Your <br /> Chapters
      </h2>
    </div>
  );
};

export default ChaptersOfSub;
