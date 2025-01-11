import React from "react";
import UploadVideo from "@/components/ui/UploadVideo";

interface PageProps {
  params: {
    question?: string; // Match the dynamic route parameter type (always a string)
  };
}

const QuestionPage: React.FC<PageProps> = ({ params }) => {
  // Parse the question number as an integer
  const question = params.question ? parseInt(params.question, 10) : undefined;

  return (
    <div>
      {question !== undefined ? (
        <UploadVideo questionNumber={question} />
      ) : (
        <p>No question number provided.</p>
      )}
    </div>
  );
};

export default QuestionPage;
