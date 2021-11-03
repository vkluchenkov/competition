import React from 'react';
import { videos } from '../../videos';

export const QueueVideo: React.FC = () => {
  return (
    <div
      className = "queue__item"
      style={{
        display: 'flex',
        width: '100%',
        maxWidth: '350px',
      }}>

      <img
        src={videos[0].image}
        alt={videos[0].alt}
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

        <h5 className = "queue__title" style={{
          fontSize: '16px',
          lineHeight: '18px',
          fontWeight: 600,
          paddingBottom: '10px',
          margin: 0,
        }}>
          {videos[0].title}
        </h5>

        <p className = "queue__channel" style={{
          fontSize: '16px',
          lineHeight: '18px',
          fontWeight: 600,
          paddingBottom: '10px',
          margin: 0,
        }}>
          {videos[0].channel.name}
        </p>
      </div>
    </div>
  )
}