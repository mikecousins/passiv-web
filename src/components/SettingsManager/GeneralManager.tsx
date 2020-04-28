import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import {
  selectIsDemo,
  selectPhoneNumber,
  select2FAEnabled,
  selectSMS2FAFeature,
  selectLimitOrdersFeature,
} from '../../selectors';
import { loadSettings } from '../../actions';
import { postData, deleteData } from '../../api';

import LimitOrdersSettings from './LimitOrdersSettings';
import APIAccessSettings from './APIAccessSettings';

import styled from '@emotion/styled';
import { InputNonFormik } from '../../styled/Form';
import { H2, Edit, Span, OptionsTitle, P } from '../../styled/GlobalElements';
import { Button } from '../../styled/Button';
import ShadowBox from '../../styled/ShadowBox';

const InputContainer = styled.div`
  padding-top: 10px;
  padding-bottom: 5px;
  font-size: 18px;
`;

const BorderContainer = styled.div`
  padding-top: 15px;
  margin-top: 6px;
  padding-bottom: 5px;
  font-size: 18px;
  border-top: 1px solid #e8e8e8;
`;

const MiniInputNonFormik = styled(InputNonFormik)`
  margin-top: 10px;
  margin-bottom: 10px;
  font-size: 1em;
  padding: 15px 12px;
`;

const Badge2FA = styled.div`
  text-align: center;
  font-weight: 600;
  display: inline-block;
  background-color: #04a287;
  border: none;
  color: white;
  padding: 4px 6px 4px;
  margin: none;
  border-radius: 4px;
  margin-top: -2px;
`;

const Active2FABadge = styled(Badge2FA)`
  background-color: #04a287;
`;

const Disabled2FABadge = styled(Badge2FA)`
  background-color: orange;
`;

const ErrorMessage = styled(ShadowBox)`
  background-color: orange;
`;

const GeneralManager = () => {
  const isDemo = useSelector(selectIsDemo);
  const SMS2FAFeatureEnabled = useSelector(selectSMS2FAFeature);
  const is2FAEnabled = useSelector(select2FAEnabled);
  const phoneNumber = useSelector(selectPhoneNumber);
  const limitOrdersEnabled = useSelector(selectLimitOrdersFeature);
  const dispatch = useDispatch();

  const [verificationCode, setVerificationCode] = useState('');
  const [state2FA, setState2FA] = useState();
  const [editing2FA, setEditing2FA] = useState(false);
  const [confirming2FA, setConfirming2FA] = useState(false);
  const [error2FA, setError2FA] = useState();
  const [loading2FA, setLoading2FA] = useState(false);
  const [candidatePhoneNumber, setCandidatePhoneNumber] = useState('');

  const startEditing2FA = () => {
    setEditing2FA(true);
    setCandidatePhoneNumber('');
    setVerificationCode('');
    setError2FA(null);
    setState2FA(null);
  };

  const cancelEditing2FA = () => {
    setEditing2FA(false);
    setConfirming2FA(false);
    setCandidatePhoneNumber('');
    setVerificationCode('');
    setError2FA(null);
    setLoading2FA(false);
    setState2FA(null);
  };

  const verifyPhoneNumber = () => {
    setLoading2FA(true);
    setError2FA(null);
    postData('/api/v1/auth/sms/', { phone: candidatePhoneNumber })
      .then(response => {
        setConfirming2FA(true);
        setLoading2FA(false);
        setState2FA(response.data.mfa_required.state);
      })
      .catch(error => {
        setError2FA(error.response && error.response.data.detail);
        setLoading2FA(false);
      });
  };

  const submitCode = () => {
    setLoading2FA(true);
    setError2FA(null);
    postData('/api/v1/auth/smsVerify/', {
      token: verificationCode,
      state: state2FA,
    })
      .then(() => {
        dispatch(loadSettings());
        cancelEditing2FA();
      })
      .catch(error => {
        setError2FA(error.response.data.detail);
        setLoading2FA(false);
      });
  };

  const disable2FA = () => {
    setLoading2FA(true);
    deleteData('/api/v1/auth/sms/')
      .then(() => {
        setLoading2FA(false);
        dispatch(loadSettings());
      })
      .catch(error => {
        setError2FA(error.response.data.detail);
        setLoading2FA(false);
      });
  };


  let error2FAMessage = null;
  if (error2FA != null) {
    error2FAMessage = <ErrorMessage>{error2FA}</ErrorMessage>;
  }
  let sms_2fa = null;
  if (is2FAEnabled) {
    sms_2fa = (
      <React.Fragment>
        <Active2FABadge>Active</Active2FABadge>
        <Edit onClick={() => !isDemo && disable2FA()} disabled={isDemo}>
          {loading2FA ? <FontAwesomeIcon icon={faSpinner} spin /> : 'Disable'}
        </Edit>
        {error2FAMessage}
        <div>
          <Span>
            Your verified phone number: <strong>{phoneNumber}</strong>
          </Span>
        </div>
      </React.Fragment>
    );
  } else {
    if (editing2FA === false) {
      sms_2fa = (
        <React.Fragment>
          <Disabled2FABadge>Not Enabled</Disabled2FABadge>
          <Edit
            onClick={() => !isDemo && startEditing2FA()}
            disabled={isDemo || loading2FA}
          >
            Enable
          </Edit>
        </React.Fragment>
      );
    } else {
      if (!confirming2FA) {
        sms_2fa = (
          <React.Fragment>
            <P>
              Activating this option will require you to enter a 6-digit code
              each time you login. If you lose access to your phone number, you
              will be unable to login in the future.
            </P>
            <P>Just verify your phone number:</P>
            <MiniInputNonFormik
              value={candidatePhoneNumber}
              placeholder={'Your phone number'}
              onChange={e => setCandidatePhoneNumber(e.target.value)}
            />
            {error2FA}
            <Edit
              onClick={() => !isDemo && cancelEditing2FA()}
              disabled={isDemo}
            >
              Cancel
            </Edit>
            <Button onClick={verifyPhoneNumber}>
              {loading2FA ? (
                <FontAwesomeIcon icon={faSpinner} spin />
              ) : (
                'Submit'
              )}
            </Button>
          </React.Fragment>
        );
      } else {
        sms_2fa = (
          <React.Fragment>
            <MiniInputNonFormik
              value={verificationCode}
              placeholder={'Your verification code'}
              onChange={e => setVerificationCode(e.target.value)}
            />
            {error2FA}
            <Edit
              onClick={() => !isDemo && cancelEditing2FA()}
              disabled={isDemo}
            >
              Cancel
            </Edit>
            <Button onClick={submitCode}>
              {loading2FA ? (
                <FontAwesomeIcon icon={faSpinner} spin />
              ) : (
                'Verify'
              )}
            </Button>
          </React.Fragment>
        );
      }
    }
  }

  return (
    <ShadowBox>
      <H2>General</H2>
      {SMS2FAFeatureEnabled && (
        <InputContainer>
          <OptionsTitle>SMS 2FA:</OptionsTitle> {sms_2fa}
        </InputContainer>
      )}
        <BorderContainer>
          <APIAccessSettings />
        </BorderContainer>
      {limitOrdersEnabled && (
        <BorderContainer>
          <LimitOrdersSettings />
        </BorderContainer>
      )}
    </ShadowBox>
  );
};

export default GeneralManager;
