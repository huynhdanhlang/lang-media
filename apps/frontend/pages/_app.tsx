import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { AppProps } from 'next/app';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import _JSXStyle from 'styled-jsx/style';
import 'video.js/dist/video-js.css';
import './styles.css';
import { RecoilRoot } from 'recoil';
if (typeof global !== 'undefined') {
  Object.assign(global, { _JSXStyle });
}
const client = new ApolloClient({
  uri: `${process.env.NEXT_PUBLIC_BASE_API}/graphql`,
  cache: new InMemoryCache(),
});
function CustomApp({ Component, pageProps }: AppProps) {
  const LayoutCPN = dynamic(() => import('../layout/Layout'), {
    ssr: false,
  });
  return (
    <ApolloProvider client={client}>
      <Head>
        <title>Welcome to Làng Media</title>
      </Head>
      <RecoilRoot>
        <LayoutCPN>
          <Component {...pageProps} />
        </LayoutCPN>
      </RecoilRoot>
    </ApolloProvider>
  );
}

export default CustomApp;
