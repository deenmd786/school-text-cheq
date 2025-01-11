// src/app/dashboard/students/[subject]/page.tsx

import ChaptersOfSub from '@/components/ui/Chapters';
import { Subject } from '@/data/Subjects';
import React from 'react';

interface Props {
    params: {
        subject: string;
    };
}

const SubjectPage: React.FC<Props> = ({ params }) => {
    const subject = (params.subject as string).replace(/-/g, ' ') as Subject;
    

    return (
        <div className="bg-[var(--bg)] flex flex-col items-center justify-center min-h-screen p-4">
            <ChaptersOfSub subject={subject} />
        </div>
    );
};

export default SubjectPage;