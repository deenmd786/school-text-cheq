// lib/api.js
import { Student, Teacher } from "@/types/FormData"; // Ensure this path is correct

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api/auth";

export const loginUser  = async (email: string, password: string, role: "teacher" | "student") => {
  const response = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password, role }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Login failed");
  }

  return await response.json();
};

export const signupStudent = async (formData: Omit<Student, "id" | "_id">) => {
  const response = await fetch(`${API_URL}/student-signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Student Signup failed");
  }

  return await response.json();
};
export const signupTeacher = async (formData: Omit<Teacher, "id" | "_id">) => {
  const response = await fetch(`${API_URL}/teacher-signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Teacher Signup failed");
  }

  return await response.json();
};