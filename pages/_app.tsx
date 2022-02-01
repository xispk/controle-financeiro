import '../styles/index.scss';
import type { AppProps } from 'next/app';
import type { NextPage } from 'next';
import type { ReactElement } from 'react';

import { appWithTranslation } from 'next-i18next';

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactElement;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);

  return getLayout(<Component {...pageProps} />);
  // return <Component {...pageProps} />;
}

export default appWithTranslation(MyApp);
