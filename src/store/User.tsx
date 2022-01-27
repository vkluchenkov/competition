import React, { useEffect } from "react";
import { User } from "../models/user";
import { Video } from "../models/video";
import { getUserData } from "../api"

interface UserStore {
  currentUser: User | null;
  favorites: Video[];
  authToken: string;
}

interface UserStoreActions {
  setActiveUser: (user: User) => void;
  removeActiveUser: () => void;
  setAuthToken: (token: string) => void;
  addFavorite: (video: Video) => void;
  removeFavorite: (video: Video) => void;
}

export const ActiveUser = React.createContext<
  [UserStore, UserStoreActions] | null
>(null);

export const UserProvider: React.FC = ({ children }) => {
  const [state, setState] = React.useState<UserStore>({
    currentUser: null,
    favorites: [],
    authToken: '',
  });

  const localStorage = window.localStorage;

  const setUser = async () => {
    try {
      const userData = await getUserData()
      setActiveUser({
        id: userData.id,
        email: userData.email,
        name: userData.name,
        birthDate: userData.birthDate,
      })
    } catch (error: any) {
      if (error?.response?.status === 401) {
        removeActiveUser()
      }
    }
  }

  // Восстановление сессии для вернувшихся юзеров
  useEffect(() => {
    if (localStorage.jwt) {
      setAuthToken(localStorage.jwt)
    }
  }, [])

  useEffect(() => {
    if (!state.authToken) {
      localStorage.removeItem('jwt')
    } else {
      localStorage.setItem('jwt', state.authToken)
      setUser();
    }
  }, [state.authToken])

  const setAuthToken: UserStoreActions["setAuthToken"] = (token) => {
    setState((prev) => {
      return {
        ...prev,
        authToken: token,
      };
    })
  }

  const setActiveUser: UserStoreActions["setActiveUser"] = (user) => {
    setState((prev) => {
      return {
        ...prev,
        currentUser: user,
      };
    });
  };

  const removeActiveUser: UserStoreActions["removeActiveUser"] = () => {
    localStorage.removeItem('jwt')
    setState((prev) => {
      return {
        ...prev,
        currentUser: null,
        authToken: '',
      };
    });
  };

  const addFavorite: UserStoreActions["addFavorite"] = (video) => {
    setState((prev) => {
      const newFavorites = prev.favorites.slice();
      newFavorites.push(video);
      return {
        ...prev,
        favorites: newFavorites,
      };
    });
  };

  const removeFavorite: UserStoreActions["removeFavorite"] = (video) => {
    setState((prev) => {
      const newFavorites = prev.favorites.slice();
      const ifInFavorites = newFavorites.includes(video);
      const Index = newFavorites.indexOf(video);

      if (ifInFavorites) {
        newFavorites.splice(Index, 1);
      }

      return {
        ...prev,
        favorites: newFavorites,
      };
    });
  };

  return (
    <ActiveUser.Provider
      value={[
        state,
        {
          setActiveUser,
          removeActiveUser,
          addFavorite,
          removeFavorite,
          setAuthToken,
        },
      ]}
    >
      {children}
    </ActiveUser.Provider>
  );
};

export const useUser = () => {
  const store = React.useContext(ActiveUser);

  if (!store) {
    throw new Error("useUser must be used within a User");
  }

  return store;
};
