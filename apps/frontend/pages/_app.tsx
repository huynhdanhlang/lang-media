import { AppProps } from 'next/app';
import Head from 'next/head';
import './styles.css';
import _JSXStyle from 'styled-jsx/style';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';

if (typeof global !== 'undefined') {
  Object.assign(global, { _JSXStyle });
}
const client = new ApolloClient({
  uri: 'http://localhost:3000/graphql',
  cache: new InMemoryCache(),
});
function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <Head>
        <title>Welcome to frontend!</title>
      </Head>
      <main className="app">
        <Component {...pageProps} />
      </main>
    </ApolloProvider>
  );
}

export default CustomApp;
