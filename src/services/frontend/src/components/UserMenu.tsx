import styled from '@emotion/styled';
import axios from 'axios';
import Link from 'next/link';
import React, { useState, useEffect, useContext } from 'react';
import xw from 'xwind/macro';

import AppContext from '../context/app-context';
import ClickAwayButton from './ClickAwayButton';

const StyledUserMenu = styled.div(xw`
    ml-4 
    relative 
    flex-shrink-0
`);

const StyledButton = styled.button(xw`
    bg-white 
    rounded-full 
    flex 
    text-sm 
    focus:outline-none 
    focus:ring-2 
    focus:ring-offset-2 
    focus:ring-indigo-500
`);

const StyledSpan = styled.span(xw`
    sr-only
`);

const StyledImg = styled.img(xw`
    h-8 
    w-8 
    rounded-full
`);

const StyledLinksContainer = styled.div(xw`
    origin-top-right 
    absolute 
    right-0 
    mt-2 
    w-48 
    rounded-md 
    shadow-lg 
    py-1 
    bg-white 
    ring-1 
    ring-black 
    ring-opacity-5 
    z-50
`);

const StyledAnchor = styled.a(xw`
    block 
    px-4 
    py-2 
    text-sm 
    text-gray-700 
    hover:bg-gray-100
`);

const UserMenu = () => {
  const {
    auth: { isAuthenticated, currentUser },
    setAuth,
  } = useContext(AppContext);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const handleEscape = (e: any) => {
    if (e.key === 'Esc' || e.key === 'Escape') {
      setShowUserMenu(false);
    }
  };

  const onClick = async () => {
    try {
      await axios.post('/api/auth/signout');
      setAuth({ isAuthenticated: false, currentUser: null });
    } catch (err) {}
  };

  useEffect(() => {
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  return (
    <StyledUserMenu>
      <StyledButton
        id="user-menu"
        aria-haspopup="true"
        onClick={() => setShowUserMenu(!showUserMenu)}
      >
        <StyledSpan>Open user menu</StyledSpan>
        <StyledImg src={currentUser.avatar} alt="Your Profile Picture" />
      </StyledButton>
      {showUserMenu && (
        <>
          <ClickAwayButton onClickAway={() => setShowUserMenu(false)} />
          <StyledLinksContainer
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="user-menu"
          >
            <Link href={`/profile/${currentUser.name}`}>
              <StyledAnchor role="menuitem">Your Profile</StyledAnchor>
            </Link>
            <Link href="/dashboard/listings">
              <StyledAnchor role="menuitem">Dashboard</StyledAnchor>
            </Link>
            <Link href="/settings/profile">
              <StyledAnchor role="menuitem">Settings</StyledAnchor>
            </Link>
            <StyledAnchor onClick={onClick} role="menuitem">
              Sign out
            </StyledAnchor>
          </StyledLinksContainer>
        </>
      )}
    </StyledUserMenu>
  );
};

export default UserMenu;
