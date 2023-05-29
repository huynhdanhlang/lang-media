import { AppProps } from 'next/app';
import Head from 'next/head';
import './styles.css';
import MyLayout from '../components/Layout';
import '../public/static/index.css'

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Welcome to frontend-admin!</title>
      </Head>
      <main className="app">
        <MyLayout>
          <Component {...pageProps} />
        </MyLayout>
      </main>
    </>
  );
}

export default CustomApp;
