import Questions from '@/components/ui/Questions';
import React from 'react';

interface Props {
    params: {
        subject: string; 
        chapter: string; 
    };
}

const ChapterPage: React.FC<Props> = ({ params }) => {
    // Log the params to debug
    console.log("Params: ", params);

    // Check if params.chapter and params.subject are defined before using them
    const chapter = params.chapter ? params.chapter.replace(/-/g, ' ') : ''; 
    const subject = params.subject ? params.subject.replace(/-/g, ' ') : '';
    
    console.log("Subject: ", subject);
    console.log("Chapter: ", chapter);

    return (
        <div className="bg-[var(--bg)] flex flex-col items-center justify-center min-h-screen p-4">
            <Questions chapter={chapter} subject={subject} />
        </div>
    );
};

export default ChapterPage;