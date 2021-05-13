import React from 'react';
import styled from '@emotion/styled';
import { H1, P } from '../../styled/GlobalElements';
import SearchBar from './SearchBar';
import Learn from './Learn';
import ContactForm from './ContactForm';

import helpLogo from '../../assets/images/help-icon.png';

export const HeaderContainer = styled.div`
  margin-bottom: 50px;
`;
const HelpLogo = styled.div`
  background: url(${helpLogo}) no-repeat;
  background-size: contain;
  width: 102px;
  height: 102px;
  float: right;
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
      <div>
        <H1>
          How can we help you? <HelpLogo></HelpLogo>
        </H1>
      </div>
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
