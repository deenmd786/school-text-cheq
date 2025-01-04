// LandingPage.tsx
"use client"
import React, { useState } from 'react';
import Logo from '@/components/ui/Logo';
import Link from 'next/link';

const LandingPage: React.FC = () => {
  const [isAgreed, setIsAgreed] = useState(false); // State to manage checkbox

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="text-center mb-10">
        <Logo />
      </div>
      <div className="flex text-center flex-col space-y-4">
        <Link href={'/auth'} className="w-64 py-3 text-lg font-semibold text-white bg-green-700 rounded-full">
          Login
        </Link>
        <Link
          href={'/auth/signup'}
          className={`w-64 py-3 text-lg font-semibold text-white bg-green-700 rounded-full ${!isAgreed ? 'opacity-50 cursor-not-allowed' : ''}`}
          onClick={(e) => {
            if (!isAgreed) {
              e.preventDefault(); // Prevent navigation if not agreed
            }
          }}
        >
          Sign up
        </Link>
      </div>
      <div className="flex items-center mt-4">
        <input
          type="checkbox"
          id="terms"
          checked={isAgreed}
          onChange={() => setIsAgreed(!isAgreed)} // Toggle checkbox state
          className="mr-2"
        />
        <label htmlFor="terms" className="text-xs text-green-700">
          I agree to the Terms of Use and Privacy Policy
        </label>
      </div>
      
    </div>
  );
};

export default LandingPage;