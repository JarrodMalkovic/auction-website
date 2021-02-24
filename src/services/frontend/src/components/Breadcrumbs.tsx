import styled from '@emotion/styled';
import Link from 'next/link';
import React from 'react';
import xw from 'xwind/macro';

import StyledSvg from '../styles/StyledSvg';

interface IProps {
  children: JSX.Element[];
}

const StyledBreadcrumbs = styled.nav(xw`
    flex
    pt-3
`);

const StyledOrderedList = styled.ol(xw`
    flex 
    items-center 
    space-x-4
`);

const StyledBreadcrumbContainer = styled.div(xw`
    flex 
    items-center
`);

const StyledAnchorTag = styled.a(xw`
    text-gray-400 
    hover:text-gray-500
`);

const StyledSpan = styled.span(xw`
    sr-only
`);

const Breadcrumbs = ({ children }: IProps) => {
  return (
    <StyledBreadcrumbs aria-label="Breadcrumb">
      <StyledOrderedList>
        {children.map((val, i) =>
          i === 0 ? (
            <div>
              <Link href="/">
                <StyledAnchorTag>
                  <svg
                    className="h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                  </svg>
                  <StyledSpan>Home</StyledSpan>
                </StyledAnchorTag>
              </Link>
            </div>
          ) : (
            <StyledBreadcrumbContainer>
              <StyledSvg
                className="flex-shrink-0 h-5 w-5 text-gray-300"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
                aria-hidden="true"
              >
                <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z" />
              </StyledSvg>
              {val}
            </StyledBreadcrumbContainer>
          )
        )}
      </StyledOrderedList>
    </StyledBreadcrumbs>
  );
};

export default Breadcrumbs;
