
import React from "react";
import { Navigate, Route, RouteProps } from "react-router-dom";

export const AuthRoute = ({ children }: RouteProps) => {
  const isAuth = useAuth();

  return (
    <Route
      render={() =>
        isAuth ? (
          <Navigate
            to={{
              pathname: "/",
            }}
          />
        ) : (
          children
        )
      }
    />
  );
};
