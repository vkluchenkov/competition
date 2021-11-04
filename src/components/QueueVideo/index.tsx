import React from 'react';
import { QueueVideoProps } from './types';

export const QueueVideo: React.FC<QueueVideoProps> = ({
  video,
  onClick,
}) => {
  return (
    <div
      className = "queue__item"
      style={{
        display: 'flex',
        width: '100%',
        maxWidth: '350px',
      }}
      onClick={onClick}>

      <img
        src={video.image}
        alt={video.title}
        className = "queue__image"
        style={{
          borderRadius: '5px',
          width: '120px',
          height: '67px',
          objectFit: 'cover'
        }}></img>

      <div className = "queue__meta"
        style={{
          padding: '5px 15px',
          display: 'flex',
          flexDirection: 'column'
        }}>

        <h5 className = "queue__title"
        style={{
          fontSize: '16px',
          lineHeight: '18px',
          fontWeight: 600,
          paddingBottom: '10px',
          margin: 0,
        }}>
          {video.title}
        </h5>

        <p className = "queue__channel"
        style={{
          fontSize: '16px',
          lineHeight: '18px',
          fontWeight: 600,
          paddingBottom: '10px',
          margin: 0,
        }}>
          {video.channel.name}
        </p>
      </div>
    </div>
  )
}