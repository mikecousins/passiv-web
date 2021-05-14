import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import styled from '@emotion/styled';
import { putData } from '../api';
import { loadSubscription } from '../actions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import ShadowBox from '../styled/ShadowBox';
import { H1, P } from '../styled/GlobalElements';
import { Step } from '../styled/SignupSteps';
import { Error } from '../types/groupInfo';
import PreLoadLink from '../components/PreLoadLink';
import { HELP_PATH } from '../apps/Paths';

const BoldCode = styled.span`
  font-weight: 600;
  font-family: mono;
`;

const CouponPage = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error>();
  const [success, setSuccess] = useState(false);
  const [code, setCode] = useState<string | null>(null);
  const dispatch = useDispatch();

  useEffect(() => {
    let urlParams = new URLSearchParams(window.location.search);
    let coupon = urlParams.get('code');

    let couponCode = { coupon: coupon };
    setLoading(true);
    setCode(coupon);

    putData('/api/v1/coupon/', couponCode)
      .then(() => {
        setLoading(false);
        setSuccess(true);
        dispatch(loadSubscription());
      })
      .catch((error) => {
        setLoading(false);
        setError(error.response.data);
        dispatch(loadSubscription());
      });
  }, [dispatch]);

  let errorMessage = null;

  if (error) {
    switch (error.code) {
      case '1009':
        errorMessage = (
          <P>
            The coupon code <BoldCode>{code}</BoldCode> is invalid or expired.
          </P>
        );
        break;
      default:
        errorMessage = (
          <P>
            We encountered an unexpected error while attempting to apply the
            coupon <BoldCode>{code}</BoldCode> to your account. Please try again
            later or <PreLoadLink path={HELP_PATH}>contact support</PreLoadLink>{' '}
            if this persists.
          </P>
        );
        break;
    }
  }

  if (success) {
    return <Redirect to="/settings" />;
  } else {
    return (
      <ShadowBox background="#2a2d34">
        <H1 color="white">Apply Coupon</H1>
        {loading ? (
          <React.Fragment>
            <Step>
              Applying coupon <BoldCode>{code}</BoldCode> to your account...{' '}
              <FontAwesomeIcon icon={faSpinner} spin />
            </Step>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Step>Failed to apply the coupon :(</Step>
            <ShadowBox>{errorMessage}</ShadowBox>
          </React.Fragment>
        )}
      </ShadowBox>
    );
  }
};

export default CouponPage;
