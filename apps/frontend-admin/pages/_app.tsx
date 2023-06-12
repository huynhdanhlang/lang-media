import { AppProps } from 'next/app';
import Head from 'next/head';
import './styles.css';
import '../public/static/index.css';
import { RecoilRoot } from 'recoil';
import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  DefaultOptions,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import dynamic from 'next/dynamic';
import { RECOIL_PERSIST, USER_STATE } from '../constant/keyStore.const';
import { UserEntity } from '@training-project/data-access';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { onError } from '@apollo/client/link/error';
import { GraphQLErrorCustom } from '../components/shared/error';
import { IUser } from '../components/shared/user';

function CustomApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const httpLink = createHttpLink({
    uri: `${process.env.NEXT_PUBLIC_BASE_API}/graphql`,
  });

  const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors)
      graphQLErrors.forEach(
        ({ message, locations, path, extensions }: GraphQLErrorCustom) => {
          if (extensions?.originalError?.statusCode === 401) {
            localStorage.removeItem(RECOIL_PERSIST);
            router.replace(router.asPath, '/login');
            router.reload();
          }
          console.log(
            `[GraphQL error]: Message: ${message}, Location: ${JSON.stringify(
              locations
            )}, Path: ${path}`
          );
        }
      );
    if (networkError) console.log(`[Network error]: ${networkError}`);
  });

  const authLink = setContext((_, { headers }) => {
    // get the authentication token from local storage if it exists
    const user: IUser = JSON.parse(
      localStorage.getItem(RECOIL_PERSIST)
    );
    // return the headers to the context so httpLink can read them
    return {
      headers: {
        ...headers,
        Authorization: `Bearer ${user?.userState?.accessToken}`,
      },
    };
  });

  const defaultOptions: DefaultOptions = {
    watchQuery: {
      fetchPolicy: 'no-cache',
    },
    query: {
      fetchPolicy: 'no-cache',
    },
  };
  const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: authLink.concat(errorLink).concat(httpLink),
    defaultOptions,
  });
  const MyLayout = dynamic(() => import('../components/layout/Layout'), {
    ssr: false,
  });

  const AuthProvider = dynamic(
    () => import('../components/auth/AuthProvider'),
    {
      ssr: false,
    }
  );

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
          <AuthProvider>
            <MyLayout>
              <Component {...pageProps} key={router.asPath} />
            </MyLayout>
          </AuthProvider>
        </ApolloProvider>
      </RecoilRoot>
    </>
  );
}

export default CustomApp;
