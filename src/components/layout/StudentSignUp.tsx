"use client"
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify"; // Import toast
import "react-toastify/dist/ReactToastify.css"; // Import toast styles
import Image from "next/image";
import { signupStudent } from "@/utils/authController";
import { FaUserCircle } from "react-icons/fa";

const SignupPage = () => {
  const [formData, setFormData] = useState({
    studentName: "",
    class: "",
    section: "",
    rollNo: "",
    schoolCode: "",
    schoolName: "",
    parentPhoneNo: "",
    email: "",
    password: "",
    phone: "",
    profilePic: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = URL.createObjectURL(e.target.files[0]);
      setFormData((prev) => ({ ...prev, profilePic: file }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      console.log("formData", formData);
      
      const response = await signupStudent(formData);
      toast.success(response.message); // Show success toast
      setFormData({
        studentName: "",
        class: "",
        section: "",
        rollNo: "",
        schoolCode: "",
        schoolName: "",
        parentPhoneNo: "",
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
        <h1 className="text-[var(--first)] text-5xl font-bold">Student’s</h1>
        <h2 className="text-[var(--first)] text-3xl">Sign up</h2>
      </div>
      <div className="flex items-center mb-3 mt-6 space-x-3">
        <label className="bg-green-100 rounded-full p-2 cursor-pointer">
          {formData.profilePic ? (
            <Image alt="Uploaded image" className="rounded-full" height={100} src={formData.profilePic} width={100} />
          ) : (
            <div className="text-[var(--second)]">
              <FaUserCircle size={70}/>
            </div>
          )}
          <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
        </label>
        <div className="flex flex-col w-full space-y-3">
          <input name="studentName" value={formData.studentName} onChange={handleInputChange} className="bg-green-100 text-center rounded-full py-2 text-[var(--first)] w-full" placeholder="Student’s Name" type="text" required />
          <div className="flex space-x-4 w-full">
            <input name="class" value={formData.class} onChange={handleInputChange} className="bg-green-100 text-center rounded-full py-2 text-[var(--first)] w-full" placeholder="Class" type="text" required />
            <input name="section" value={formData.section} onChange={handleInputChange} className="bg-green-100 text-center rounded-full py-2 text-[var(--first)] w-full" placeholder="Section" type="text" required />
          </div>
          <div className="flex space-x-4 w-full">
            <input name="rollNo" value={formData.rollNo} onChange={handleInputChange} className="bg-green-100 rounded-full text-center py-2 text-[var(--first)] w-full" placeholder="Roll No" type="number" required />
            <input name="schoolCode" value={formData.schoolCode} onChange={handleInputChange} className="bg-green-100 rounded-full text-center py-2 text-[var(--first)] w-full" placeholder="School Code" type="number" required />
          </div>
        </div>
      </div>
      <div className="flex flex-col w-full space-y-3">
        <input name="schoolName" value={formData.schoolName} onChange={handleInputChange} className="bg-green-100 rounded-full text-center py-2 text-[var(--first)] w-full" placeholder="School Name" type="text" required />
        <input name="parentPhoneNo" value={formData.parentPhoneNo} onChange={handleInputChange} className="bg-green-100 rounded-full text-center py-2 text-[var(--first)] w-full" placeholder="Parent’s Phone No" type="number" required />
        <input name="email" value={formData.email} onChange={handleInputChange} className="bg-green-100 rounded-full text-center py-2 text-[var(--first)] w-full" placeholder="Email ID" type="email" required />
        <input name="password" value={formData.password} onChange={handleInputChange} className="bg-green-100 rounded-full text-center py-2 text-[var(--first)] w-full" placeholder="Password" type="password" required />
        <input name="phone" value={formData.phone} onChange={handleInputChange} className="bg-green-100 rounded-full text-center py-2 text-[var(--first)] w-full" placeholder="Phone No" type="number" required />
      </div>
      <button type="submit" className="mt-6 bg-[var(--first)] text-[var(--bg)] w-full py-2 rounded-full">
        Sign Up
      </button>
      <ToastContainer /> {/* Toast container for notifications */}
    </form>
  );
};

export default SignupPage;