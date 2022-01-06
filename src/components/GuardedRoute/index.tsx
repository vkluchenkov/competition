import React, { ReactElement } from "react";
import { Route, Navigate } from "react-router-dom";
import { useUser } from "../../store/User";

interface GuardedRouteProps {
  children: any;
}

const GuardedRoute: React.FC<GuardedRouteProps> = ({ children }) => {
  const [{ currentUser }, { }] = useUser();
  return currentUser ? children : <Navigate to="/login" />
}

export default GuardedRoute;