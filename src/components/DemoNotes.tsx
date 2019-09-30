import React from 'react';
// import { useSelector } from 'react-redux';
import ShadowBox from '../styled/ShadowBox';
import { H2 } from '../styled/GlobalElements';
import styled from '@emotion/styled';

const DemoNotesContainer = styled.div`
  transform: translateY(-50%);
  top: 50%;
  position: relative;
  padding-left: 18px;
  color: #000;

  @media (max-width: 900px) {
    padding: 12px 0px;
    transform: none;
  }

  button {
    margin-top: 8px;
  }
`;

const H2Padded = styled(H2)`
  color: #fff;
  padding-bottom: 20px;
`;

const DivPadded = styled.div`
  color: #fff;
  font-size: 1.4em;
  padding-bottom: 20px;
  line-height: 1.4;
  ul li {
    margin-left: 20px;
    list-style-type: disc;
  }
`;

const DemoNotes = () => {
  return (
    <ShadowBox background="#04a287">
      <DemoNotesContainer>
        <H2Padded>Demo Notes</H2Padded>
        <DivPadded>Welcome to Passiv!</DivPadded>

        <DivPadded>
          This demo account lets you try Passiv in a simulated trading
          environment. You can set targets, make trades, or do whatever you
          want.
        </DivPadded>

        <DivPadded>Please note the following:</DivPadded>
        <DivPadded>
          <ul>
            <li>
              This account only lives for 60 minutes (XX minutes remaining).
            </li>
            <li>Only US exchanges are supported in this demo.</li>
            <li>
              Your demo account has one portfolio (Retirement) with one account
              (Individual 401k) behind it.
            </li>
            <li>
              Nothing in this demo should be interpreted as finacial advice.
            </li>
          </ul>
        </DivPadded>
      </DemoNotesContainer>
    </ShadowBox>
  );
};

export default DemoNotes;
