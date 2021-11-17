/** @jsxImportSource @emotion/react */
import React from "react";
import { styles } from "./styles";
import { GridVideo } from "../GridVideo";
import { videos } from "../../videos";
import { Video } from "../../models/video";
import { VideoCategory } from "../../models/videoCategories";

interface VideoGridProps {
  activeCategory: VideoCategory | null;
}

export const VideoGrid: React.FC<VideoGridProps> = ({ activeCategory }) => {
  return (
      <div css={styles.videoGrid}>
        {
        videos.
        filter((v) => !activeCategory || v.categories.includes(activeCategory)).
        map((video: Video) => <GridVideo video={video} />)
        }
      </div>
  )
}
