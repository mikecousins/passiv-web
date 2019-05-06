import React from 'react';
import { connect } from 'react-redux';
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

class SubscriptionPlans extends React.Component {
  render() {
    try {
      const { plans } = this.props;

      const annualPlan = plans[0];

      return annualPlan ? (
        <React.Fragment>
          <H3> Get Passiv Elite </H3>
          <P>
            Unlock{' '}
            <a href="/pricing" target="_blank">
              all features
            </a>{' '}
            for just{' '}
            <strong>
              <Number
                value={parseInt(annualPlan.amount)}
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
              Your subscription will automatically renew and you can cancel at
              any time.
            </li>
          </SmallList>
        </React.Fragment>
      ) : null;
    } catch {
      return null;
    }
  }
}

const select = state => ({
  plans: selectPlans(state),
});
const actions = {};

export default connect(
  select,
  actions,
)(SubscriptionPlans);
