import '../styles/index.scss';
import { AppProps } from 'next/app';
import { appWithTranslation } from 'next-i18next';

const MyApp = ({ Component, pageProps }: AppProps) => {
  return <Component {...pageProps} />;
};

export default appWithTranslation(MyApp);
