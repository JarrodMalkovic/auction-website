import Head from 'next/head';
import React from 'react';

const ErrorMessage = ({ error, message }) => {
  return (
    <>
      <Head>
        <title>{error} | auctionweb.site</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <section className="py-3">
        <div className="container px-4 mx-auto text-center">
          <img
            className="mb-4 mx-auto md:max-w-md mb-12"
            src="https://shuffle.dev/metis-assets/illustrations/error2.png"
            alt=""
          />
          <span className="text-4xl text-indigo-600 font-bold font-heading">
            {error}
          </span>
          <h2 className="mb-2 text-4xl font-bold font-heading">
            Something went wrong!
          </h2>
          <p className="mb-6 text-blueGray-400">{message}</p>
          <div>
            <a className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Go back to Homepage
            </a>
          </div>
        </div>
      </section>
    </>
  );
};

export default ErrorMessage;
