import { Question } from "@/types/Questions";

// Helper function to handle fetch requests
const fetchWithErrorHandling = async (url: string, options?: RequestInit) => {
  const response = await fetch(url, options);
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Request failed");
  }
  return response.json();
};

// Function to fetch questions based on specific criteria
export const getQuestionsByCriteria = async (
  className?: string,
  subject?: string,
  chapter?: string
): Promise<Question[]> => {
  const queryParams = new URLSearchParams({
    ...(className && { class: className }),
    ...(subject && { subject }),
    ...(chapter && { chapter }),
  });
  const data = await fetchWithErrorHandling(`/api/question-form?${queryParams}`);
  return data.questions || [];
};

// Function to upload a new question
export const uploadQuestion = async (
  formData: Omit<Question, "id" | "_id"> // Exclude fields that are not needed for upload
): Promise<Question | { message: string }> => {
  try {
    const response = await fetch('/api/question-form', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return { message: errorData.error || "Failed to upload question" };
    }

    return await response.json();
  } catch (error) {
    return { message: error instanceof Error ? error.message : "An error occurred while uploading the question" };
  }
};

// Function to update a question
export const updateQuestion = async (
  questionId: string,
  updatedData: Partial<Omit<Question, "id" | "_id">>
): Promise<{ message: string; question?: Question } | { error: string }> => {
  try {
    const data = await fetchWithErrorHandling(`/api/question-form/${questionId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedData),
    });
    return { message: "Question updated successfully", question: data.question };
  } catch (error) {
    return { error: error instanceof Error ? error.message : "Unknown error occurred." };
  }
};