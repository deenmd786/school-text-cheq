import UploadVideo from '@/components/ui/UploadVideo';
import React from 'react';

interface Props {
    params: {
        quetion?: number; // Typo in "question" corrected
    };
}

const QuestionPage: React.FC<Props> = ({ params }) => {
    // Check if params.quetion is defined before using it
    const question = params.quetion;

    return (
        <div>
            {question !== undefined ? (
                <UploadVideo questionNumber={question} />
            ) : (
                <p>No question number provided.</p> // Optional: Handle the case where question is undefined
            )}
        </div>
    );
};

export default QuestionPage;