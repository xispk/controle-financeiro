import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetServerSideProps } from 'next';

import Head from 'next/head';
import { useTranslation } from 'next-i18next';
import { AppHeader } from 'components/app';
import { User } from 'models';

const AppHome = ({ fallbackData }: { fallbackData: User }) => {
  const { t } = useTranslation('app-index');
  console.log(fallbackData);
  return (
    <>
      <Head>
        <title>{t('app-index.page-title')}</title>
      </Head>
      <AppHeader />
    </>
  );
};

export default AppHome;

// this should be on the page component/ parent component
export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: {
      ...(await serverSideTranslations(context.locale as string, [
        'common',
        'app-header',
        'app-index',
      ])),
    },
  };
};
