import styled from '@emotion/styled';
import axios from 'axios';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { NextPageContext } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import io from 'socket.io-client';
import xw from 'xwind/macro';
import * as Yup from 'yup';

import Breadcrumb from '../../components/Breadcrumb';
import Breadcrumbs from '../../components/Breadcrumbs';
import Countdown from '../../components/Countdown';
import Error from '../../components/ErrorMessage';
import { centsToDollars } from '../../utils/cents-to-dollars';

const StyledListing = styled.div(xw`
	flex 
	flex-wrap 
	-mx-8 
`);

const StyledTextContent = styled.div(xw`
	lg:w-1/2 
	px-8 
	lg:mt-0 
  w-full
	order-2 
	lg:order-none
`);

const StyledTable = styled.table(xw`
	w-full 
	mb-6
`);

const StyledTableRow = styled.tr(xw`
	border-t
`);

const StyledTableRowName = styled.td(xw`
	py-3 
	font-medium 
	text-gray-700
`);

const StyledTableRowValue = styled.td(xw`
	text-right 
	max-w-2xl 
	text-gray-500
`);

const StyledAnchorTableRowValue = styled.td(xw`
	text-right 
	max-w-2xl 
  hover:underline
  cursor-pointer
	text-gray-500
`);

const StyledImgContainer = styled.div(xw`
	lg:w-1/2 
	px-8
`);

const StyledImg = styled.img(xw`
	mb-4 
	rounded 
	shadow
`);

const StyledErrorMessage = styled.div(xw`
    text-sm
    text-red-600
    my-0.5
`);

const Listing = ({ listingData }) => {
  const [listing, setListing] = useState(listingData);
  const [isBidding, setIsBidding] = useState(false);

  useEffect(() => {
    const room = listing && listing.slug;
    if (!room) return;

    const socket = io('/socket', {
      secure: false,
      query: `r_var=${room}`,
    });

    socket.emit('join');

    socket.on('bid', (data) => {
      setListing(data);
    });

    socket.on('bid-deleted', (data) => {
      setListing(data);
    });

    socket.on('listing-deleted', (data) => {
      setListing(data);
    });

    return () => socket.emit('unsubscribe', room);
  }, []);

  const onSubmit = async (body) => {
    setIsBidding(true);

    try {
      await axios.post(`/api/bids/${listing.id}`, {
        amount: body.amount * 100,
      });
      toast.success('Sucessfully placed bid!');
    } catch (err) {
      err.response.data.errors.forEach((err) => toast.error(err.message));
    }

    setIsBidding(false);
  };

  if (!listing) {
    return (
      <>
        <Error
          error="Error 404"
          message="Our server couldn't find that listing. It may have been deleted or there is a mispelling in the URL"
        />
      </>
    );
  }

  const validationSchema = Yup.object({
    amount: Yup.string()
      .matches(
        /^\s*-?(\d+(\.\d{1,2})?|\.\d{1,2})\s*$/,
        'The start price must be a number with at most 2 decimals'
      )
      .required('Required'),
  });

  return (
    <>
      <Head>
        <title>{listing.title} | auctionweb.site</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Breadcrumbs>
        <Breadcrumb link="/" name="Home" />
        <Breadcrumb link="/listings" name="Browse Listings" />
        <Breadcrumb link="/listings" name={listing.title} />
      </Breadcrumbs>
      <StyledListing>
        <StyledTextContent>
          <section className="py-3 mb-3">
            <h3 className="text-3xl leading-tight font-semibold font-heading">
              {listing.title}
            </h3>
            <p className="mt-1 max-w-2xl text-l text-gray-500">
              {listing.description}
            </p>
          </section>
          <StyledTable>
            <tbody>
              <StyledTableRow>
                <StyledTableRowName>Price</StyledTableRowName>
                <StyledTableRowValue>
                  {centsToDollars(listing.currentPrice)}
                </StyledTableRowValue>
              </StyledTableRow>
              <StyledTableRow>
                <StyledTableRowName>Seller</StyledTableRowName>
                <Link href={`/profile/${listing.user.name}`}>
                  <StyledAnchorTableRowValue>
                    {listing.user.name}
                  </StyledAnchorTableRowValue>
                </Link>
              </StyledTableRow>
              <StyledTableRow>
                <StyledTableRowName>Time Left</StyledTableRowName>
                <StyledTableRowValue>
                  <Countdown expiresAt={listing.expiresAt} />
                </StyledTableRowValue>
              </StyledTableRow>
            </tbody>
          </StyledTable>
          <Formik
            initialValues={{
              amount: '',
            }}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            <Form>
              <div className="mt-1 flex rounded-md shadow-sm">
                <div className="relative flex items-stretch flex-grow focus-within:z-10">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 sm:text-sm">$</span>
                  </div>
                  <Field
                    type="text"
                    name="amount"
                    className="focus:ring-indigo-500 focus:border-indigo-500 block w-full rounded-none rounded-l-md pl-7 sm:text-sm border-gray-300"
                    placeholder="Amount to bid"
                  />
                </div>
                <button
                  type="submit"
                  className="-ml-px relative inline-flex items-center space-x-2 px-4 py-2 border border-gray-300 text-sm font-medium rounded-r-md text-gray-700 bg-gray-50 hover:bg-gray-100 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                >
                  {isBidding ? 'Placing bid...' : 'Bid now!'}
                </button>
              </div>
              <ErrorMessage component={StyledErrorMessage} name="amount" />
            </Form>
          </Formik>
        </StyledTextContent>
        <StyledImgContainer>
          <StyledImg src={listing.largeImage} alt="Product Image" />
        </StyledImgContainer>
      </StyledListing>
    </>
  );
};

Listing.getInitialProps = async (context: NextPageContext, client: any) => {
  try {
    const { listingSlug } = context.query;
    const { data } = await client.get(`/api/listings/${listingSlug}`);
    return { listingData: data };
  } catch (err) {
    console.error(err);
    return { listingData: null };
  }
};

export default Listing;
