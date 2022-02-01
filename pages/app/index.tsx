import { ReactElement } from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import AppLayout from '../../components/app/AppLayout';
import HeaderProvider from '../../components/app/store';

const AppHome = () => {
  return <h1>home page</h1>;
};

export default AppHome;

AppHome.getLayout = function getLayout(page: ReactElement) {
  return (
    <HeaderProvider>
      <AppLayout>{page}</AppLayout>
    </HeaderProvider>
  );
};

// this should be on the page component/ parent component
export const getStaticProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common', 'app-header'])),
  },
});
