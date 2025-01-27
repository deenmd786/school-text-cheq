"use client";

import React, { useState, useEffect } from "react";
import { StudentVideo } from "@/types/StudentVideo";
import { handleUpload, handleUploadVideo } from "@/helper/uploadHelper";

interface QuestionCardProps {
  question: string;
  subject: string;
  chapter: string;
}

const UploadVideo: React.FC<QuestionCardProps> = ({ question, subject, chapter }) => {
  const [formData, setFormData] = useState<Omit<StudentVideo, "id" | "_id">>({
    subject,
    chapter,
    questionNo: question,
    videoUrl: "",
  });

  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoPreview, setVideoPreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState<boolean>(false);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [uploadSuccess, setUploadSuccess] = useState<boolean>(false);
  console.log("formData", formData);
  

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setVideoFile(file);
      setVideoPreview(URL.createObjectURL(file));
      setUploadSuccess(false);
    }
  };

  const handleUploadProcess = async () => {
    const uploadResponse = await handleUpload(videoFile, setUploading, setSelectedVideo, setFormData);
    if (uploadResponse?.url) {
      const success = await handleUploadVideo(formData);
      setUploadSuccess(success);
    }
  };

  useEffect(() => {
    return () => {
      if (videoPreview) URL.revokeObjectURL(videoPreview);
    };
  }, [videoPreview]);

  return (
    <div className="bg-[var(--bg)] flex items-center justify-center min-h-screen">
      <div className="w-[375px] h-[100vh] bg-[var(--bg)] rounded-3xl shadow-lg overflow-hidden relative">
        <div className="bg-[var(--first)] text-[var(--bg)] text-center p-4 rounded-b-full">
          <p>Question {question}: What do you mean by an asset and what are different types of assets?</p>
        </div>

        <div className="flex flex-col items-center justify-center h-full px-4">
          <div className="bg-[var(--bg)] rounded-lg shadow-md w-full flex flex-col items-center justify-center p-4">
            {uploading ? (
              <p className="text-[var(--first)]">Uploading your video, please wait...</p>
            ) : uploadSuccess ? (
              <p className="text-green-500">Upload successful! Your video is ready.</p>
            ) : videoPreview || selectedVideo ? (
              <video className="w-full h-[200px] object-cover rounded-md" controls src={videoPreview || selectedVideo || undefined} />
            ) : (
              <p className="text-[var(--first)] text-center">No video selected.</p>
            )}
          </div>

          <div className="flex items-center gap-2 mt-4">
            <label htmlFor="video-upload" className="cursor-pointer bg-[var(--second)] text-[var(--bg)] py-2 px-4 rounded-full flex items-center gap-2">
              📤 Choose Video
              <input id="video-upload" type="file" accept="video/*" onChange={handleFileChange} className="hidden" />
            </label>
          </div>

            {formData.videoUrl ? (<button onClick={handleUploadProcess} disabled={uploading} className="mt-4 bg-[var(--second)] text-[var(--bg)] py-2 px-4 rounded-full">
            {uploading ? "Submiting..." : "Submit Here"}
          </button>): (<button onClick={handleUploadProcess} disabled={uploading} className="mt-4 bg-[var(--second)] text-[var(--bg)] py-2 px-4 rounded-full">
            {uploading ? "Uploading..." : "Upload Here"}
          </button>)}
        </div>
      </div>
    </div>
  );
};

export default UploadVideo;
