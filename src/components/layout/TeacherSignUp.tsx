"use client";
import React, { useState } from "react";
import Image from "next/image";
import { convertImageToBase64 } from "@/utils/convertImageToBase64"; // Adjust the import path as necessary

const TeacherSignUp: React.FC = () => {
  const [formData, setFormData] = useState({
    teacherName: "",
    subjects: "",
    schoolName: "",
    schoolCode: "",
    email: "",
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
    setFormData({
      teacherName: "",
      subjects: "",
      schoolName: "",
      schoolCode: "",
      email: "",
      phone: "",
      profilePic: "",
    });
  };

  return (
    <form className="bg-[var(--bg)] flex flex-col items-center p-4" onSubmit={handleSubmit}>
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
            <Image
              alt="Placeholder image of a person"
              className="rounded-full"
              height={100}
              src="https://storage.googleapis.com/a1aa/image/fT7K5SaWGH36calzkqnHw1eh8tgKqwbtFsp73voQHBAs8pBUA.jpg"
              width={100}
            />
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
          />
          <input
            name="subjects"
            value={formData.subjects}
            onChange={handleInputChange}
            className="bg-green-100 text-center rounded-full py-2 text-[var(--first)] w-full"
            placeholder="Subjects"
            type="text"
          />
          <input
            name="schoolName"
            value={formData.schoolName}
            onChange={handleInputChange}
            className="bg-green-100 text-center rounded-full py-2 text-[var(--first)] w-full"
            placeholder="School Name"
            type="text"
          />
          <input
            name="schoolCode"
            value={formData.schoolCode}
            onChange={handleInputChange}
            className="bg-green-100 text-center rounded-full py-2 text-[var(--first)] w-full"
            placeholder="School Code"
            type="text"
          />
        </div>
      </div>
      <div className="flex flex-col w-full space-y-4">
        <input
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          className="bg-green-100 rounded-full text-center py-2 text-[var(--first)] w-full"
          placeholder=" Email I’d"
          type="text"
        />
        <input
          name="phone"
          value={formData.phone}
          onChange={handleInputChange}
          className="bg-green-100 rounded-full text-center py-2 text-[var(--first)] w-full"
          placeholder="Phone no"
          type="text"
        />
      </div>
      <button type="submit" className="mt-8 bg-[var(--first)] text-[var(--bg)] w-full py-2 rounded-full">
        Sign Up
      </button>
    </form>
  );
};

export default TeacherSignUp;