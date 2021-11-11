/** @jsxImportSource @emotion/react */
import React from "react";
import { css } from "@emotion/react";
import { styles } from "./styles";
import { VideoGridProps } from "./types";
import { GridVideo } from "../GridVideo";
import { videos } from "../../videos";
import { Video } from "../../models/video";

export const VideoGrid: React.FC<VideoGridProps> = () => {
  return (
    <section css={styles.section}>
      <div css={styles.videoGrid}>
      {videos.map((video: Video) => <GridVideo video={video} />)}
      </div>
    </section>
  )
}
