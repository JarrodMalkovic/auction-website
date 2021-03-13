import styled from '@emotion/styled';
import xw from 'xwind/macro';

const StyledLogo = styled.div(xw`
	flex-shrink-0 
	flex items-center
`);

const StyledMobileLogo = styled.img(xw`
	block 
	lg:hidden 
	h-8 
	w-auto
`);

const StyledDesktopLogo = styled.img(xw`
	hidden 
	lg:block 
	h-8 
	w-auto
`);

const Logo = () => {
  return (
    <StyledLogo>
      <StyledMobileLogo
        src="/images/small-logo.svg"
        alt="Auction Website Logo"
      />
      <StyledDesktopLogo
        src="/images/large-logo.svg"
        alt="Auction Website Logo"
      />
    </StyledLogo>
  );
};

export default Logo;
