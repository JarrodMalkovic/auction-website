import styled from '@emotion/styled';
import type { AppProps } from 'next/app';
import React, { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import xw from 'xwind/macro';

import buildClient from '../api/base-client';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import AppContext from '../context/app-context';
import '../styles/globals.css';

const StyledMyApp = styled.div(xw`
    flex 
    flex-col 
    h-screen 
    justify-between
`);

interface IProps extends AppProps {
  currentUser: any;
}

const MyApp = ({ Component, pageProps, currentUser }: IProps) => {
  const [auth, setAuth] = useState({
    isAuthenticated: !!currentUser,
    currentUser,
  });

  return (
    <AppContext.Provider
      value={{
        auth,
        setAuth,
      }}
    >
      <StyledMyApp>
        <Navbar />
        <div className="container mb-auto mx-auto max-w-7xl px-2 sm:px-4 lg:px-8">
          <Component {...pageProps} />
        </div>
        <Footer />
        <ToastContainer
          position="bottom-left"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </StyledMyApp>
    </AppContext.Provider>
  );
};

MyApp.getInitialProps = async (appContext) => {
  const client = buildClient(appContext.ctx);
  const { data } = await client.get('/api/auth/current-user');
  let pageProps = {};

  if (appContext.Component.getInitialProps) {
    pageProps = await appContext.Component.getInitialProps(
      appContext.ctx,
      client
    );
  }

  return { ...data, pageProps };
};

export default MyApp;
