import React from 'react';
import { connect } from 'react-redux';
import { selectPlans } from '../selectors';
import { H3, P } from '../styled/GlobalElements';

const SubscriptionPlan = props => {
  return <p>Support Passiv for ${props.plan.amount}/year!</p>;
};

class SubscriptionPlans extends React.Component {
  render() {
    try {
      const { plans } = this.props;

      const annualPlan = plans.filter(
        plan => plan.nickname.toLowerCase() === 'annual',
      )[0];

      return annualPlan ? (
        <React.Fragment>
          <H3> Get Passiv Elite </H3>
          <P>
            {' '}
            Unlock all features for just ${annualPlan.amount / 12}/month (billed
            annually){' '}
          </P>
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
