import axios from 'axios';
import { NextPageContext } from 'next';
import Head from 'next/head';
import React, { useContext, useState } from 'react';
import { toast } from 'react-toastify';

import DashboardBreadcrumbs from '../../components/DashboardBreadcrumbs';
import DashboardTabs from '../../components/DashboardTabs';
import Error from '../../components/ErrorMessage';
import ListingDashboardTableRow from '../../components/ListingDashboardTableRow';
import AppContext from '../../context/app-context';

const Sold = ({ listingsData }) => {
  const {
    auth: { isAuthenticated },
  } = useContext(AppContext);
  const [listings, setListings] = useState(listingsData);

  const onDelete = async (listingId) => {
    try {
      await axios.delete(`/api/listings/${listingId}`);
      setListings(listings.filter((listing) => listing.id !== listingId));
      toast.success('Sucessfully deleted listing!');
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
        <title>Sold Listings Dashboard | auctionweb.site</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <DashboardBreadcrumbs
        name="Sold Listings Dashboard"
        link="/dashboard/sold"
      />
      <section className="py-3">
        <h3 className="text-3xl leading-tight font-semibold font-heading">
          Sold Listings Dashboard
        </h3>
        <p className="mt-1 max-w-2xl text-l text-gray-500">
          See all the listings you have created that sold
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
                        Listing
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Created
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
                        Start Price
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Status
                      </th>
                      <th scope="col" className="relative px-6 py-3">
                        <span className="sr-only">Edit</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {listings.map((listing) => (
                      <ListingDashboardTableRow
                        listing={listing}
                        onDelete={() => onDelete(listing.id)}
                      />
                    ))}
                    {!listings.length && (
                      <p className="m-4 max-w-2xl text-l">
                        You have no sold listings.
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

Sold.getInitialProps = async (context: NextPageContext, client: any) => {
  try {
    const { data } = await client.get(`/api/listings/sold`);
    return { listingsData: data };
  } catch (err) {
    console.error(err);
    return { listingsData: [] };
  }
};

export default Sold;
