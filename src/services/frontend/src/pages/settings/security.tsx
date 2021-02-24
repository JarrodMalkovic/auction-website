import styled from '@emotion/styled';
import axios from 'axios';
import { Formik, Form, Field, ErrorMessage } from 'formik';
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
  oldPassword: Yup.string()
    .min(4, 'Passwords must be more than 4 characters')
    .max(32, 'Passwords must be less than 32 characters')
    .required('Required'),
  newPassword: Yup.string()
    .min(4, 'Passwords must be more than 4 characters')
    .max(32, 'Passwords must be less than 32 characters')
    .required('Required'),
  confirmPassword: Yup.string()
    .min(4, 'Passwords must be more than 4 characters')
    .max(32, 'Passwords must be less than 32 characters')
    .oneOf([Yup.ref('newPassword'), null], 'Passwords do not match')
    .required('Required'),
});

const Security = () => {
  const {
    auth: { isAuthenticated },
  } = useContext(AppContext);
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  const onSubmit = async (body) => {
    console.log('x');
    setIsChangingPassword(true);

    try {
      await axios.post('/api/auth/update-password', body);
      toast.success('Sucessfully updated password!');
    } catch (err) {
      err.response.data.errors.forEach((err) => toast.error(err.message));
    }

    setIsChangingPassword(false);
  };

  if (!isAuthenticated) {
    return (
      <Error
        error="Error 401"
        message="You must be logged in to view your settings."
      />
    );
  }

  return (
    <>
      <SettingsBreadcrumbs
        link="/settings/security"
        name="Security and Privacy Settings"
      />
      <section className="py-3">
        <h3 className="text-3xl leading-tight font-semibold font-heading">
          Security and Privacy Settings
        </h3>
        <p className="mt-1 max-w-2xl text-l text-gray-500">
          This information will be displayed publicly so be careful what you
          share.
        </p>
        <SettingsTabs />
        <Formik
          initialValues={{
            oldPassword: '',
            newPassword: '',
            confirmPassword: '',
          }}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          <Form className="space-y-8 py-3 divide-y divide-gray-200">
            <div className="space-y-8 divide-y divide-gray-200 sm:space-y-5">
              <div className="mt-3 space-y-6 sm:space-y-5 divide-y divide-gray-200">
                <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start">
                  <label
                    htmlFor="old_password"
                    className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                  >
                    Old Password
                  </label>
                  <div className="mt-1 sm:mt-0 sm:col-span-2">
                    <Field
                      type="text"
                      name="oldPassword"
                      className="max-w-lg  sm:max-w-4xl block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                    />
                    <ErrorMessage
                      component={StyledErrorMessage}
                      name="oldPassword"
                    />
                  </div>
                </div>

                <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                  <label
                    htmlFor="new_password"
                    className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                  >
                    New Password
                  </label>
                  <div className="mt-1 sm:mt-0 sm:col-span-2">
                    <Field
                      type="text"
                      name="newPassword"
                      className="max-w-lg  sm:max-w-4xl block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                    />
                    <ErrorMessage
                      component={StyledErrorMessage}
                      name="newPassword"
                    />
                  </div>
                </div>

                <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                  <label
                    htmlFor="confirm_new_password"
                    className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                  >
                    Confirm New Password
                  </label>
                  <div className="mt-1 sm:mt-0 sm:col-span-2">
                    <Field
                      type="text"
                      name="confirmPassword"
                      className="max-w-lg  sm:max-w-4xl block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                    />
                    <ErrorMessage
                      component={StyledErrorMessage}
                      name="confirmPassword"
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
                  {isChangingPassword ? 'Updating...' : 'Update Password'}
                </button>
              </div>
            </div>
          </Form>
        </Formik>
      </section>
    </>
  );
};

export default Security;
