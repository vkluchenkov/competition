/** @jsxImportSource @emotion/react */
import React from "react";
import { Navigate } from "react-router-dom";
import { EventsList } from "../../components/EventsList";
import { useUser } from "../../store/User";
import { Login } from "../Login";
import { styles } from "./styles";

export const Main = () => {
  const [{ currentUser }, { }] = useUser();
  return currentUser ? <Navigate to="/my-festivals" /> : <Navigate to="/login" />
};
