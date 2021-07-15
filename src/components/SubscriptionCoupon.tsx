import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from '@emotion/styled';
import { selectSubscription } from '../selectors/subscription';
import { putData } from '../api';
import { loadSubscription } from '../actions';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { format, parseISO } from 'date-fns';

import { H3, Edit, P } from '../styled/GlobalElements';

const H3White = styled(H3)`
  color: #fff;
`;

const PWhite = styled(P)`
  color: #fff;
`;

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
        <H3White>
          Active Coupon: {coupon.code}
          <Edit onClick={() => removeCoupon()}>
            <FontAwesomeIcon icon={faTimes} /> Remove
          </Edit>
        </H3White>
        <PWhite>
          Subscribe now and save <strong>{coupon.percent_off}% off</strong>
          &nbsp; your annual subscription
        </PWhite>
        {coupon.redeem_by && (
          <PWhite>
            Redeem coupon by:&nbsp;
            <strong>
              {format(parseISO(coupon.redeem_by), 'MMMM d, yyyy')}
            </strong>
          </PWhite>
        )}
      </React.Fragment>
    );
  } else if (coupon.amount_off) {
    return (
      <React.Fragment>
        <H3White>
          Active Coupon: {coupon.code}
          <Edit onClick={() => removeCoupon()}>
            <FontAwesomeIcon icon={faTimes} /> Remove{' '}
          </Edit>
        </H3White>
        <PWhite>
          Subscribe now and save <strong>${coupon.amount_off} off</strong> your
          annual subscription
        </PWhite>
      </React.Fragment>
    );
  } else {
    return null;
  }
};

export default SubscriptionCoupon;
