"use client"
import React, { useState } from 'react';

interface QuestionCardProps {
  questionNumber: number;
}

const UploadVideo: React.FC<QuestionCardProps> = ({ questionNumber }) => {
  const [videoFile, setVideoFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setVideoFile(file);
    }
  };

  const handleUpload = () => {
    if (videoFile) {
      // Handle the upload logic here
      // For example, you can send the file to a server or cloud storage
      console.log('Uploading video:', videoFile.name);
      // Reset the file input after upload
      setVideoFile(null);
    } else {
      alert('Please select a video file to upload.');
    }
  };

  return (
    <div className="bg-[var(--bg)] flex items-center justify-center min-h-screen">
      <div className="w-[375px] h-[100vh] bg-[var(--bg)] rounded-3xl shadow-lg overflow-hidden relative">
        <div className="bg-[var(--first)] text-[var(--bg)] text-center p-4 rounded-b-full">
          <p>Question {questionNumber}: What do you mean by an asset and what are different types of assets?</p>
        </div>
        <div className="flex flex-col items-center justify-center h-full px-4">
          <div className="bg-[var(--bg)] rounded-lg shadow-md w-full flex items-center justify-center">
            {videoFile ? (
              <p className="text-[var(--first)] text-center">Selected Video: {videoFile.name}</p>
            ) : (
              <p className="text-[var(--first)] text-center">No video selected.</p>
            )}
          </div>
          <input
            type="file"
            accept="video/*"
            onChange={handleFileChange}
            className="mt-4"
          />
          <button
            onClick={handleUpload}
            className="mt-4 bg-[var(--second)] text-[var(--bg)] py-2 px-4 rounded-full"
          >
            Upload Here
          </button>
        </div>
      </div>
    </div>
  );
};

export default UploadVideo;