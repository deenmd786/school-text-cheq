// pages/index.tsx
"use client"

import StudentInfo from '@/components/ui/StudentInfo';
import TeachersInfo from '@/components/ui/TeachersInfo';
import { useParams } from 'next/navigation';
import React from 'react';

const Page: React.FC = () => {
      const { roll } = useParams<{ roll: string }>();
    return (

        <div>
            {roll === "students" ? (<StudentInfo/>):(<TeachersInfo />)} 
        </div>
    );
};

export default Page;