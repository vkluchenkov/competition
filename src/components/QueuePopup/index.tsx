import React from "react";
import { useState } from "react";
import { styles } from "./styles";
import clsx from "clsx";
import { QueueVideo } from "../QueueVideo/index";
import { useQueue } from "../../store/Queue";

export const QueuePopup: React.FC = () => {
  const [isOpened, setIsOpened] = useState(true);
  const [{ queue, activeVideo }] = useQueue();
  const activeVideoIndex = queue.findIndex(
    (video) => video.id === activeVideo?.id
  );

  if (!queue.length) {
    return null;
  }

  return (
    <figure
      css={styles.notification}
      onClick={() => setIsOpened(true)}
      className={clsx({ notification_state_opened: isOpened })}
    >
      <figcaption css={styles.notification__title}>Видео в очереди</figcaption>
      <div css={styles.notification__content}>
        Очередь • {activeVideoIndex + 1} / {queue.length}
      </div>
      <div
        css={styles.queue}
        className={clsx({ queue_visible: isOpened, queue_hidden: !isOpened })}
      >
        {queue.map((video) => (
          <QueueVideo video={video} />
        ))}
      </div>
      <div
        css={styles.close_button}
        onClick={(event) => {
          setIsOpened(false);
          event.stopPropagation();
        }}
        className={clsx({
          close_button_state_opened: isOpened,
          close_button_state_closed: !isOpened,
        })}
      >
        X
      </div>
    </figure>
  );
};
