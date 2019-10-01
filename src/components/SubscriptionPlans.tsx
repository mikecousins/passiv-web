import React from 'react';
import { useSelector } from 'react-redux';
import { selectPlans } from '../selectors';
import { H3, P, UL } from '../styled/GlobalElements';
import Number from './Number';
import styled from '@emotion/styled';

const SmallList = styled(UL)`
  list-style-type: disc;
  width: 80%;
  padding-top: 15px;
  margin: auto;
`;

const SubscriptionPlans = () => {
  const plans = useSelector(selectPlans);
  if (!plans || !plans[0]) {
    return null;
  }
  return (
    <React.Fragment>
      <H3> Get Passiv Elite </H3>
      <P>
        Unlock{' '}
        <a href="/pricing" target="_blank" rel="noopener noreferrer">
          all features
        </a>{' '}
        for just{' '}
        <strong>
          <Number
            value={parseInt(plans[0].amount)}
            decimalPlaces={0}
            currency
          />
          /year
        </strong>{' '}
        (plus tax)
      </P>
      <SmallList>
        <li>100% money-back guarantee if you are not satisfied.</li>
        <li>
          Your subscription will automatically renew and you can cancel at any
          time.
        </li>
      </SmallList>
    </React.Fragment>
  );
};

export default SubscriptionPlans;
