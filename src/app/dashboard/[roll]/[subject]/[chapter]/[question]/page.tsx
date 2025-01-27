"use client"
import React from "react";
import { useParams } from "next/navigation"; // Import useParams
import VideoUpload from "@/components/ui/VideoUpload";
import QuestionPage from "@/components/layout/QuestionPage";

const Page: React.FC = () => {
  const { roll } = useParams<{ roll: string }>();
  const { subject } = useParams<{ subject: string }>();
  const { chapter } = useParams<{ chapter: string }>();
  const { question } = useParams<{ question: string }>();

  return (
    <div>
      {roll === "students" ? (<div>
      {chapter !== undefined ? (
        <VideoUpload question={question} subject={subject} chapter={chapter} />
      ) : (
        <p>No question number provided.</p>
      )}
    </div>): (<div>
      {chapter !== undefined ? (
        <QuestionPage question={question} subject={subject} chapter={chapter} />
      ) : (
        <p>No question number provided.</p>
      )}
    </div>)}
    </div>
    
  );
};

export default Page;