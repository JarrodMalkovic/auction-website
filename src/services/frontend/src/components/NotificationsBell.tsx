import styled from '@emotion/styled';
import React, { useState, useEffect } from 'react';
import xw from 'xwind/macro';

import ClickAwayButton from './ClickAwayButton';
import NotificationsIcon from './NotificationsIcon';

const StyledNotificationsBell = styled.div(xw`
	relative 
	flex-shrink-0
`);

const StyledButton = styled.button(xw`
	flex-shrink-0 
	bg-white 
	p-1 
	text-gray-400 
	rounded-full 
	hover:text-gray-500 
	focus:outline-none 
	focus:ring-2 
	focus:ring-offset-2 
	focus:ring-indigo-500
`);

const StyledLabel = styled.label(xw`
	sr-only
`);

const StyledNotificationsContent = styled.div(xw`
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

const StyledText = styled.h1(xw`
	block 
	px-4 
	py-2 
	text-sm 
	text-gray-700
`);

const NotificationsBell = () => {
  const [showNotifications, setShowNotifications] = useState(false);

  const handleEscape = (e: any) => {
    if (e.key === 'Esc' || e.key === 'Escape') {
      setShowNotifications(false);
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  return (
    <StyledNotificationsBell>
      <StyledButton onClick={() => setShowNotifications(!showNotifications)}>
        <StyledLabel>View notifications</StyledLabel>
        <NotificationsIcon />
      </StyledButton>
      {showNotifications && (
        <>
          <ClickAwayButton onClickAway={() => setShowNotifications(false)} />
          <StyledNotificationsContent
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="user-menu"
          >
            <StyledText role="menuitem">
              You currently have no notifications!
            </StyledText>
          </StyledNotificationsContent>
        </>
      )}
    </StyledNotificationsBell>
  );
};

export default NotificationsBell;
