import Error from '../../components/ErrorMessage';
import SettingsBreadcrumbs from '../../components/SettingsBreadcrumbs';
import SettingsTabs from '../../components/SettingsTabs';
import AppContext from '../../context/app-context';
import React, { useContext } from 'react';

const Security = () => {
  const {
    auth: { isAuthenticated },
  } = useContext(AppContext);

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
        <form className="space-y-8 py-3 divide-y divide-gray-200">
          <div className="space-y-8 divide-y divide-gray-200 sm:space-y-5">
            <div className="mt-3 space-y-6 sm:space-y-5 divide-y divide-gray-200">
              <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start">
                <label
                  htmlFor="first_name"
                  className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                >
                  Contact Email
                </label>
                <div className="mt-1 sm:mt-0 sm:col-span-2">
                  <input
                    type="text"
                    name="first_name"
                    id="first_name"
                    autoComplete="given-name"
                    className="max-w-lg  sm:max-w-4xl block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
              </div>

              <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                <label
                  htmlFor="last_name"
                  className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                >
                  New Password
                </label>
                <div className="mt-1 sm:mt-0 sm:col-span-2">
                  <input
                    type="text"
                    name="last_name"
                    id="last_name"
                    autoComplete="family-name"
                    className="max-w-lg  sm:max-w-4xl block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
              </div>

              <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                <label
                  htmlFor="last_name"
                  className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                >
                  Confirm New Password
                </label>
                <div className="mt-1 sm:mt-0 sm:col-span-2">
                  <input
                    type="text"
                    name="last_name"
                    id="last_name"
                    autoComplete="family-name"
                    className="max-w-lg  sm:max-w-4xl block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
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
                Save
              </button>
            </div>
          </div>
        </form>
      </section>
    </>
  );
};

export default Security;
