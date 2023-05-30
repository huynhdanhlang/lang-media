import { AppProps } from 'next/app';
import Head from 'next/head';
import './styles.css';
import MyLayout from '../components/Layout';
import '../public/static/index.css';
import { RecoilRoot } from 'recoil';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
function CustomApp({ Component, pageProps }: AppProps) {
  const client = new ApolloClient({
    uri: 'http://localhost:3000/graphql',
    cache: new InMemoryCache(),
  });
  return (
    <>
      <Head>
        <title>Welcome to frontend-admin!</title>
      </Head>
      <RecoilRoot>
        <ApolloProvider client={client}>
          <main className="app">
            <MyLayout>
              <Component {...pageProps} />
            </MyLayout>
          </main>
        </ApolloProvider>
      </RecoilRoot>
    </>
  );
}

export default CustomApp;
