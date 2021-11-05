/** @jsxImportSource @emotion/react */
import React from "react";
import { css } from "@emotion/react";
import { styles } from "./styles";
import { VideoGridProps } from "./types";
import { GridVideo } from "../GridVideo";
import { videos } from "../../videos";

export const VideoGrid: React.FC<VideoGridProps> = () => {
  return (
    <section css={styles.section}>
      <div css={styles.videoGrid}>
        <GridVideo video={videos[0]} onClick={() => {console.log('2')}} inQueue={true} />
        <GridVideo video={videos[1]} onClick={() => {console.log('2')}} inQueue={true} />
        <GridVideo video={videos[2]} onClick={() => {console.log('2')}} inQueue={true} />
        <GridVideo video={videos[3]} onClick={() => {console.log('2')}} inQueue={true} />
      </div>
    </section>
  )
}
