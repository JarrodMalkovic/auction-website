import styled from '@emotion/styled';
import Link from 'next/link';
import React from 'react';
import xw from 'xwind/macro';

interface IProps {
    link: string;
    name: string;
}

const StyledAnchorTag = styled.a(xw`
    ml-2
    text-sm 
    font-medium 
    text-gray-500 
    hover:text-gray-700
`);

const Breadcrumb = ({ link, name }: IProps) => {
    return (
        <StyledAnchorTag>
            <Link href={link}>{name}</Link>
        </StyledAnchorTag>
    );
};

export default Breadcrumb;
