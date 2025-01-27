// DisplayVideo.tsx
import React from 'react';

interface DisplayProps {
  videoUrl: string | null; // Allow videoUrl to be null initially
}

const DisplayVideo: React.FC<DisplayProps> = ({ videoUrl }) => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      {videoUrl ? (
        <video
          className="w-full max-w-md rounded-lg shadow-lg"
          controls
          src={videoUrl}
        />
      ) : (
        <div className="w-full max-w-md h-64 flex items-center justify-center rounded-lg shadow-lg bg-gradient-to-r from-blue-500 to-purple-500 text-white text-2xl">
          <p>Video will be displayed here!</p>
        </div>
      )}
    </div>
  );
};

export default DisplayVideo;