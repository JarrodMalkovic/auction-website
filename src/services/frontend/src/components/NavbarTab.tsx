import React from 'react';

import ActiveLink from './ActiveLink';

interface IProps {
    href: string;
    name: string;
}

const NavbarTab = ({ href, name }: IProps) => {
    return (
        <>
            <ActiveLink
                activeClassName='hidden lg:flex border-indigo-500 text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium'
                href={href}>
                <a className='hidden lg:flex border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium'>
                    {name}
                </a>
            </ActiveLink>
            <ActiveLink
                activeClassName='lg:hidden bg-indigo-50 border-indigo-500 text-indigo-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium'
                href={href}>
                <a className='lg:hidden border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800 block pl-3 pr-4 py-2 border-l-4 text-base font-medium'>
                    {name}
                </a>
            </ActiveLink>
        </>
    );
};

export default NavbarTab;
