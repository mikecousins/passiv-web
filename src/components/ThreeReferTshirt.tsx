import React, { useEffect } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { getData } from '../api';
import styled from '@emotion/styled-base';
import { P } from '../styled/GlobalElements';
import { Disclaimer } from './ModelPortfolio/SharedModelPortfolio';
import NotificationMessage from './NotificationMessage';

const FootNote = styled(Disclaimer)`
  margin: 20px 0px;
`;

const ThreeReferTshirt = () => {
  const [referrals, setReferrals] = useState(0);
  let title = 'Refer 3 friends this summer and get a Free T-shirt';
  useEffect(() => {
    getData('/api/v1/referrals/')
      .then((response) => {
        const allReferrals = response.data;
        const total = allReferrals.reduce((total: number, referral: any) => {
          if (referral.validated) {
            total += 1;
          }
          return total;
        }, 0);
        setReferrals(total);
      })
      .catch((err) => {});
  }, []);

  if (referrals === 1) {
    title =
      'You’re so close! Refer 2 more friends this summer and get a free T-shirt';
  }
  if (referrals === 2) {
    title =
      'You’re so close! Refer 1 more friend this summer and get a free T-shirt';
  }
  return (
    <div>
      <NotificationMessage
        error={false}
        title={title}
        alwaysOpen={true}
        closeBtn={true}
        contextualMessageName="3refer_tShirt"
      >
        <div>
          <P>
            To celebrate summer and the nice weather, we’re giving away some
            swag to our best referrers!{' '}
            <Link to="/referrals">Get 3 verified referrals</Link> and we’ll send
            you a free Passiv T-shirt.
          </P>
          <FootNote>
            * Valid for Canadian Residents only, with verified referral
            validated before August 31st, 2021.
          </FootNote>
        </div>
      </NotificationMessage>
    </div>
  );
};

export default ThreeReferTshirt;
