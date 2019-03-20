import React from 'react';
import { connect } from 'react-redux';
import { selectSubscriptions } from '../selectors';

import { H3 } from '../styled/GlobalElements';


class SubscriptionCoupon extends React.Component {
  render() {
    const { coupon } = this.props.subscriptions

    if ( coupon.percent_off ){
      return(
        <React.Fragment>
        <H3>Active Coupon: { coupon.code }</H3>
        <p>Subscribe now and save <strong>{ coupon.percent_off }% off</strong> your annual subscription</p>
        { coupon.redeem_by? <p>Expires on: {coupon.redeem_by}</p>: null}
        </React.Fragment>
      )
    } else if ( coupon.amount_off ) {
      return(
        <React.Fragment>
        <H3>Active Coupon: { coupon.code }</H3>
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
  subscriptions: selectSubscriptions(state),
});
const actions = {}

export default connect(select, actions)(SubscriptionCoupon)
