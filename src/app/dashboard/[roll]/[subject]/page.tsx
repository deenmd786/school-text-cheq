"use client"

import Chapters from '@/components/ui/Chapters';
import { Subject } from '@/data/Subjects';
import { useParams } from 'next/navigation'; // Import useParams
import React from 'react';

const SubjectPage: React.FC = () => {
    // Access the subject directly from URL params
    const { roll } = useParams<{ roll: string }>();
    const { subject } = useParams<{ subject: string }>();

    // Replace hyphens with spaces in the subject string
    const formattedSubject = subject.replace(/-/g, ' ') as Subject;

    return (
        <div className="bg-[var(--bg)] flex flex-col justify-center min-h-screen px-4">
            <Chapters roll={roll} subject={formattedSubject} />
        </div>
    );
};

export default SubjectPage;