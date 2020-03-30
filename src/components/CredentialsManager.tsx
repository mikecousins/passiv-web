import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faSpinner } from '@fortawesome/free-solid-svg-icons';
import {
  selectSettings,
  selectIsDemo,
  selectPhoneNumber,
  select2FAEnabled,
} from '../selectors';
import { loadSettings } from '../actions';
import { postData, putData, deleteData } from '../api';

import LimitOrdersSettings from './LimitOrdersSettings';
import APIAccessSettings from './APIAccessSettings';

import styled from '@emotion/styled';
import { InputNonFormik } from '../styled/Form';
import { H2, Edit, Span, A, OptionsTitle, P } from '../styled/GlobalElements';
import { Button } from '../styled/Button';
import ShadowBox from '../styled/ShadowBox';
import {
  selectSMS2FAFeature,
  selectLimitOrdersFeature,
} from '../selectors/features';

const InputContainer = styled.div`
  padding-top: 10px;
  padding-bottom: 5px;
  font-size: 18px;
`;

const MiniInputNonFormik = styled(InputNonFormik)`
  margin-top: 10px;
  margin-bottom: 10px;
  font-size: 1em;
  padding: 15px 12px;
`;

const TextContainer = styled.div`
  text-overflow: ellipsis;
  overflow: hidden;
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

const CredentialsManager = () => {
  const settings = useSelector(selectSettings);
  const isDemo = useSelector(selectIsDemo);
  const SMS2FAFeatureEnabled = useSelector(selectSMS2FAFeature);
  const is2FAEnabled = useSelector(select2FAEnabled);
  const phoneNumber = useSelector(selectPhoneNumber);
  const limitOrdersEnabled = useSelector(selectLimitOrdersFeature);
  const dispatch = useDispatch();

  const [name, setName] = useState('');
  const [editingName, setEditingName] = useState(false);
  const [email, setEmail] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [state2FA, setState2FA] = useState<any>();
  const [editing2FA, setEditing2FA] = useState(false);
  const [confirming2FA, setConfirming2FA] = useState(false);
  const [error2FA, setError2FA] = useState<any>();
  const [loading2FA, setLoading2FA] = useState(false);
  const [candidatePhoneNumber, setCandidatePhoneNumber] = useState('');
  const [passwordResetSent, setPasswordResetSent] = useState(false);

  useEffect(() => {
    if (settings) {
      setName(settings.name);
      setEmail(settings.email);
    }
  }, [settings]);

  const startEditingName = () => {
    setEditingName(true);
  };

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
      .then((response) => {
        setConfirming2FA(true);
        setLoading2FA(false);
        setState2FA(response.data.mfa_required.state);
      })
      .catch((error) => {
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
      .catch((error) => {
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
      .catch((error) => {
        setError2FA(error.response.data.detail);
        setLoading2FA(false);
      });
  };

  const finishEditing = () => {
    if (!settings) {
      return;
    }
    if (name !== settings.name) {
      let newSettings = { ...settings };
      if (name === '') {
        newSettings.name = '';
      } else {
        newSettings.name = name;
      }

      putData('/api/v1/settings/', newSettings)
        .then(() => {
          dispatch(loadSettings());
        })
        .catch(() => {
          dispatch(loadSettings());
        });
    }
    setEditingName(false);
  };

  const sendPasswordReset = () => {
    postData('/api/v1/auth/resetPassword/', { email })
      .then(() => {
        setPasswordResetSent(true);
      })
      .catch(() => {
        setPasswordResetSent(false);
      });
  };

  const sendPasswordResetOkay = () => {
    setPasswordResetSent(false);
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
              onChange={(e) => setCandidatePhoneNumber(e.target.value)}
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
              onChange={(e) => setVerificationCode(e.target.value)}
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
    <div>
      <ShadowBox>
        <H2>Passiv Credentials</H2>
        <TextContainer>
          {editingName ? (
            <InputContainer>
              <MiniInputNonFormik
                value={name === null ? '' : name}
                onChange={(e) => setName(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    finishEditing();
                  }
                }}
                placeholder={'Your name'}
              />
              <Button onClick={finishEditing}>Done</Button>
            </InputContainer>
          ) : (
            <InputContainer>
              <OptionsTitle>Name:</OptionsTitle>{' '}
              {name === null ? '[no name set]' : name}
              <Edit
                onClick={() => !isDemo && startEditingName()}
                disabled={isDemo}
              >
                <FontAwesomeIcon icon={faPen} />
                Edit
              </Edit>
            </InputContainer>
          )}
        </TextContainer>
        <TextContainer>
          <InputContainer>
            <OptionsTitle>Email:</OptionsTitle> {email}
          </InputContainer>
        </TextContainer>
        <TextContainer>
          <InputContainer>
            {' '}
            {passwordResetSent ? (
              <React.Fragment>
                <Span>A password reset email has been sent to you.</Span>
                <Edit onClick={sendPasswordResetOkay}>Okay</Edit>
              </React.Fragment>
            ) : (
              <A onClick={() => !isDemo && sendPasswordReset()}>
                Change Password
              </A>
            )}
          </InputContainer>
        </TextContainer>
        {SMS2FAFeatureEnabled && (
          <TextContainer>
            <InputContainer>
              <OptionsTitle>SMS 2FA:</OptionsTitle> {sms_2fa}
            </InputContainer>
          </TextContainer>
        )}
        <TextContainer>
          <InputContainer>
            <APIAccessSettings />
          </InputContainer>
        </TextContainer>
        {limitOrdersEnabled && (
          <TextContainer>
            <InputContainer>
              <LimitOrdersSettings />
            </InputContainer>
          </TextContainer>
        )}
      </ShadowBox>
    </div>
  );
};

export default CredentialsManager;
