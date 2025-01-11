"use client"

import Questions from '@/components/ui/Questions';
import React from 'react';
import { NextPage } from 'next'; // Import NextPage from Next.js
import { useParams } from 'next/navigation'; // Import useParams

const ChapterPage: NextPage = () => {
    // Access the params directly from the URL
    const { subject, chapter } = useParams<{ subject: string; chapter: string }>();

    // Replace hyphens with spaces in the chapter and subject strings
    const formattedChapter = chapter ? chapter.replace(/-/g, ' ') : '';
    const formattedSubject = subject ? subject.replace(/-/g, ' ') : '';


    return (
        <div className="bg-[var(--bg)] flex flex-col items-center justify-center min-h-screen p-4">
            <Questions chapter={formattedChapter} subject={formattedSubject} />
        </div>
    );
};

export default ChapterPage;