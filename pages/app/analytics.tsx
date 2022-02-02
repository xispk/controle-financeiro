import { ReactElement } from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';

import AppLayout from '../../components/app/AppLayout';
import HeaderProvider from '../../components/app/store';
import { useTranslation } from 'next-i18next';

const Analytics = () => {
  const { t } = useTranslation('analytics');
  return (
    <Head>
      <title>{t('analytics.page-title')}</title>
    </Head>
  );
};

export default Analytics;

Analytics.getLayout = function getLayout(page: ReactElement) {
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
      'analytics',
    ])),
  },
});
