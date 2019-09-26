import React from 'react';
import styled from '@emotion/styled';
import AlpacaLogo from '../../assets/images/alpaca-logo.png';

export const DemoStyle = styled.div`
  display: inline-block;
  margin: 0 0 0 20px;
  padding-top: 17px;
  text-align: left;
  font-weight: 700;
  @media (max-width: 900px) {
    padding-top: 10px;
    padding-right: 20px;
  }
`;

const LogoContainer = styled.div`
  display: inline-block;
  height: 30px;
  vertical-align: middle;
  padding-left: 10px;
  img {
    height: 100%;
  }
`;

const Demo = () => (
  <DemoStyle>
    This demo is powered by{' '}
    <LogoContainer>
      <a
        href="https://alpaca.markets/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img src={AlpacaLogo} alt="Alpaca Logo" />
      </a>
    </LogoContainer>
  </DemoStyle>
);

export default Demo;
