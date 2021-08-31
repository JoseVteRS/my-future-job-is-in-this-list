import { AppProps } from 'next/app';
import { ApolloProvider } from '@apollo/client';
import '../styles/global.css';
import client from '../config/apollo/apollo-client';
import MainLayout from '../layouts/MainLayout';

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <ApolloProvider client={client}>
        <MainLayout>
          <Component {...pageProps} />
        </MainLayout>
      </ApolloProvider>
    </>
  );
}

export default CustomApp;
