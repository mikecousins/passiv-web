import React from 'react';
import styled from '@emotion/styled';
import { H1, P } from '../../styled/GlobalElements';

export const HeaderContainer = styled.div`
  margin-bottom: 50px;
`;

const StyledP = styled(P)`
  max-width: 50%;
  font-size: 20px;
  @media (max-width: 900px) {
    max-width: 100%;
  }
`;

const HelpHeader = () => (
  <HeaderContainer>
    <H1>How can we help you?</H1>
    <StyledP>Find everything you need about Passiv.</StyledP>
  </HeaderContainer>
);

export default HelpHeader;
