/** @jsxImportSource @emotion/react */
import React from "react";
import { Navigate } from "react-router-dom";
import { useUser } from "../../store/User";

export const Main = () => {
  const [{ currentUser }] = useUser();
  return currentUser ? <Navigate to="/my-festivals" /> : <Navigate to="/login" />
};
