// utils/uploadVideo.ts

export const uploadVideo = async (videoFile: File): Promise<string | null> => {
  
    if (!videoFile) {
      throw new Error("No video file provided");
    }

  
    const formData = new FormData();
    formData.append("file", videoFile);
    formData.append("upload_preset", "Vedio_upload");
    formData.append("resource_type", "video");
  
    const response = await fetch("https://api.cloudinary.com/v1_1/djv7gpgam/video/upload", {
      method: "POST",
      body: formData,
    });

  
    if (!response.ok) {
      throw new Error("Upload failed");
    }
  
    const data = await response.json();
    return data || null;
  };