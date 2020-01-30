import React from 'react';
import styled from '@emotion/styled';
import { H1 } from '../../styled/GlobalElements';

export const HeaderContainer = styled.div`
  h1 {
    margin-bottom: 10px;
  }
`;

const HelpHeader = () => (
  <HeaderContainer>
    <H1>How can we help you?</H1>
  </HeaderContainer>
);

export default HelpHeader;
