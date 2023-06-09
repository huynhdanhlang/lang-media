import { AppProps } from 'next/app';
import Head from 'next/head';
import './styles.css';
import '../public/static/index.css';
import { RecoilRoot } from 'recoil';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import dynamic from 'next/dynamic';
function CustomApp({ Component, pageProps }: AppProps) {
  const client = new ApolloClient({
    uri: `${process.env.NEXT_PUBLIC_BASE_API}/graphql`,
    cache: new InMemoryCache(),
  });
  const MyLayout = dynamic(() => import('../components/Layout'), {
    ssr: false,
  });

  if (typeof window === 'undefined') {
    return <></>;
  }
  return (
    <>
      <Head>
        <title>Welcome to frontend-admin!</title>
      </Head>
      <RecoilRoot>
        <ApolloProvider client={client}>
          <MyLayout>
            <Component {...pageProps} />
          </MyLayout>
        </ApolloProvider>
      </RecoilRoot>
    </>
  );
}

export default CustomApp;
