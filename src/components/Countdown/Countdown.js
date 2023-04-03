import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const Countdown = ({ return_date }) => {
  const [remainingTime, setRemainingTime] = useState('Loading');

  useEffect(() => {
    const intervalId = setInterval(() => {
      const rental = new Date();
      const expired = new Date(return_date.split('.')[0]);
      const KR_TIME_DIFF = 9 * 60 * 60 * 1000;
      const kr_expired = new Date(expired.getTime() + KR_TIME_DIFF);
      const gap = kr_expired - rental;

      if (gap < 0) {
        clearInterval(intervalId);
        setRemainingTime('만료되었습니다.');
      } else {
        const hours = String(Math.floor(gap / (1000 * 60 * 60))).padStart(
          2,
          '0'
        );
        const minutes = String(
          Math.floor((gap % (1000 * 60 * 60)) / (1000 * 60))
        ).padStart(2, '0');
        const seconds = String(Math.floor((gap % (1000 * 60)) / 1000)).padStart(
          2,
          '0'
        );
        setRemainingTime(`${hours}:${minutes}:${seconds}`);
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return <CountDown>{remainingTime}</CountDown>;
};

export default Countdown;

const CountDown = styled.div`
  position: absolute;
  top: 83%;
  left: 50%;
  transform: translate(-50%, 0);
  width: 80%;
  height: 23px;
  background-color: #fff;
  outline: none;
  outline-offset: -3px;
  border-radius: 7px;
  font-size: 13px;
  text-align: center;
  line-height: 23px;
  color: #4e4e4e;
`;
