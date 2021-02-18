import StyledSvg from '../styles/StyledSvg';

const HamburgerMenuIcon = () => {
    return (
        <StyledSvg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
            aria-hidden='true'>
            <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M6 18L18 6M6 6l12 12'
            />
        </StyledSvg>
    );
};

export default HamburgerMenuIcon;
