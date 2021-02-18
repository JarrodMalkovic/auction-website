import styled from '@emotion/styled';
import xw from 'xwind/macro';

const StyledFooter = styled.footer(xw`
	py-4 
	text-center
`);

const StyledText = styled.span(xw`
	block 
	md:inline-block 
	mb-4 
	md:mb-0 
	mx-3
`);

const StyledLink = styled.a(xw`
	inline-block
	text-blue-900
	hover:text-indigo-600
`);

const Footer = () => {
  return (
    <StyledFooter>
      <StyledText>
        © 2021 Jarrod Malkovic. This is not a real store and is hosted for demo
        purposes only. All database records are cleared regularly. See the code{' '}
        <StyledLink href="https://github.com/jarrodmalkovic/auction-website">
          here.
        </StyledLink>
      </StyledText>
    </StyledFooter>
  );
};

export default Footer;
