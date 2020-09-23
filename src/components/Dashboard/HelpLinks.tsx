import React from 'react';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
import Grid from '../../styled/Grid';
import ShadowBox from '../../styled/ShadowBox';
import { H3, P } from '../../styled/GlobalElements';

export const ShadowBoxLinks = styled(ShadowBox)`
  a {
    text-decoration: none;
    color: #232225;
    text-align: center;
    max-width: 300px;
    display: block;
    margin: 0 auto;

    &:hover {
      h3 {
        color: #033ebc;
      }
      color: #033ebc;
    }
  }
`;

export const HelpLinks = () => {
  return (
    <React.Fragment>
      <Grid columns="1fr 1fr 1fr">
        <ShadowBoxLinks>
          <a
            href="https://passiv.com/tutorials/"
            rel="noopener noreferrer"
            target="_blank"
          >
            <H3>Passiv Guide</H3>
            <P>Check out our helpful ramblings, tips, and tricks.</P>
          </a>
        </ShadowBoxLinks>
        <ShadowBoxLinks>
          <Link to={'/app/reporting'}>
            <H3>Reporting</H3>
            <P>Check out the graphs showing what your account is doing</P>
          </Link>
        </ShadowBoxLinks>
        <ShadowBoxLinks>
          <Link to={'/app/referrals'}>
            <H3>Invite Friends, Make Money</H3>
            <P>Earn cash when referrals upgrade to Passiv Elite.</P>
          </Link>
        </ShadowBoxLinks>
      </Grid>
    </React.Fragment>
  );
};

export default HelpLinks;
