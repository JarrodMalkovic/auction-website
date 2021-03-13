import styled from '@emotion/styled';
import Head from 'next/head';
import React from 'react';
import xw from 'xwind/macro';

import Breadcrumb from '../../components/Breadcrumb';
import Breadcrumbs from '../../components/Breadcrumbs';
import ListingCard from '../../components/ListingCard';

const StyledListings = styled.div(xw`
	py-3
	flex 
	flex-wrap 
	-mx-2 
	-mb-4
`);

const Listings = ({ listings, search }) => {
  return (
    <>
      <Head>
        <title> Browsing Listings | auctionweb.site</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Breadcrumbs>
        <Breadcrumb link="/" name="Home" />
        <Breadcrumb link="/listings" name="Browse Listings" />
      </Breadcrumbs>
      <section className="pt-3 mb-3">
        <h3 className="text-3xl leading-tight font-semibold font-heading">
          Showing {!search ? 'all listings' : `results for "${search}"`}
        </h3>
        <p className="mt-1 max-w-2xl text-l text-gray-500">
          {listings.length
            ? `Showing ${listings.length} results of ${listings.length}`
            : `Found no results`}
        </p>
      </section>
      <StyledListings>
        {listings.map((listing, idx) => (
          <ListingCard
            key={idx}
            name={listing.title}
            expiresAt={listing.expiresAt}
            price={listing.currentPrice}
            smallImage={listing.smallImage}
            slug={`/listings/${listing.slug}`}
          />
        ))}
      </StyledListings>
    </>
  );
};

Listings.getInitialProps = async ({ query }, client) => {
  const { data } = await client.get(
    `/api/listings?search=${query.search || ''}`
  );

  return { listings: data || [], search: query.search };
};

export default Listings;
