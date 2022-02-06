import { GetServerSideProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';

import { useTranslation } from 'next-i18next';
import { AppHeader } from 'components/app';

const Wallet = () => {
  const { t } = useTranslation('wallet');
  return (
    <>
      <Head>
        <title>{t('wallet.page-title')}</title>
      </Head>
      <AppHeader />
    </>
  );
};

export default Wallet;

// this should be on the page component/ parent component
export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: {
      ...(await serverSideTranslations((context.locale as string) || 'pt', [
        'common',
        'app-header',
        'wallet',
      ])),
    },
  };
};
