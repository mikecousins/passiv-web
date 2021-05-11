import React from 'react';
import styled from '@emotion/styled';
import { H1, P } from '../../styled/GlobalElements';
import SearchBar from './SearchBar';
import Learn from './Learn';
import ContactForm from './ContactForm';

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

const Help = () => (
  <>
    <HeaderContainer>
      <H1>How can we help you?</H1>
      <StyledP>
        Search for tips, look through our learning material, or send us a
        message!
      </StyledP>
    </HeaderContainer>
    <SearchBar />
    <Learn />
    <ContactForm />
  </>
);

export default Help;
