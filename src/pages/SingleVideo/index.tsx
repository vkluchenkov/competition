/** @jsxImportSource @emotion/react */
import React, { useCallback, useState, useEffect } from "react";
import { css } from "@emotion/react";
import clsx from "clsx";
import { styles } from "./styles";
import { formatAge } from "../../helpers/formatAge";
import { formatViews } from "../../helpers/formatViews";
import { formatVideoDuration } from "../../helpers/formatVideoDuration";
import { useUser } from "../../store/User";
import { Video } from "../../models/video";
import { videos } from "../../videos";
import { useParams } from "react-router";
import { TextArea } from "../../ui-kit/textarea";
import { Button } from "../../ui-kit/button";

const getVideo = (videoId: string | undefined) => {
  const delay = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  const index = videos.findIndex((v: Video) => v.id === videoId);

  return delay(1500).then(() => videos[index]);
};

export const SingleVideo: React.FC = () => {
  const [video, setVideo] = useState<Video | null>(null);
  const [{ favorites }, { addFavorite, removeFavorite }] = useUser();

  const { videoId } = useParams();

  const fetchVideo = useCallback(async () => {
    const currentVideo = await getVideo(videoId);
    setVideo(currentVideo);
  }, [videoId]);

  useEffect(() => {
    fetchVideo();
  }, [fetchVideo]);

  const [comments, setComments] = useState<any[]>([])
  const [comment, setComment] = useState("")
  const commentHandle = (event: React.ChangeEvent<HTMLTextAreaElement>) =>
    setComment(event.target.value);

  const commentSubmit = (comment: string) => {
    setComments([...comments, comment])
  }

  const formSubmit = (event: any) => {
    event.preventDefault();
    commentSubmit(comment);
  };

  if (!video) {
    return <div>Loading...</div>;
  } else {
    const inFavorites = favorites.includes(video);
    const videoViews = formatViews(video.views);
    const videoAge = formatAge(video.createdAt);
    const videoDuration = formatVideoDuration(video.duration);

    const updateFavorites = () => {
      if (inFavorites) {
        removeFavorite(video);
      } else {
        addFavorite(video);
      }
    };

    console.log(comments)

    return (
      <section css={styles.section}>
        <img
          src={`.${video.image}`}
          alt={video.title}
          css={styles.single_video_img}
        ></img>

        <div css={styles.single_video_description}>
          <div css={styles.single_video_avatar}>{video.avatar}</div>
          <div css={styles.single_video_text}>
            <h1 css={styles.single_video_title}>{video.title}</h1>
            <p css={styles.single_video_channel}>{video.channel.name}</p>
            <p css={styles.single_video_meta}>
              {videoDuration} • {videoViews} • {videoAge}
            </p>
          </div>

          <button
            className={clsx({ single_video_action_active: inFavorites })}
            onClick={updateFavorites}
            css={styles.single_video_action}
          >
            <svg
              viewBox="0 0 24 24"
              preserveAspectRatio="xMidYMid meet"
              focusable="false"
              css={css`
                pointerevents: none;
                display: block;
                width: 100%;
                height: 100%;
              `}
            >
              <path d="M18.77,11h-4.23l1.52-4.94C16.38,5.03,15.54,4,14.38,4c-0.58,0-1.14,0.24-1.52,0.65L7,11H3v10h4h1h9.43 c1.06,0,1.98-0.67,2.19-1.61l1.34-6C21.23,12.15,20.18,11,18.77,11z M7,20H4v-8h3V20z M19.98,13.17l-1.34,6 C18.54,19.65,18.03,20,17.43,20H8v-8.61l5.6-6.06C13.79,5.12,14.08,5,14.38,5c0.26,0,0.5,0.11,0.63,0.3 c0.07,0.1,0.15,0.26,0.09,0.47l-1.52,4.94L13.18,12h1.35h4.23c0.41,0,0.8,0.17,1.03,0.46C19.92,12.61,20.05,12.86,19.98,13.17z"></path>
            </svg>
          </button>
        </div>
        <h2>
          Comments
        </h2>

        {comments.map((c) => {
          return <p>{c}</p>
        })}

        <form
          name="comment"
          id="comment"
          onSubmit={formSubmit}>
          <TextArea
            name="comment-form"
            id="comment-form"
            placeholder="Write your comment here"
            css={css`height: 100px`}
            onChange={commentHandle}
          ></TextArea>
          <Button type="submit" id="commentSubmit">
            Submit
          </Button>
        </form>
      </section>
    );
  }
};
