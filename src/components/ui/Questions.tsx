"use client"; // This is necessary if you're using hooks or client-side features

import Link from "next/link";
import React from "react";

interface QuestionsProps {
  roll: string;
  chapter: string;
  subject: string;
  chapterNumber: string;
}

const Questions: React.FC<QuestionsProps> = ({roll, chapter, subject, chapterNumber }) => {
  const decodedSubject = decodeURIComponent(subject);

  return (
    <div className="bg-[var(--bg)] flex flex-col items-center justify-center min-h-screen">
      <div className="text-center">
        <h1 className="text-[var(--second)] text-4xl font-bold mb-8">
          {decodedSubject}
        </h1>
        <div className="grid grid-cols-5 gap-3 mb-8">
          {Array.from({ length: 20 }, (_, index) => (
            <Link
              key={index}
              href={`/dashboard/${roll}/${subject}/${chapter.replace(
                / /g,
                "-"
              )}/${index + 1}`}
              className="bg-[var(--first)]  text-[var(--bg)] py-2 px-1 rounded"
            >
              Q.{index + 1}
            </Link>
          ))}
        </div>
        <div className="text-[var(--second)] text-xl mb-2">Chapter {chapterNumber}</div>
        <div className="text-[var(--second)] text-2xl font-bold">{chapter}</div>
      </div>
    </div>
  );
};

export default Questions;
