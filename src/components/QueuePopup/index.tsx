/** @jsxImportSource @emotion/react */
import React from 'react';
import { useState } from "react";
import { css } from "@emotion/react";
import { styles } from './styles';
import clsx from "clsx";
import { QueueVideo } from '../QueueVideo/index';
import { videos } from '../../videos';

export const QueuePopup: React.FC = () => {
  const activeVideoInd: number = 0
  const queueCount: number = 0
  const [isOpened, setIsOpened] = useState(false);

  return (
    <figure
    css={styles.notification}
    onClick={() =>setIsOpened(true)}
    className={clsx({notification_state_opened: isOpened})}
    >
      <figcaption css={styles.notification__title}>
        Видео в очереди
      </figcaption>
      <div css={styles.notification__content}>
        Очередь • {activeVideoInd} / {queueCount}
      </div>
      <div
        css={styles.queue}
        className={clsx({queue_visible: isOpened, queue_hidden: !isOpened})}
        >
          <QueueVideo video={videos[0]} onClick={() => {console.log('queue click')}} />
      </div>
      <div
        css={styles.close_button}
        onClick={(event) => {
          setIsOpened(false)
          event.stopPropagation()
        }}
        className={clsx({close_button_state_opened: isOpened, close_button_state_closed: !isOpened})}
      >
        X
      </div>
    </figure>
  )
}