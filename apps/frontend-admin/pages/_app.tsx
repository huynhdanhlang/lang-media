import {
  ApolloClient,
  ApolloProvider,
  DefaultOptions,
  InMemoryCache
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';
import { createUploadLink } from 'apollo-upload-client';
import { AppProps } from 'next/app';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { RecoilRoot } from 'recoil';
import { GraphQLErrorCustom } from '../components/shared/error';
import { IUser } from '../components/shared/user';
import { RECOIL_PERSIST } from '../constant/keyStore.const';
import '../public/static/index.css';
import './styles.css';

function CustomApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const httpLink = createUploadLink({
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
    const user: IUser = JSON.parse(localStorage.getItem(RECOIL_PERSIST));
    // return the headers to the context so httpLink can read them
    return {
      headers: {
        ...headers,
        Authorization: `Bearer ${user?.userState?.accessToken}`,
        'Apollo-Require-Preflight': 'true',
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

  const NextNProgress = dynamic(() => import('nextjs-progressbar'), {
    ssr: false,
  });

  if (typeof window === 'undefined') {
    return <></>;
  }
  return (
    <>
      <Head>
        <title>Làng media admin</title>
      </Head>
      <RecoilRoot>
        <ApolloProvider client={client}>
          <AuthProvider>
            <MyLayout>
              <NextNProgress />
              <Component {...pageProps} key={router.asPath} />
            </MyLayout>
          </AuthProvider>
        </ApolloProvider>
      </RecoilRoot>
    </>
  );
}

export default CustomApp;
