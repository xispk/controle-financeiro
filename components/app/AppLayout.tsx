import type { ReactNode } from 'react';
import AppHeader from './navbar/AppHeader';

const AppLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <AppHeader />
      {children}
    </>
  );
};

export default AppLayout;
