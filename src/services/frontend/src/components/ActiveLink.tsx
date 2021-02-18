import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { ReactElement } from 'react';

interface IProps {
    children: ReactElement;
    activeClassName: string;
    href: string;
}

const ActiveLink = ({ children, activeClassName, href }: IProps) => {
    const { asPath } = useRouter();
    const childClassName = children.props.className ?? '';

    const className =
        asPath === href
            ? `${childClassName} ${activeClassName}`.trim()
            : childClassName;

    return (
        <Link href={href}>
            {React.cloneElement(children, {
                className: className ?? null,
            })}
        </Link>
    );
};

export default ActiveLink;
