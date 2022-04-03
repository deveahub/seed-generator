import type { AppProps } from 'next/app';
import Head from 'next/head';
import { RecoilRoot } from 'recoil';

import { Toasts } from '@/components/Toast';
import { withSWRConfig } from '@/pods/swr';
import { globalStyles } from '@/styles';

interface Props extends AppProps {
  pageProps: {
    fallback?: Record<string, unknown>;
  };
}

function App({ Component, pageProps: { fallback, ...pageProps } = {} }: Props) {
  globalStyles();

  const component = <Component {...pageProps} />;
  const enhancedComponent = fallback
    ? withSWRConfig(fallback, component)
    : component;

  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0,user-scalable=0"
        />
      </Head>
      <RecoilRoot>
        {enhancedComponent}
        <Toasts />
      </RecoilRoot>
    </>
  );
}

export default App;
