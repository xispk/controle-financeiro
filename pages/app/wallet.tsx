import { ReactElement } from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import AppLayout from '../../components/app/AppLayout';
import HeaderProvider from '../../components/app/store';

const Wallet = () => {
  return <h1>wallet page</h1>;
};

export default Wallet;

Wallet.getLayout = function getLayout(page: ReactElement) {
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
