import React from "react";
import { GridVideoProps } from "./types";
import { formatAge } from "../../helpers/formatAge";
import { formatViews } from "../../helpers/formatViews";
import { formatVideoDuration } from "../../helpers/formatVideoDuration";

export const GridVideo: React.FC<GridVideoProps> = ({
  video,
  onClick,
  inQueue,
}) => {

  const videoViews = formatViews(video.views);
  const videoAge = formatAge(video.createdAt);
  const videoDuration = formatVideoDuration(video.duration);
  const videoButtonStyle = inQueue ? 'video__action video__action_type_queue video__action_active' : 'video__action video__action_type_queue';

  return (
    <div className="video"
      id = {video.id}
      style={{
        maxWidth: '700px',
        border: 0,
        padding: 0,
        verticalAlign: 'baseline',
        }}>

      <div className="video__media"
        style={{
          cursor: 'pointer',
          position: 'relative',
          margin: '0 0 10px',
          padding: 0,
          verticalAlign: 'baseline',
        }}>

        <img
          src={video.image}
          alt={video.title}
          style={{
            width: '100%',
            borderRadius: '5px',
          }}></img>

        <div className="video__time"
          style={{
            padding: '5px',
            backgroundColor: 'black',
            color: 'white',
            borderRadius: '5px',
            position: 'absolute',
            bottom: '3px',
            right: '3px',
          }}>
          {videoDuration}
        </div>

        <div className="video__actions"
          style={{
            position: 'absolute',
            top: '3px',
            right: '3px',
            display: 'flex',
            flexDirection: 'column',
            // opacity: 0,
            // transition: 'opacity .5s',
          }}>
        <button className={videoButtonStyle}
          style={{
            backgroundColor: 'black',
            color: 'white',
            width: '30px',
            height: '30px',
            outline: 'none',
            border: 'none',
            cursor: 'pointer',
            marginBottom: '5px',
          }}>
              <svg viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" focusable="false" style={{pointerEvents: 'none', display: 'block', width: '100%', height: '100%'}}><path fill="currentColor" d="M14.97,16.95L10,13.87V7h2v5.76l4.03,2.49L14.97,16.95z M22,12c0,5.51-4.49,10-10,10S2,17.51,2,12h1c0,4.96,4.04,9,9,9 s9-4.04,9-9s-4.04-9-9-9C8.81,3,5.92,4.64,4.28,7.38C4.17,7.56,4.06,7.75,3.97,7.94C3.96,7.96,3.95,7.98,3.94,8H8v1H1.96V3h1v4.74 C3,7.65,3.03,7.57,3.07,7.49C3.18,7.27,3.3,7.07,3.42,6.86C5.22,3.86,8.51,2,12,2C17.51,2,22,6.49,22,12z"></path></svg>
            </button>
            <button className="video__action"
              style={{
                backgroundColor: 'black',
                color: 'white',
                width: '30px',
                height: '30px',
                outline: 'none',
                border: 'none',
                cursor: 'pointer',
                marginBottom: '5px',
              }}>
              <svg viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" focusable="false" style={{pointerEvents: 'none', display: 'block', width: '100%', height: '100%'}}><path fill="currentColor" d="M18.77,11h-4.23l1.52-4.94C16.38,5.03,15.54,4,14.38,4c-0.58,0-1.14,0.24-1.52,0.65L7,11H3v10h4h1h9.43 c1.06,0,1.98-0.67,2.19-1.61l1.34-6C21.23,12.15,20.18,11,18.77,11z M7,20H4v-8h3V20z M19.98,13.17l-1.34,6 C18.54,19.65,18.03,20,17.43,20H8v-8.61l5.6-6.06C13.79,5.12,14.08,5,14.38,5c0.26,0,0.5,0.11,0.63,0.3 c0.07,0.1,0.15,0.26,0.09,0.47l-1.52,4.94L13.18,12h1.35h4.23c0.41,0,0.8,0.17,1.03,0.46C19.92,12.61,20.05,12.86,19.98,13.17z"></path></svg>
            </button>
        </div>
      </div>
      <div className="video__description" style={{display: 'flex'}}>
        <div className="video__avatar"
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'flex-end',
            borderRadius: '50%',
            border: '1px solid blue',
            width: '30px',
            height: '30px',
            marginRight: '15px',
          }}>
          {video.avatar}
        </div>
        <div>
          <h5 className="video__title"
            style={{
              fontSize: '18px',
              fontWeight: 600,
              margin: '0 0 10px',
            }}>
            {video.title}
          </h5>
          <p className="video__channel"
            style={{
              color: 'grey',
              margin: '0 0 3px',
            }}>
            {video.channel.name}
          </p>
          <p className="video__meta"
            style={{
              color: 'grey',
              margin: 0,
              }}>
          {videoViews} • {videoAge}
          </p>
        </div>
      </div>
    </div>
  )
}