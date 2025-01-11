"use client";
import React, { useState } from 'react';
import Logo from '../ui/Logo';

const ParentLogin: React.FC = () => {
  const [formData, setFormData] = useState({
    phoneNumber: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleLogin = () => {
    if (formData.phoneNumber) {
      console.log("Phone Number:", formData.phoneNumber);
      // Here you can handle the login logic, e.g., API call
    }
  };

  return (
    <div className="bg-[var(--bg)] flex items-center justify-center min-h-screen">
      <div className="text-center">
        <h1 className="text-[var(--first)] text-5xl font-bold">Parent&apos;s</h1>
        <p className="text-[var(--first)] text-2xl mt-2">Login</p>
        <div className="mt-10">
          <Logo />
        </div>
        <div className="mt-10">
          <input
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleInputChange}
            className="md:w-80 h-12 bg-emerald-50 text-[var(--first)] text-center rounded-full"
            placeholder="Phone no."
            type="text"
          />
        </div>
        <div className="mt-6">
          <button
            className="w-full h-12 bg-[var(--first)] text-[var(--bg)] text-center rounded-full"
            onClick={handleLogin} // Call handleLogin on button click
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default ParentLogin;