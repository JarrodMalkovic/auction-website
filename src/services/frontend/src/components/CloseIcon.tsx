import StyledSvg from '../styles/StyledSvg';

const CloseIcon = () => {
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
                d='M4 6h16M4 12h16M4 18h16'
            />
        </StyledSvg>
    );
};

export default CloseIcon;
