import React from 'react';
// import { useSelector } from 'react-redux';
import { H2 } from '../styled/GlobalElements';
import styled from '@emotion/styled';

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

const DemoNotesContent = () => {
  return (
    <React.Fragment>
      <H2Padded>Demo Notes</H2Padded>
      <DivPadded>Welcome to Passiv!</DivPadded>

      <DivPadded>
        This demo account lets you try Passiv in a simulated trading
        environment. You can set targets, make trades, or do whatever you want.
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
    </React.Fragment>
  );
};

export default DemoNotesContent;
