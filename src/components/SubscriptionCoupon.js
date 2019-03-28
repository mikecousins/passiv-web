import React from 'react';
import { connect } from 'react-redux';
import { selectSubscriptions, selectSettings } from '../selectors';
import { putData } from '../api';
import { loadSettings, loadSubscriptions } from '../actions';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

import { H3, Edit } from '../styled/GlobalElements';


class SubscriptionCoupon extends React.Component {
  removeCoupon() {
    let couponCode = {coupon: null};

    putData('/api/v1/coupon/', couponCode)
      .then(response => {
        this.props.refreshSubscriptions();
      })
      .catch(error => {
        this.props.refreshSubscriptions();
      });
  }

  render() {
    const { coupon } = this.props.subscriptions

    if ( coupon.percent_off ){
      return(
        <React.Fragment>
        <H3>
          Active Coupon: { coupon.code }
          <Edit onClick={() => this.removeCoupon()}><FontAwesomeIcon icon={faTimes}/> Remove</Edit>
        </H3>
        <p>Subscribe now and save <strong>{ coupon.percent_off }% off</strong> your annual subscription</p>
        { coupon.redeem_by? <p>Expires on: {coupon.redeem_by}</p>: null}
        </React.Fragment>
      )
    } else if ( coupon.amount_off ) {
      return(
        <React.Fragment>
        <H3>
          Active Coupon: { coupon.code }
          <Edit onClick={() => this.removeCoupon()}><FontAwesomeIcon icon={faTimes}/> Remove </Edit>
        </H3>
        <p>Subscribe now and save <strong>${ coupon.amount_off } off</strong> your annual subscription</p>
        </React.Fragment>
      )
    }else{
      return(
        null
      )
    }
  }
}

const select = state => ({
  settings: selectSettings(state),
  subscriptions: selectSubscriptions(state),
});
const actions = {
  refreshSettings: loadSettings,
  refreshSubscriptions: loadSubscriptions,
};
export default connect(select, actions)(SubscriptionCoupon)
