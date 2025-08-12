"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  PropsWithChildren,
} from "react";
import type { User } from "../types/user";

type AuthContextType = {
  user: User | null;
  login: (u: User) => void;
  logout: () => void;
  isLoading: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // اضافه کردن تاخیر کوچک برای جلوگیری از hydration mismatch
    const timer = setTimeout(() => {
      try {
        if (typeof window !== "undefined") {
          const raw = localStorage.getItem("user");
          if (raw) {
            const parsedUser = JSON.parse(raw);
            setUser(parsedUser);
          }
        }
      } catch (err) {
        console.error("Failed to parse user from localStorage", err);
        // پاک کردن localStorage در صورت خطا
        if (typeof window !== "undefined") {
          localStorage.removeItem("user");
        }
      } finally {
        setIsLoading(false);
      }
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  const login = (u: User) => {
    setUser(u);
    if (typeof window !== "undefined") {
      localStorage.setItem("user", JSON.stringify(u));
    }
  };

  const logout = () => {
    setUser(null);
    if (typeof window !== "undefined") {
      localStorage.removeItem("user");
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuthContext must be used within AuthProvider");
  }
  return ctx;
};
