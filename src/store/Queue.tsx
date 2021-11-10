import React from "react";
import { videos } from "../videos";
import { Video } from "../models/video";
import { QueueVideo } from "../components/QueueVideo";

interface QueueStore {
  queue: Video[]
  activeVideo: Video | null
}

interface QueueStoreActions {
  addVideo: (video:Video) => void;
  removeVideo: (video:Video) => void;
  setActiveVideo: (video:Video) => void;
}

export const Queue = React.createContext<[QueueStore, QueueStoreActions] | null>(null)

export const QueueProvider: React.FC = ({ children }) => {
  const [state, setState] = React.useState<QueueStore>({
    queue: [],
    activeVideo: null
  });

  const addVideo:QueueStoreActions['addVideo'] = (video) => {
    setState((prev) => {
      const newQueue = prev.queue.slice()
      newQueue.push(video)
      return {
        ...prev,
        queue: newQueue
      }
    })
  }

  const removeVideo:QueueStoreActions['removeVideo'] = (video) => {
    setState((prev) => {
      const NewQueue = prev.queue.slice()
      const ifInQueue = NewQueue.includes(video)
      const Index = NewQueue.indexOf(video)

      if (ifInQueue){
        NewQueue.splice(Index, 1)
      }

      return {
        ...prev,
        queue: NewQueue
      }
    })
  }

  const setActiveVideo:QueueStoreActions['setActiveVideo'] = (video) => {
    setState((prev) => {
      return {
        ...prev,
        activeVideo: video
      }
    })
  }

  return (
    <Queue.Provider value={[
      state,
      {
        addVideo,
        removeVideo,
        setActiveVideo
      }
    ]}>
      {children}
    </Queue.Provider>
  );
};

export const useQueue = () => {
  const store = React.useContext(Queue);

  if (!store) {
    throw new Error("useQueue must be used within a Queue");
  }

  return store;
};