import { ReactElement } from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import AppLayout from '../../components/app/AppLayout';
import HeaderProvider from '../../components/app/store';
import Head from 'next/head';
import { useTranslation } from 'next-i18next';

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
    <HeaderProvider>
      <AppLayout>{page}</AppLayout>
    </HeaderProvider>
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
