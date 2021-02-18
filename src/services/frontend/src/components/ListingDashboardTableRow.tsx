import { centsToDollars } from '../utils/cents-to-dollars';
import Countdown from './Countdown';
import Link from 'next/link';

const ListingDashboardTableRow = ({ listing, onDelete }) => {
  return (
    <tr>
      <td className="px-6 py-4 whitespace-nowrap">
        <Link href={`/listings/${listing.slug}`}>
          <a className="hover:underline text-sm text-gray-900">
            {listing.title}
          </a>
        </Link>
        <div className="text-sm text-gray-500">
          Time Left: <Countdown expiresAt={listing.expiresAt} />
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {new Date(listing.createdAt).toLocaleDateString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {centsToDollars(listing.currentPrice)}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {centsToDollars(listing.startPrice)}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
          {listing.status}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
        <button
          onClick={onDelete}
          className="text-indigo-600 hover:text-indigo-900"
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

export default ListingDashboardTableRow;
