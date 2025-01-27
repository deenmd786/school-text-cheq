import { uploadVideo } from "@/lib/uploadVideo";
import { StudentVideo } from "@/types/StudentVideo";
import { studentUploadVideo } from "@/utils/vedioController";

interface UploadResponse {
  message?: string;
  url?: string;
  error?: string;
}

export const handleUpload = async (
  videoFile: File | null,
  setUploading: (state: boolean) => void,
  setSelectedVideo: (url: string) => void,
  setFormData: React.Dispatch<React.SetStateAction<Omit<StudentVideo, "id" | "_id">>>
): Promise<UploadResponse | null> => {
  if (!videoFile) {
    alert("Please select a video file to upload.");
    return null;
  }

  setUploading(true);
  try {
    const uploadResponse = (await uploadVideo(videoFile)) as UploadResponse;
    if (uploadResponse.url) {
      setSelectedVideo(uploadResponse.url);
      setFormData((prev) => ({ ...prev, videoUrl: uploadResponse.url || ""}));
      return uploadResponse;
    } else {
      console.error("Upload failed: No video URL returned.");
      return null;
    }
  } catch (error) {
    console.error("Upload failed:", error);
    alert("Upload failed. Please try again.");
    return null;
  } finally {
    setUploading(false);
  }
};

export const handleUploadVideo = async (formData: Omit<StudentVideo, "id" | "_id">) => {
  if (formData.videoUrl) {
    console.log("formData 2", formData);
    
    const response = await studentUploadVideo(formData);
    if ("message" in response) {
      console.error(response.message);
    } else {
      console.log("Video uploaded successfully!");
      return true;
    }
  }
  return false;
};
