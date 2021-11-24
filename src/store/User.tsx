import React from "react";
import { User } from "../models/user";
import { Video } from "../models/video";
import avatar from "../images/media.webp";

interface UserStore {
  currentUser: User | null;
  favorites: Video[];
}

interface UserStoreActions {
  setActiveUser: (user: User) => void;
  checkCredentials: (username: string, password: string) => void;
  removeActiveUser: () => void;
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
  });

  const checkCredentials: UserStoreActions["checkCredentials"] = (
    username,
    password
  ) => {
    const validUsername = "user@example.com";
    const validPassword = "pass";
    if (username === validUsername && password === validPassword) {
      setActiveUser({
        id: "001",
        username: "Vasya",
        email: "user@example.com",
        avatar: avatar,
      });
    } else {
      throw new Error("User not found");
    }
  };

  const setActiveUser: UserStoreActions["setActiveUser"] = (user) => {
    setState((prev) => {
      return {
        ...prev,
        currentUser: user,
      };
    });
  };

  const removeActiveUser: UserStoreActions["removeActiveUser"] = () => {
    setState((prev) => {
      return {
        ...prev,
        currentUser: null,
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
          checkCredentials,
          removeActiveUser,
          addFavorite,
          removeFavorite,
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
