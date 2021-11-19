/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from "react";
import { styles } from "./styles";
import { GridVideo } from "../GridVideo";
import { videos } from "../../videos";
import { Video } from "../../models/video";
import { VideoCategory } from "../../models/videoCategories";

interface VideoGridProps {
  activeCategory: VideoCategory | null;
}

const getVideos = (activeCategory: VideoCategory | null) => {

  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

  return delay(1500).then (() => videos.filter((v) => !activeCategory || v.categories.includes(activeCategory)))
}

export const VideoGrid: React.FC<VideoGridProps> = ({ activeCategory }) => {
  const [currentVideos, setCurrentVideos] = useState<Video[]>([])
  useEffect(() => {
    (
      async () => {
        const filteredVideos = await getVideos(activeCategory)
        setCurrentVideos(filteredVideos)
      }
    )()
  }, [activeCategory])

  return (
      <div css={styles.videoGrid}>
        {currentVideos.map((video: Video) => <GridVideo video={video} />)}
      </div>
  )
}