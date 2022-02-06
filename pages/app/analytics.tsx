import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';
import { GetServerSideProps } from 'next';
import { useTranslation } from 'next-i18next';

import { AppHeader } from 'components/app';

const Analytics = () => {
  const { t } = useTranslation('analytics');
  return (
    <>
      <Head>
        <title>{t('analytics.page-title')}</title>
      </Head>
      <AppHeader />
    </>
  );
};

export default Analytics;

// this should be on the page component/ parent component
export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: {
      ...(await serverSideTranslations(context.locale as string, [
        'common',
        'app-header',
        'analytics',
      ])),
    },
  };
};
