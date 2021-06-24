import React from 'react';
import { useSelector } from 'react-redux';
import styled from '@emotion/styled';
import Grid from '../../styled/Grid';
import ShadowBox from '../../styled/ShadowBox';
import { H3, P } from '../../styled/GlobalElements';
import { selectHasQuestradeConnection } from '../../selectors';
import { REFERRALS_PATH, REPORTING_PATH } from '../../apps/Paths';
import PreLoadLink from '../PreLoadLink';

const ShadowBoxLinks = styled(ShadowBox)`
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

const HelpLinks = () => {
  const hasQuestradeConnection = useSelector(selectHasQuestradeConnection);

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
        {hasQuestradeConnection && (
          <ShadowBoxLinks>
            <PreLoadLink path={REPORTING_PATH}>
              <H3>Reporting</H3>
              <P>Check out the graphs showing what your account is doing</P>
            </PreLoadLink>
          </ShadowBoxLinks>
        )}

        <ShadowBoxLinks>
          <PreLoadLink path={REFERRALS_PATH}>
            <H3>Invite Friends, Make Money</H3>
            <P>Earn cash when referrals upgrade to Passiv Elite.</P>
          </PreLoadLink>
        </ShadowBoxLinks>
      </Grid>
    </React.Fragment>
  );
};

export default HelpLinks;
