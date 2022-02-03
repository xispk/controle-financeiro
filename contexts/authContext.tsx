import { useState, createContext, useContext, useEffect } from 'react';
import type { ReactElement } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import useSWR from 'swr';

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
  accessToken: string | null;
  refreshToken: string | null;
}

const AuthContext = createContext<AuthContext>({
  accessToken: null,
  refreshToken: null,
});

export const fetcher = (url: string, token: string) =>
  axios
    .get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.data);

const AuthProvider = ({ children }: { children: ReactElement }) => {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');
    if (accessToken && refreshToken) {
      setAccessToken(localStorage.getItem('accessToken'));
      setRefreshToken(localStorage.getItem('refreshToken'));
    } else {
      router.push('/auth/login');
    }
  }, []);

  const values = {
    accessToken,
    refreshToken,
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);

export default AuthProvider;
