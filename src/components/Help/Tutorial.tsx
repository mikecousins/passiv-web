import React from 'react';
import styled from '@emotion/styled';
import { H2, P, A } from '../../styled/GlobalElements';

const TutorialContainer = styled.div`
  flex: 1;
  padding: 7rem 1rem 5rem;
  text-align: center;
  width: 100%;
  h2 {
    text-align: center;
    margin-bottom: 20px;
  }
  p {
    font-size: 24px;
    margin-bottom: 30px;
  }
  svg {
    margin-left: 12px;
    font-size: 50px;
    color: #04a287;
  }
  a {
    border-radius: 4px;
    background: var(--brand-blue);
    color: #fff;
    display: inline-block;
    margin-bottom: 8px;
    margin-left: 5px;
    padding: 12px 20px 12px 18px;
    text-transform: none;
    text-decoration: none;
  }
`;

const Tutorial = () => (
  <TutorialContainer>
    <H2>Passiv Tutorials</H2>
    <P>Looking for some how-to articles?</P>
    <A href="/help/tutorials/" target="_blank" rel="noopener noreferrer">
      Tutorials
    </A>
  </TutorialContainer>
);

export default Tutorial;
