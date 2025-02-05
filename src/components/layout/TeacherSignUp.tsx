"use client";
import React, { useState } from "react";
import Image from "next/image";
import { convertImageToBase64 } from "@/utils/convertImageToBase64"; // Adjust the import path as necessary
import { toast, ToastContainer } from "react-toastify"; // Import toast
import "react-toastify/dist/ReactToastify.css"; // Import toast styles
import { FaUserCircle } from "react-icons/fa"; // Import user icon
import { signupTeacher } from "@/utils/authController";

const TeacherSignUp: React.FC = () => {
  const [formData, setFormData] = useState({
    teacherName: "",
    subjects: "",
    schoolName: "",
    schoolCode: "",
    email: "",
    password: "",
    phone: "",
    profilePic: "",
  });

  const handleImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const base64Image = await convertImageToBase64(file);
      setFormData((prevData) => ({
        ...prevData,
        profilePic: base64Image as string,
      }));
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form Data: ", formData);
    // Here you can handle the form submission, e.g., send data to the server
    try {
      const response = await signupTeacher(formData); // Replace with your actual signup function
      toast.success(response.message); // Show success toast
      setFormData({
        teacherName: "",
        subjects: "",
        schoolName: "",
        schoolCode: "",
        email: "",
        password: "",
        phone: "",
        profilePic: "",
      });
    } catch (err) {
      toast.error((err as Error).message || "Signup failed"); // Show error toast
    }
  };

  return (
    <form className="bg-[var(--bg)] flex flex-col items-center p-4 min-h-screen" onSubmit={handleSubmit}>
      <div className="text-center mt-4">
        <h1 className="text-[var(--first)] text-5xl font-bold">Teacher&apos;s</h1>
        <h2 className="text-[var(--first)] text-3xl">Sign up</h2>
      </div>
      <div className="flex items-center mb-4 mt-8 space-x-4">
        <label className="bg-green-100 rounded-full p-2 cursor-pointer">
          {formData.profilePic ? (
            <Image
              alt="Uploaded image"
              className="rounded-full"
              height={100}
              src={formData.profilePic}
              width={100}
            />
          ) : (
            <div className="text-[var(--second)]">
              <FaUserCircle size={70} />
            </div>
          )}
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden" // Hide the file input
          />
        </label>
        <div className="flex flex-col w-full space-y-4">
          <input
            name="teacherName"
            value={formData.teacherName}
            onChange={handleInputChange}
            className="bg-green-100 text-center rounded-full py-2 text-[var(--first)] w-full"
            placeholder="Teacher’s Name"
            type="text"
            required
          />
          <input
            name="subjects"
            value={formData.subjects}
            onChange={handleInputChange}
            className="bg-green-100 text-center rounded-full py-2 text-[var(--first)] w-full"
            placeholder="Subjects"
            type="text"
            required
          />
          <input
            name="schoolName"
            value={formData.schoolName}
            onChange={handleInputChange}
            className="bg-green-100 text-center rounded-full py-2 text-[var(--first)] w-full"
            placeholder="School Name"
            type="text"
            required
          />
          <input
            name="schoolCode"
            value={formData.schoolCode}
            onChange={handleInputChange}
            className="bg-green-100 text-center rounded-full py-2 text-[var(--first)] w-full"
            placeholder="School Code"
            type="number"
            required
          />
        </div>
      </div>
      <div className="flex flex-col w-full space-y-4">
        <input
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          className="bg-green-100 rounded-full text-center py-2 text-[var(--first)] w-full"
          placeholder="Email ID"
          type="email"
          required
        />
        <input
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          className="bg-green-100 rounded-full text-center py-2 text-[var(--first)] w-full"
          placeholder="Password"
          type="password"
          required
        />
        <input
          name="phone"
          value={formData.phone}
          onChange={handleInputChange}
          className="bg-green-100 rounded-full text-center py-2 text-[var(--first)] w-full"
          placeholder="Phone No"
          type="number"
          required
        />
      </div>
      <button type="submit" className="mt-8 bg-[var(--first)] text-[var(--bg)] w-full py-2 rounded-full">
        Sign Up
      </button>
      <ToastContainer /> {/* Toast container for notifications */}
    </form>
  );
};

export default TeacherSignUp;