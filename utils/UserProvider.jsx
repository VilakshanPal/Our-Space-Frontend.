"use client";

import { createContext, useContext } from "react";

const UserContext = createContext(null);

export function UserProvider({ children, user }) {
  return (
    <UserContext.Provider value={user}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const user = useContext(UserContext);

  if (!user) {
    throw new Error("useUser must be used inside UserProvider");
  }

  return user;
}