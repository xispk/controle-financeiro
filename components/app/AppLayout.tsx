import { ReactNode, useEffect } from 'react';
import AppHeader from './navbar/AppHeader';
import { useAuth, fetcher } from '../../contexts/authContext';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import Spinner from '../Spinner';

const AppLayout = ({ children }: { children: ReactNode }) => {
  const { accessToken, refreshToken } = useAuth();
  const router = useRouter();
  const { data, error } = useSWR(
    () =>
      accessToken
        ? [
            `${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}/api/users/getcurrentuser`,
            accessToken,
            refreshToken,
          ]
        : null,
    fetcher
  );

  useEffect(() => {
    if (error) {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      router.push('/auth/login');
    }
  }, [error]);

  if (!data || !accessToken || error) {
    return <Spinner />;
  }

  return (
    <>
      <AppHeader />
      {children}
    </>
  );
};

export default AppLayout;
