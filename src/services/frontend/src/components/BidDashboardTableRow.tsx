import { ListingStatus } from '@jjmauction/common';
import axios from 'axios';
import Link from 'next/link';
import React, { useContext } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import { toast } from 'react-toastify';

import AppContext from '../context/app-context';
import { centsToDollars } from '../utils/cents-to-dollars';
import Countdown from './Countdown';

const BidDashboardTableRow = ({ bid, onDelete }) => {
  const { auth } = useContext(AppContext);

  const createPayment = async ({ id }) => {
    try {
      await axios.post('/api/payments', {
        listingId: bid.listing.id,
        token: id,
      });
      toast.success('Sucessfully signed in!');
    } catch (err) {
      err.response.data.errors.forEach((err) => toast.error(err.message));
    }
  };

  const requiresPayment = () => {
    return (
      bid.listing.status === ListingStatus.AwaitingPayment &&
      bid.listing.currentWinnerId === auth.currentUser.id
    );
  };

  return (
    <tr>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <div className="flex-shrink-0 h-10 w-10">
            <img
              className="h-10 w-10 rounded-full"
              src={bid.user.avatar}
              alt="Your Avatar"
            />
          </div>
          <div className="ml-4">
            <div className="text-sm font-medium text-gray-900">
              {bid.user.name}
            </div>
            <div className="text-sm text-gray-500">{bid.user.email}</div>
          </div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <Link href={`/listings/${bid.listing.slug}`}>
          <a className="hover:underline text-sm text-gray-900">
            {bid.listing.title}
          </a>
        </Link>
        <div className="text-sm text-gray-500">
          <Countdown expiresAt={bid.listing.expiresAt} />
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {centsToDollars(bid.amount)}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {centsToDollars(bid.listing.currentPrice)}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
          Active
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
        {requiresPayment() ? (
          <StripeCheckout
            token={createPayment}
            stripeKey="pk_test_51I7NJ5LQOU4SKz9IV9bdjUwPlGAb9UDKlwjKLxdmu52uQpPHfKn6KvpBIpEIIbI1XISEaFRmIpHgnpIGVFlwmKu300buDGjcwL"
          />
        ) : (
          <button
            onClick={onDelete}
            className="text-indigo-600 hover:text-indigo-900"
          >
            Delete
          </button>
        )}
      </td>
    </tr>
  );
};

export default BidDashboardTableRow;
