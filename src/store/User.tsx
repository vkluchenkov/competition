import React from "react";
import { User } from "../models/user"

interface UserStore {
  CurrentUser: User | null
}

interface UserStoreActions {
  setActiveUser: (user: User) => void;
  removeActiveUser: () => void;
}

export const ActiveUser = React.createContext<[UserStore, UserStoreActions] | null>(null)

export const UserProvider: React.FC = ({ children }) => {
  const [state, setState] = React.useState<UserStore>({
    CurrentUser: null
  });

  const setActiveUser:UserStoreActions['setActiveUser'] = (user) => {
    setState({CurrentUser: user})
  }

  const removeActiveUser:UserStoreActions['removeActiveUser'] = () => {
    setState({CurrentUser: null})
  }

  return (
    <ActiveUser.Provider value={[
      state,
      {
        setActiveUser,
        removeActiveUser
      }
    ]}>
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