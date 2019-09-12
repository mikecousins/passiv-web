import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectSubscription } from '../selectors/subscription';
import { putData } from '../api';
import { loadSubscription } from '../actions';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { format, parseISO } from 'date-fns';

import { H3, Edit, P } from '../styled/GlobalElements';

const SubscriptionCoupon = () => {
  const subscription = useSelector(selectSubscription);
  const dispatch = useDispatch();

  const removeCoupon = () => {
    putData('/api/v1/coupon/', { coupon: null })
      .then(() => {
        dispatch(loadSubscription());
      })
      .catch(() => {
        dispatch(loadSubscription());
      });
  };

  if (!subscription) {
    return null;
  }

  const { coupon } = subscription;

  if (coupon.percent_off) {
    return (
      <React.Fragment>
        <H3>
          Active Coupon: {coupon.code}
          <Edit onClick={() => removeCoupon()}>
            <FontAwesomeIcon icon={faTimes} /> Remove
          </Edit>
        </H3>
        <P>
          Subscribe now and save <strong>{coupon.percent_off}% off</strong>
          &nbsp; your annual subscription
        </P>
        {coupon.redeem_by && (
          <P>
            Redeem coupon by:&nbsp;
            <strong>
              {format(parseISO(coupon.redeem_by), 'MMMM d, yyyy')}
            </strong>
          </P>
        )}
      </React.Fragment>
    );
  } else if (coupon.amount_off) {
    return (
      <React.Fragment>
        <H3>
          Active Coupon: {coupon.code}
          <Edit onClick={() => removeCoupon()}>
            <FontAwesomeIcon icon={faTimes} /> Remove{' '}
          </Edit>
        </H3>
        <P>
          Subscribe now and save <strong>${coupon.amount_off} off</strong> your
          annual subscription
        </P>
      </React.Fragment>
    );
  } else {
    return null;
  }
};

export default SubscriptionCoupon;
