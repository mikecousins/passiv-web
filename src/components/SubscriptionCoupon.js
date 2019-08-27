import React from 'react';
import { connect } from 'react-redux';
import { selectSettings } from '../selectors';
import { selectSubscription } from '../selectors/subscription';
import { putData } from '../api';
import { loadSettings, loadSubscription } from '../actions';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { format, parseISO } from 'date-fns';

import { H3, Edit, P } from '../styled/GlobalElements';

class SubscriptionCoupon extends React.Component {
  removeCoupon() {
    let couponCode = { coupon: null };

    putData('/api/v1/coupon/', couponCode)
      .then(response => {
        this.props.refreshSubscription();
      })
      .catch(error => {
        this.props.refreshSubscription();
      });
  }

  render() {
    const { coupon } = this.props.subscription;

    if (coupon.percent_off) {
      return (
        <React.Fragment>
          <H3>
            Active Coupon: {coupon.code}
            <Edit onClick={() => this.removeCoupon()}>
              <FontAwesomeIcon icon={faTimes} /> Remove
            </Edit>
          </H3>
          <P>
            Subscribe now and save <strong>{coupon.percent_off}% off</strong>{' '}
            your annual subscription
          </P>
          {coupon.redeem_by ? (
            <P>
              Redeem coupon by:{' '}
              <strong>
                {format(parseISO(coupon.redeem_by), 'MMMM d, yyyy')}
              </strong>
            </P>
          ) : null}
        </React.Fragment>
      );
    } else if (coupon.amount_off) {
      return (
        <React.Fragment>
          <H3>
            Active Coupon: {coupon.code}
            <Edit onClick={() => this.removeCoupon()}>
              <FontAwesomeIcon icon={faTimes} /> Remove{' '}
            </Edit>
          </H3>
          <P>
            Subscribe now and save <strong>${coupon.amount_off} off</strong>{' '}
            your annual subscription
          </P>
        </React.Fragment>
      );
    } else {
      return null;
    }
  }
}

const select = state => ({
  settings: selectSettings(state),
  subscription: selectSubscription(state),
});
const actions = {
  refreshSettings: loadSettings,
  refreshSubscription: loadSubscription,
};
export default connect(
  select,
  actions,
)(SubscriptionCoupon);
