"use client";

import { uploadVideo } from "@/lib/uploadVideo";
import { StudentVideo } from "@/types/StudentVideo";
import { studentUploadVideo } from "@/utils/vedioController";
import React, { useState, useEffect } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";

interface QuestionCardProps {
  question: string;
  subject: string;
  chapter: string;
}

interface UploadResponse {
  message?: string;
  url?: string;
  error?: string;
}

const VideoUpload: React.FC<QuestionCardProps> = ({
  question,
  subject,
  chapter,
}) => {
  const [formData, setFormData] = useState<Omit<StudentVideo, "id" | "_id">>({
    subject,
    chapter,
    questionNo: question,
    videoUrl: "",
  });

  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoPreview, setVideoPreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState<boolean>(false);
  const [notSubmited, setNotSubmited] = useState<boolean>(true);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [uploadSuccess, setUploadSuccess] = useState<boolean>(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setVideoFile(file);
      const previewUrl = URL.createObjectURL(file);
      setVideoPreview(previewUrl);
      setUploadSuccess(false);
    }
  };

  const handleUpload = async () => {    
    if (!videoFile) {
      alert("Please select a video file to upload.");
      return; // Return if no file is selected
    }
    setUploading(true);
    setUploadSuccess(false);
    try {
      const uploadResponse: UploadResponse = await uploadVideo(videoFile) as UploadResponse;
      if (uploadResponse.url) {
        const videoUrl = uploadResponse.url;
        setSelectedVideo(videoUrl);
        setFormData((prevState) => ({
          ...prevState,
          videoUrl: videoUrl,
        }));
        return uploadResponse;
      } else {
        console.error("Upload failed: No video URL returned in response.");
        return null; // Return null if upload failed
      }
      
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Upload failed. Please try again.");
      return null; // Return null on error
    } finally {
      setUploading(false);
      setVideoFile(null);
      setVideoPreview(null);
    }
  };

  useEffect(() =>{
    const handleUploadVideo = async () => {
        if (formData.videoUrl) {
          const response = await studentUploadVideo(formData);
          if ('message' in response) {
            console.log(response.message);
          } else {
            console.log("Video uploaded successfully!");
            setUploadSuccess(true);
            setNotSubmited(false);
          }
        }
      };
      console.log("formData", formData);
      if (notSubmited) { 
          handleUploadVideo();
      }
      return
  },[formData.videoUrl])


  useEffect(() => {
    return () => {
      if (videoPreview) {
        URL.revokeObjectURL(videoPreview);
      }
    };
  }, [videoPreview]);

  return (
    <div className="bg-[var(--bg)] flex items-center justify-center min-h-screen">
      <div className="w-[375px] h-[100vh] bg-[var(--bg)] rounded-3xl shadow-lg overflow-hidden relative">
        {/* Question Header */}
        <div className="bg-[var(--first)] text-[var(--bg)] text-center p-4 rounded-b-full">
          <p>
            Question {question}: What do you mean by an asset and what are
            different types of assets?
          </p>
        </div>

        {/* Upload Section */}
        <div className="flex flex-col items-center h-full px-4">
          <div className="bg-[var(--bg)] h-[70vh] rounded-lg shadow-md w-full flex flex-col items-center justify-center p-4">
            {uploading ? (
              <p className="text-[var(--first)]">
                Uploading your video, please wait...
              </p>
            ) : uploadSuccess ? (
              <p className="text-green-500">
                Upload successful! Your video is ready.
              </p>
            ) : videoPreview || selectedVideo ? (
              <video
                className="w-full h-full object-cover rounded-md"
                controls
                src={videoPreview || selectedVideo || undefined}
              />
            ) : (
                <div className="w-full h-full">
                    <label
                htmlFor="video-upload"
                className="cursor-pointer  h-full w-full text-[var(--second)]  flex flex-col items-center justify-center  rounded-full"
              >
                <div className="text-7xl"><FaCloudUploadAlt /></div>
                <p className="text-xl">Upload Video</p>
                <input
                  id="video-upload"
                  type="file"
                  accept="video/*"
                  onChange={handleFileChange}
                  className="hidden w-full h-full"
                />
              </label>
                </div>
            )}
          </div>


          {/* Upload Button */}
          <button
            onClick={handleUpload}
            disabled={uploading}
            className="mt-4 bg-[var(--first)] text-[var(--bg)] py-2 px-4 rounded-full"
          >
            {uploading ? "Submit..." : "Submit Here"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoUpload;