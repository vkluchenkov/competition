import React from "react";
import { Video } from "../models/video";

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
      let newActive = prev.activeVideo
      const ifInQueue = NewQueue.includes(video)
      const ifActive = video === prev.activeVideo
      const Index = NewQueue.indexOf(video)

      if (ifInQueue){
        NewQueue.splice(Index, 1)
        if (ifActive && !NewQueue.length) {
          // Если в очереди пусто^^ удаляем активное
          newActive = null
        }
        else if (ifActive && NewQueue.length === 1) {
        //   // Если в очереди есть 1 видео^^ назначаем его активным
          newActive = NewQueue[0]
        }
        else if (ifActive && NewQueue.length > 1 && Index > 0) {
          // Если в очереди осталось несколько видео до текущего^^ назначаем активным предыдущее
          newActive = NewQueue[Index - 1]
        }
        else {
          // Во всех остальных случаях назначаем активным следующее
          newActive = NewQueue[Index]
        }
      }

      return {
        ...prev,
        queue: NewQueue,
        activeVideo: newActive
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