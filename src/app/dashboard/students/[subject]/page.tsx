"use client"

import Chapters from '@/components/ui/Chapters';
import { Subject } from '@/data/Subjects';
import { useParams } from 'next/navigation'; // Import useParams
import React from 'react';

const SubjectPage: React.FC = () => {
    // Access the subject directly from URL params
    const { subject } = useParams<{ subject: string }>(); // Destructure subject from useParams

    // Replace hyphens with spaces in the subject string
    const formattedSubject = subject.replace(/-/g, ' ') as Subject;

    return (
        <div className="bg-[var(--bg)] flex flex-col items-center justify-center min-h-screen p-4">
            <Chapters subject={formattedSubject} />
        </div>
    );
};

export default SubjectPage;