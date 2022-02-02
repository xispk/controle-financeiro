import type { NextPage } from 'next';
import Link from 'next/link';
import Head from 'next/head';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';

const Home: NextPage = () => {
  const { t } = useTranslation();
  return (
    <div className='container'>
      <Head>
        <title>{t('landing.page-title')}</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Link href='/app'>Ir para o app</Link>
    </div>
  );
};

export default Home;

export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
}
