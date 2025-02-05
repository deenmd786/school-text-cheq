import React, { useEffect, useState } from "react";
import DisplayVideo from "@/components/ui/DisplayVideo";
import { getVideosByQus } from "@/utils/vedioController";

interface QuestionCardProps {
  question: string;
  subject: string;
  chapter: string;
}

const Shorts: React.FC<QuestionCardProps> = ({ subject, chapter, question }) => {
  const [videoUrls, setVideoUrls] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getVideoUrls = async () => {
      try {
        setLoading(true);
        const videos = await getVideosByQus(subject, chapter, parseInt(question)); // Fetch the videos from your API
        if (videos.length > 0) {
          setVideoUrls(videos.map(video => video.videoUrl)); // Store all video URLs
        } else {
          setVideoUrls([]);
        }
      } catch (err) {
        console.error("Error fetching video URLs:", err);
        setError("Failed to load videos.");
      } finally {
        setLoading(false);
      }
    };

    if (subject && chapter && question) {
      getVideoUrls();
    }
  }, [subject, chapter, question]);

  if (loading) {
    return <p>Loading videos...</p>;
  }

  return (
    <div className="px-4 bg-[var(--bg)]">
      {error && <p>{error}</p>}
      {videoUrls.length > 0 ? (
        videoUrls.map((url, index) => <DisplayVideo key={index} videoUrl={url} />)
      ) : (
        <p>No videos found for this question.</p>
      )}
    </div>
  );
};

export default Shorts;