import styled from '@emotion/styled';
import React, { useState, useEffect } from 'react';

const CountDown = styled.div`
  font-size: 18px;
`;

const Seconds = styled.span`
  font-weight: 700;
`;

const CountDownTimer = () => {
  const [seconds, setSeconds] = useState(5);
  const [giphy, setGiphy] = useState(false);

  useEffect(() => {
    if (seconds > 0) {
      setTimeout(() => setSeconds(seconds - 1), 1000);
    } else {
      setGiphy(true);
    }
  }, [seconds]);

  return (
    <div>
      {giphy ? (
        <>
          <div
            style={{
              width: '100%',
              height: '0',
              paddingBottom: '56%',
              position: 'relative',
            }}
          >
            <iframe
              src="https://giphy.com/embed/ygzdQq98HgcLBCacep"
              title="giphy2"
              width="100%"
              height="100%"
              style={{ position: 'absolute' }}
              frameBorder="0"
              className="giphy-embed"
              allowFullScreen
            ></iframe>
          </div>
          <small>
            <a href="https://gph.is/g/ZdxQzPw">via GIPHY</a>
          </small>
        </>
      ) : (
        <CountDown>
          You'll be logged out in <Seconds>{seconds}</Seconds> for making a bad
          financial decision ...
        </CountDown>
      )}
    </div>
  );
};

export default CountDownTimer;
