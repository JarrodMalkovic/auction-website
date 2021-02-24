import styled from '@emotion/styled';
import Link from 'next/link';
import React from 'react';
import xw from 'xwind/macro';

import { centsToDollars } from '../utils/cents-to-dollars';
import Countdown from './Countdown';

interface IProps {
  name: string;
  expiresAt: string;
  price: number;
  slug: string;
  smallImage: string;
}

const StyledListingCard = styled.div(xw`
	w-full
	lg:w-1/5
  sm:w-1/3
	px-2
	mb-4
`);

const StyledCardContent = styled.div(xw`
	rounded
	shadow
	cursor-pointer
`);

const TextWrapper = styled.div(xw`
	p-3
`);

const StyledText = styled.a(xw`
	text-indigo-600 
	hover:underline
`);

const StyledPrice = styled.p(xw`
	text-xl
`);

const StyledImg = styled.img(xw`
	w-full	
`);

const ListingCard = ({ name, price, slug, smallImage, expiresAt }: IProps) => {
  return (
    <StyledListingCard>
      <Link href={slug}>
        <StyledCardContent>
          <StyledImg src={smallImage} alt={name} />
          <TextWrapper>
            <StyledText>
              <Countdown expiresAt={expiresAt} />
            </StyledText>
            <StyledPrice>{centsToDollars(price)}</StyledPrice>
          </TextWrapper>
        </StyledCardContent>
      </Link>
    </StyledListingCard>
  );
};

export default ListingCard;
