import React, { Fragment, useEffect } from 'react';
import { useState } from 'react';

interface IProps {
  expiresAt: string;
}

const Countdown = ({ expiresAt }: IProps) => {
  const [countDownData, setCountDownData] = useState({
    timeleft: 'Loading countdown . .',
  });

  const { timeleft } = countDownData;

  useEffect(() => {
    countdownTimer();

    const interval = setInterval(() => {
      if (timeleft === 'Times up!') return clearInterval(interval);
      countdownTimer();
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const countdownTimer = () => {
    const countDownDate = Date.parse(expiresAt);
    const now = Date.now();

    const distance = countDownDate - now;

    if (distance <= 0) {
      setCountDownData({
        timeleft: 'Times up!',
      });
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    setCountDownData({
      timeleft: days + 'd ' + hours + 'h ' + minutes + 'm ' + seconds + 's ',
    });
  };

  return <>{timeleft}</>;
};

export default Countdown;
