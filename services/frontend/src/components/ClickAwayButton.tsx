import styled from '@emotion/styled';
import xw from 'xwind/macro';

interface IProps {
  onClickAway(): void;
}

const StyledClickAwayButton = styled.button(xw`
    fixed
    inset-0 
    h-full 
    w-full 
    cursor-default
    outline-none
`);

const ClickAwayButton = ({ onClickAway }: IProps) => {
  return (
    <StyledClickAwayButton
      onClick={onClickAway}
      tabIndex={-1}
    ></StyledClickAwayButton>
  );
};

export default ClickAwayButton;
