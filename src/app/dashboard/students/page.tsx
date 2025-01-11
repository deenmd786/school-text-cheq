// pages/index.tsx
"use client"

import StudentInfo from '@/components/ui/StudentInfo';
import React from 'react';

const Home: React.FC = () => {
    return (
        <div>
            <StudentInfo />
        </div>
    );
};

export default Home;