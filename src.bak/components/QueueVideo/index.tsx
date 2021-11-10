/** @jsxImportSource @emotion/react */
import React from 'react';
import { QueueVideoProps } from './types';
import { css, jsx } from "@emotion/react";
import { styles } from './styles';

export const QueueVideo: React.FC<QueueVideoProps> = ({
  video,
  onClick,
}) => {
  return (
    <div
      css={styles.queue_item}
      onClick={onClick}>

      <img
        src={video.image}
        alt={video.title}
        css={styles.queue_image}>
        </img>

      <div css={styles.queue_meta}>

        <h5 css={styles.queue_title}>
          {video.title}
        </h5>

        <p css={styles.queue_channel}>
          {video.channel.name}
        </p>
      </div>
    </div>
  )
}