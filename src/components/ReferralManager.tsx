import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectAuthorizations } from '../selectors';
import ShadowBox from '../styled/ShadowBox';
import styled from '@emotion/styled';
import { selectReferralCode } from '../selectors/referrals';
import { getData } from '../api';

interface Referral {
  created_date: Date;
  validated: boolean;
  amount?: any;
  validation_timestamp?: Date;
  currency?: any;
}

export const ReferralHeading = styled.h3`
  background: #fff;
  display: inline-block;
  position: relative;
  padding: 0 15px;
  margin-bottom: 20px;
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
  const [referrals, setReferrals] = useState<Referral[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error>();
  const [success, setSuccess] = useState(false);

  if (loading === false && success === false) {
    setLoading(true);
    getData('/api/v1/referrals/')
      .then(response => {
        setReferrals(response.data);
        setLoading(false);
        setSuccess(true);
      })
      .catch(error => {
        setLoading(false);
        setError(error.response.data);
      });
  }

  const eliteUpgrades = referrals.filter((x, i) => x.validated).length;
  const numberOfSignups = referrals.length;

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

      <AffiliateTermDiv>
        <ul>
          <li>
            {numberOfSignups} {numberOfSignups === 1 ? 'person' : 'people'} have
            signed up using your referral link
          </li>
          <li>
            {eliteUpgrades} {eliteUpgrades === 1 ? 'person' : 'people'} have
            upgraded to Passiv Elite
          </li>
          <li>This has earned you ${eliteUpgrades * 20}</li>
        </ul>
      </AffiliateTermDiv>
    </ShadowBox>
  );
};

export default ReferralManager;
