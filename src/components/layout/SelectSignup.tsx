// MyComponent.tsx
import React from 'react';
import Logo from '../ui/Logo';
import Link from 'next/link';

const SelectSignup: React.FC = () => {
  return (
    <div className="bg-[var(--bg)] flex items-center justify-center min-h-screen">
      <div className="text-center">
        <Logo/>
        <div className="flex flex-col gap-3">
          <Link href={'/auth/login/parents'} className=" bg-[var(--second)] text-[var(--bg)] text-lg font-semibold py-2 px-4  rounded-full w-48">
            Parent&apos;s
          </Link>
          <Link href={'/auth/signup/teachers'} className="bg-teal-300 text-[var(--bg)] text-lg font-semibold py-2 px-4 rounded-full w-48">
            Teacher&apos;s
          </Link>
          <Link href={'/auth/signup/students'} className="bg-[var(--first)] text-[var(--bg)] text-lg font-semibold py-2 px-4 rounded-full w-48">
            Student&apos;s
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SelectSignup;