import styled from '@emotion/styled';
import axios from 'axios';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { NextPageContext } from 'next';
import React, { useContext, useState } from 'react';
import { toast } from 'react-toastify';
import xw from 'xwind/macro';
import * as Yup from 'yup';

import Error from '../../components/ErrorMessage';
import SettingsBreadcrumbs from '../../components/SettingsBreadcrumbs';
import SettingsTabs from '../../components/SettingsTabs';
import AppContext from '../../context/app-context';

const StyledErrorMessage = styled.div(xw`
    text-sm
    text-red-600
    my-0.5
`);

const validationSchema = Yup.object({
  about: Yup.string().max(5000, 'Must be less than 5000 characters'),
  firstName: Yup.string().max(64, 'Must be less than 64 characters'),
  lastName: Yup.string().max(64, 'Must be less than 64 characters'),
  country: Yup.string().max(64, 'Must be less than 64 characters'),
});

const Profile = ({ profileData }) => {
  const {
    auth: { isAuthenticated },
  } = useContext(AppContext);
  const [isUpdating, setIsUpdating] = useState(false);
  const [profile, setProfile] = useState(profileData);

  const onSubmit = async (body) => {
    setIsUpdating(true);

    try {
      const { data } = await axios.patch('/api/profile', body);
      setProfile(data);
      toast.success('Sucessfully signed up!');
    } catch (err) {
      err.response.data.errors.forEach((err) => toast.error(err.message));
    }

    setIsUpdating(false);
  };

  if (!isAuthenticated) {
    return (
      <Error
        error="Error 401"
        message="You must be logged in to view your settings."
      />
    );
  }

  if (!profile) {
    return (
      <Error
        error="Error 404"
        message="We couldnt fetch your profile information. Please try again."
      />
    );
  }

  return (
    <>
      <SettingsBreadcrumbs link="/settings/profile" name="Profile Settings" />
      <section className="py-3">
        <h3 className="text-3xl leading-tight font-semibold font-heading">
          Profile Settings
        </h3>
        <p className="mt-1 max-w-2xl text-l text-gray-500">
          This information will be displayed publicly so be careful what you
          share.
        </p>
        <SettingsTabs />
        <Formik
          initialValues={{
            about: profile.about,
            firstName: profile.firstName,
            lastName: profile.lastName,
            country: profile.country,
          }}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          <Form className="space-y-8 py-3 divide-y divide-gray-200">
            <div className="space-y-8 divide-y divide-gray-200 sm:space-y-5">
              <div className="mt-3 space-y-6 sm:space-y-5">
                <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-center sm:border-gray-200 ">
                  <label
                    htmlFor="photo"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Photo
                  </label>
                  <div className="mt-1 sm:mt-0 sm:col-span-2">
                    <div className="flex items-center">
                      <span className="h-12 w-12 rounded-full overflow-hidden bg-gray-100">
                        <svg
                          className="h-full w-full text-gray-300"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                      </span>
                      <p className="ml-5  text-sm text-gray-500">
                        This site uses gravatar for user profile pictures.
                        Change your gravatar here.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                  <label
                    htmlFor="about"
                    className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                  >
                    About
                  </label>
                  <div className="mt-1 sm:mt-0 sm:col-span-2">
                    <Field
                      as="textarea"
                      rows="5"
                      name="about"
                      className="max-w-lg shadow-sm block  sm:max-w-4xl w-full focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"
                    />
                    <p className="mt-2 text-sm text-gray-500">
                      Write a few sentences about yourself.
                    </p>
                    <ErrorMessage component={StyledErrorMessage} name="about" />
                  </div>
                </div>

                <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                  <label
                    htmlFor="first_name"
                    className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                  >
                    First Name
                  </label>
                  <div className="mt-1 sm:mt-0 sm:col-span-2">
                    <Field
                      type="text"
                      name="firstName"
                      className="max-w-lg  sm:max-w-4xl block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                    />
                    <ErrorMessage
                      component={StyledErrorMessage}
                      name="firstName"
                    />
                  </div>
                </div>

                <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                  <label
                    htmlFor="New Password"
                    className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                  >
                    Last Name
                  </label>
                  <div className="mt-1 sm:mt-0 sm:col-span-2">
                    <Field
                      type="text"
                      name="lastName"
                      className="max-w-lg  sm:max-w-4xl block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                    />
                    <ErrorMessage
                      component={StyledErrorMessage}
                      name="lastName"
                    />
                  </div>
                </div>

                <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                  <label
                    htmlFor="New Password"
                    className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                  >
                    Country
                  </label>
                  <div className="mt-1 sm:mt-0 sm:col-span-2">
                    <Field
                      type="text"
                      name="country"
                      className="max-w-lg  sm:max-w-4xl block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                    />
                    <ErrorMessage
                      component={StyledErrorMessage}
                      name="country"
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
                  {isUpdating ? 'Updating...' : 'Update Profile'}
                </button>
              </div>
            </div>
          </Form>
        </Formik>
      </section>
    </>
  );
};

Profile.getInitialProps = async (context: NextPageContext, client: any) => {
  try {
    const { data } = await client.get(`/api/profile`);
    return { profileData: data };
  } catch (err) {
    console.error(err);
    return { profileData: [] };
  }
};

export default Profile;
