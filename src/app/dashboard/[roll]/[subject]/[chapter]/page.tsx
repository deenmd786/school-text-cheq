"use client";

import Questions from '@/components/ui/Questions';
import React from 'react';
import { NextPage } from 'next'; // Import NextPage from Next.js
import { useParams } from 'next/navigation'; // Import useParams

const ChapterPage: NextPage = () => {
    const { subject, chapter, roll } = useParams<{ roll:string; subject: string; chapter: string }>();
    const formattedSubject = subject ? subject.replace(/-/g, ' ') : '';
    const chapterNumber = chapter ? chapter.match(/^(\d+)/)?.[0] || '' : '';
    const formattedChapter = chapter ? chapter.replace(/^\d+/, '').replace(/-/g, ' ').trim() : '';

    return (
        <div className="bg-[var(--bg)] flex flex-col min-h-screen px-4">
            <Questions roll={roll} chapter={formattedChapter} subject={formattedSubject} chapterNumber={chapterNumber} />
        </div>
    );
};

export default ChapterPage;