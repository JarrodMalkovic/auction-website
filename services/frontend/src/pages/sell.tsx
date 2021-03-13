import styled from '@emotion/styled';
import axios from 'axios';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import Head from 'next/head';
import Router from 'next/router';
import React, { useContext, useState } from 'react';
import { toast } from 'react-toastify';
import xw from 'xwind/macro';
import * as Yup from 'yup';

import Breadcrumb from '../components/Breadcrumb';
import Breadcrumbs from '../components/Breadcrumbs';
import DatePicker from '../components/DatePicker';
import Error from '../components/ErrorMessage';
import ImageUpload from '../components/ImageUpload';
import AppContext from '../context/app-context';

const StyledErrorMessage = styled.div(xw`
    text-sm
    text-red-600
    my-0.5
`);

const validationSchema = Yup.object({
  title: Yup.string()
    .max(15, 'Must be 15 characters or less')
    .required('Required'),
  description: Yup.string()
    .max(5000, 'Must be 5000 characters or less')
    .required('Required'),
  image: Yup.mixed().required('Required'),
  price: Yup.string()
    .matches(
      /^\s*-?(\d+(\.\d{1,2})?|\.\d{1,2})\s*$/,
      'The start price must be a number with at most 2 decimals'
    )
    .required('Required'),
  expiresAt: Yup.date()
    .required('Required')
    .min(
      new Date(Date.now() + 86400000),
      'Auctions must last atleast 24 hours'
    ),
});

const Sell = () => {
  const {
    auth: { isAuthenticated },
  } = useContext(AppContext);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (body) => {
    setIsSubmitting(true);

    try {
      body.price *= 100;
      const formData = new FormData();
      Object.keys(body).forEach((key) => formData.append(key, body[key]));
      const { data } = await axios.post('/api/listings', formData);
      toast.success('Sucessfully listed item for sale!');
      Router.push(`/listings/${data.slug}`);
    } catch (err) {
      err.response.data.errors.forEach((err) => toast.error(err.message));
    }

    setIsSubmitting(false);
  };

  if (!isAuthenticated) {
    return (
      <Error
        error="Error 401"
        message="You must be logged in to sell an item."
      />
    );
  }

  return (
    <>
      <Head>
        <title>Sell an Item | auctionweb.site</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Breadcrumbs>
        <Breadcrumb link="/" name="home" />
        <Breadcrumb link="/sell" name="Sell an Item" />
      </Breadcrumbs>
      <section className="py-3">
        <h3 className="text-3xl leading-tight font-semibold font-heading">
          Create Listing
        </h3>
        <p className="mt-1 max-w-2xl text-l text-gray-500">
          Put an item up for auction
        </p>
        <Formik
          initialValues={{
            title: '',
            description: '',
            price: '',
            expiresAt: '',
            image: '',
          }}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {(props) => (
            <Form className="space-y-8 py-5 divide-y divide-gray-200">
              <div className="space-y-8 divide-y divide-gray-200 sm:space-y-5">
                <div className="space-y-6 sm:space-y-5">
                  <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                    <label
                      htmlFor="title"
                      className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                    >
                      Title
                    </label>
                    <div className="mt-1 sm:mt-0 sm:col-span-2">
                      <Field
                        type="text"
                        name="title"
                        className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-4xl sm:text-sm border-gray-300 rounded-md"
                      />
                      <ErrorMessage
                        component={StyledErrorMessage}
                        name="title"
                      />
                    </div>
                  </div>

                  <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                    <label
                      htmlFor="description"
                      className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                    >
                      Description
                    </label>
                    <div className="mt-1 sm:mt-0 sm:col-span-2">
                      <Field
                        as="textarea"
                        name="description"
                        rows={6}
                        className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-4xl sm:text-sm border-gray-300 rounded-md"
                      />
                      <ErrorMessage
                        component={StyledErrorMessage}
                        name="description"
                      />
                    </div>
                  </div>

                  <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                    <label
                      htmlFor="image"
                      className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                    >
                      Image
                    </label>
                    <div className="mt-1 sm:mt-0 sm:col-span-2">
                      <ImageUpload
                        name="image"
                        setFieldValue={props.setFieldValue}
                        className="block max-w-lg w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500  sm:max-w-4xl sm:text-sm border-gray-300 rounded-md"
                      />
                      <ErrorMessage
                        component={StyledErrorMessage}
                        name="image"
                      />
                    </div>
                  </div>

                  <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                    <label
                      htmlFor="price"
                      className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                    >
                      Start Price
                    </label>
                    <div className="mt-1 sm:mt-0 sm:col-span-2">
                      <Field
                        type="text"
                        name="price"
                        className="block max-w-lg w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500  sm:max-w-4xl sm:text-sm border-gray-300 rounded-md"
                      />
                      <ErrorMessage
                        component={StyledErrorMessage}
                        name="price"
                      />
                    </div>
                  </div>

                  <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                    <label
                      htmlFor="endDate"
                      className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                    >
                      End Date
                    </label>
                    <div className="mt-1 sm:mt-0 sm:col-span-2">
                      <DatePicker
                        name="expiresAt"
                        autocomplete="off"
                        value={props.values.expiresAt}
                        onChange={props.setFieldValue}
                        className="block max-w-lg w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500  sm:max-w-4xl sm:text-sm border-gray-300 rounded-md"
                      />
                      <ErrorMessage
                        component={StyledErrorMessage}
                        name="expiresAt"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-5">
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    {isSubmitting ? 'Creating listing...' : 'Create listing'}
                  </button>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </section>
    </>
  );
};

export default Sell;
