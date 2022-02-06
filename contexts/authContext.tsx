import { useState, createContext, useContext, useEffect } from 'react';
import type { ReactElement } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

interface User {
  _id: string;
  name: string;
  username: string;
  account: string;
  role: string;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
  iat: number;
  exp: number;
}

interface AuthContext {
  user: User | null;
  setUser: Function;
}

const AuthContext = createContext<AuthContext>({
  user: null,
  setUser: () => false,
});

export const fetcher = (url: string, headers = {}) =>
  axios
    .get(url, {
      withCredentials: true,
      headers,
    })
    .then((res) => res.data);

const AuthProvider = ({ children }: { children: ReactElement }) => {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  const values = {
    user,
    setUser,
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);

export default AuthProvider;
