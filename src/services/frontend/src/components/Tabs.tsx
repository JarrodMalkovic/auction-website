import styled from '@emotion/styled';
import { FunctionComponent } from 'react';
import xw from 'xwind/macro';

const StyledTabs = styled.div(xw`
    border-b 
    border-gray-200
`);

const StyledTabsNav = styled.nav(xw`
    flex 
    space-x-8
`);

const Tabs: FunctionComponent = ({ children }) => {
    return (
        <StyledTabs>
            <StyledTabsNav aria-label='Tabs'>{children}</StyledTabsNav>
        </StyledTabs>
    );
};

export default Tabs;
