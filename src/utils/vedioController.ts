import { StudentVideo } from "@/types/StudentVideo";


// Helper function to handle fetch requests
const fetchWithErrorHandling = async (url: string, options?: RequestInit) => {
  const response = await fetch(url, options);
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Request failed");
  }
  return response.json();
};

// Function to fetch videos based on specific criteria
export const getVideosByQus = async (subject?: string, chapter?: string, questionNo?: number): Promise<StudentVideo[]> => {
  const queryParams = new URLSearchParams({
    ...(subject && { subject }),
    ...(chapter && { chapter }),
    ...(questionNo && { questionNo: questionNo.toString() }),
  });
  const data = await fetchWithErrorHandling(`/api/student-video?${queryParams}`);
  return data.videos || [];
};

// Function to upload a new student video
export const studentUploadVideo = async (
    formData: Omit<StudentVideo, "id" | "_id" | "status" | "teacherId" | "reviewDate">
): Promise<StudentVideo | { message: string }> => {
    try {
        const response = await fetch('/api/student-video', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        if (!response.ok) {
            const errorData = await response.json();
            return { message: errorData.error || "Failed to upload video" };
        }

        return await response.json();
    } catch (error) {
        return { message: error instanceof Error ? error.message : "An error occurred while uploading the video" };
    }
};




// Function to update a student video
export const updateVideo = async (videoId: string, updatedData: Partial<Omit<StudentVideo, "id" | "_id">>): Promise<{ message: string; video?: StudentVideo } | { error: string }> => {
  try {
    const data = await fetchWithErrorHandling(`/api/student-video/${videoId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedData),
    });
    return { message: "Video updated successfully", video: data.video };
  } catch (error) {
    return { error: error instanceof Error ? error.message : "Unknown error occurred." };
  }
};