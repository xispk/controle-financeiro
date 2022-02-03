import { ReactElement, useEffect } from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import AppLayout from '../../components/app/AppLayout';
import Head from 'next/head';
import { useTranslation } from 'next-i18next';
import AuthProvider from '../../contexts/authContext';

const AppHome = () => {
  const { t } = useTranslation('app-index');

  return (
    <Head>
      <title>{t('app-index.page-title')}</title>
    </Head>
  );
};

export default AppHome;

AppHome.getLayout = function getLayout(page: ReactElement) {
  return (
    <AuthProvider>
      <AppLayout>{page}</AppLayout>
    </AuthProvider>
  );
};

// this should be on the page component/ parent component
export const getStaticProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...(await serverSideTranslations(locale, [
      'common',
      'app-header',
      'app-index',
    ])),
  },
});
