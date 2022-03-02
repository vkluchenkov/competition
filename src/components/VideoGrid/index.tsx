import React, { useCallback, useEffect, useState } from "react";
import { styles } from "./styles";
import { GridVideo } from "../GridVideo";
import { videos } from "../../videos";
import { Video } from "../../models/video";
import { VideoCategory } from "../../models/videoCategories";
import { Link, Outlet } from "react-router-dom";
import clsx from "clsx";

interface VideoGridProps {
  activeCategory: VideoCategory | null;
}

const getVideos = (activeCategory: VideoCategory | null) => {
  const delay = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  return delay(1500).then(() =>
    videos.filter(
      (v) => !activeCategory || v.categories.includes(activeCategory)
    )
  );
};

export const VideoGrid: React.FC<VideoGridProps> = ({ activeCategory }) => {
  const [currentVideos, setCurrentVideos] = useState<Video[]>([]);
  const [overlay, setOverlay] = useState(false);

  const fetchVideos = useCallback(async () => {
    setOverlay(true);

    const filteredVideos = await getVideos(activeCategory);

    setCurrentVideos(filteredVideos);

    setOverlay(false);
  }, [activeCategory]);

  useEffect(() => {
    fetchVideos();
  }, [fetchVideos]);

  return (
    <div css={styles.container}>
      <div css={styles.overlay} className={clsx({ overlay })}></div>
      <div css={styles.videoGrid}>
        {currentVideos.map((video: Video) => (
          <GridVideo video={video} />
        ))}
      </div>
      <Outlet />
    </div>
  );
};
