import BidDashboardTableRow from '../../components/BidDashboardTableRow';
import DashboardBreadcrumbs from '../../components/DashboardBreadcrumbs';
import DashboardTabs from '../../components/DashboardTabs';
import Error from '../../components/ErrorMessage';
import AppContext from '../../context/app-context';
import axios from 'axios';
import { NextPageContext } from 'next';
import Head from 'next/head';
import React, { useState, useContext } from 'react';
import { toast } from 'react-toastify';

const Bids = ({ bidsData }) => {
  const {
    auth: { isAuthenticated },
  } = useContext(AppContext);
  const [bids, setBids] = useState(bidsData);

  const onDelete = async (bidId) => {
    try {
      await axios.delete(`/api/bids/${bidId}`);
      setBids(bids.filter((bid) => bid.id !== bidId));
      toast.success('Sucessfully  deleted bid!');
    } catch (err) {
      err.response.data.errors.forEach((err) => toast.error(err.message));
    }
  };

  if (!isAuthenticated) {
    return (
      <Error
        error="Error 401"
        message="You must be logged in to view your dashboard."
      />
    );
  }

  return (
    <>
      <Head>
        <title>Bids Dashboard | auctionweb.site</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <DashboardBreadcrumbs name="Your Bids Dashboard" link="/dashboard/bids" />
      <section className="py-3">
        <h3 className="text-3xl leading-tight font-semibold font-heading">
          Bids Dashboard
        </h3>
        <p className="mt-1 max-w-2xl text-l text-gray-500">
          See all the listings you have placed bids on
        </p>
        <DashboardTabs />
        <div className="flex flex-col mt-3">
          <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
              <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Seller
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Listing
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Bid Amount
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Current Price
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Status
                      </th>
                      <th scope="col" className="relative px-6 py-3">
                        <span className="sr-only">Delete</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {bids.map((bid) => (
                      <BidDashboardTableRow
                        key={bid.id}
                        bid={bid}
                        onDelete={() => onDelete(bid.id)}
                      />
                    ))}
                    {!bids.length && (
                      <p className="m-4 max-w-2xl text-l">
                        You have placed no bids.
                      </p>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

Bids.getInitialProps = async (context: NextPageContext, client: any) => {
  try {
    const { data } = await client.get(`/api/bids`);
    return { bidsData: data };
  } catch (err) {
    console.error(err);
    return { bidsData: null };
  }
};

export default Bids;
