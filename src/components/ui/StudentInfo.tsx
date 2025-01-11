// components/StudentInfo.tsx

import { Subject, subjectsWithChapters } from '@/data/Subjects';
import React from 'react';
import Link from 'next/link';

const subjects: Subject[] = Object.keys(subjectsWithChapters) as Subject[];

const StudentInfo: React.FC = () => {
    return (
        <div className="bg-[#f8f8f0] flex flex-col justify-between h-screen p-8" style={{ fontFamily: "'Roboto', sans-serif" }}>
            <div className="flex justify-between items-start">
                <div>
                    <h1 className="text-4xl font-bold text-green-700">Alisha</h1>
                    <p className="text-lg text-green-700">Commerce</p>
                    <p className="text-lg text-green-700">11<sup>th</sup> A</p>
                </div>
                <div>
                    <p className="text-lg text-green-700">001</p>
                </div>
            </div>
            <div className="flex-grow flex items-center">
            <div className="border-l-2 border-[#f8f8f0] pl-4">
    {subjects.map((subject) => {
        // Replace spaces with hyphens for the URL
        const formattedSubject = subject.replace(/\s+/g, '-');

        return (
            <Link key={subject} href={`/dashboard/students/${formattedSubject}`}>
                <p className="text-xl cursor-pointer text-green-700 hover:text-orange-500">
                    {subject}
                </p>
            </Link>
        );
    })}
</div>
            </div>
            <div className="flex justify-end">
                <div className="text-right">
                    <p className="text-lg text-green-700">Your</p>
                    <p className="text-4xl font-bold text-green-700">Subjects</p>
                </div>
            </div>
        </div>
    );
};

export default StudentInfo;