import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectAuthorizations } from '../selectors';
import ShadowBox from '../styled/ShadowBox';
import styled from '@emotion/styled';
import { selectReferralCode } from '../selectors/referrals';
import { getData } from '../api';

export const ReferralHeading = styled.h3`
  background: #fff;
  display: inline-block;
  position: relative;
  top: -24px;
  padding: 0 15px;
  margin-bottom: -7px;
  font-size: 2.5em;
`;

const AffiliateTermDiv = styled.div`
  font-size: 1.4em;
  padding-bottom: 20px;
  line-height: 1.4;
  ul li {
    margin-left: 20px;
    list-style-type: disc;
  }
`;

const ReferralManager = () => {
  const authorizations = useSelector(selectAuthorizations);
  const referralCode = useSelector(selectReferralCode);
  const referralURL = 'https://passiv.com/?ref=' + referralCode;
  const [referrals, setReferrals] = useState(0);
  const referralChecker = () => {
    getData(`/api/v1/referrals`).then((response) => {
      setReferrals(response.data);
    });
  };
  if (!authorizations) {
    return null;
  } else if (authorizations.length === 0) {
    return null;
  }

  return (
    <ShadowBox>
      <ReferralHeading>The Passiv Referral Program</ReferralHeading>
      <AffiliateTermDiv>
        <p>
          We're excited to announce a new program through which you can earn
          money for signing your friends up for Passiv!
        </p>
      </AffiliateTermDiv>
      <AffiliateTermDiv>
        <ul>
          <li>
            Your custom referral link is:{' '}
            <a href={referralURL}>{referralURL}</a>
          </li>
          <li>
            Every Passiv user that signs up and upgrades to Elite using your
            link will <strong>earn you $20!</strong>.
          </li>
          <li>We send out payments each quarter.</li>
          <li>
            You can read the terms and conditions of our affiliate program{' '}
            <a href="https://passiv-files.s3.ca-central-1.amazonaws.com/Affiliates+-+Terms+and+Conditions.pdf">
              here
            </a>
            . By referring users to Passiv, you agree to be bound to this
            agreement.
          </li>
        </ul>
      </AffiliateTermDiv>
      <AffiliateTermDiv>
        <p>You can find information about your past referrals below:</p>
      </AffiliateTermDiv>
      <AffiliateTermDiv>{referrals}</AffiliateTermDiv>
    </ShadowBox>
  );
};

export default ReferralManager;
