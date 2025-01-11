"use client"
import React from "react";
import UploadVideo from "@/components/ui/UploadVideo";
import { useParams } from "next/navigation"; // Import useParams

const QuestionPage: React.FC = () => {
  // Access the params directly from the URL
  const { question } = useParams<{ question: string }>();

  // Parse the question number as an integer
  const questionNumber = question ? parseInt(question, 10) : undefined;

  return (
    <div>
      {questionNumber !== undefined ? (
        <UploadVideo questionNumber={questionNumber} />
      ) : (
        <p>No question number provided.</p>
      )}
    </div>
  );
};

export default QuestionPage;