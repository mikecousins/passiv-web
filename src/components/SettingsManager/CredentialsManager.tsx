import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { selectSettings, selectIsDemo } from '../../selectors';
import { loadSettings } from '../../actions';
import { postData, putData } from '../../api';

import styled from '@emotion/styled';
import { InputNonFormik } from '../../styled/Form';
import {
  H2,
  Edit,
  Span,
  A,
  OptionsTitle,
  BorderContainer,
  P,
} from '../../styled/GlobalElements';
import { SmallButton } from '../../styled/Button';
import ShadowBox from '../../styled/ShadowBox';
import TwoFAManager from './TwoFAManager';
import * as Yup from 'yup';

const InputContainer = styled.div`
  padding-top: 10px;
  padding-bottom: 5px;
  font-size: 18px;
`;

const PasswordContainer = styled.div`
  padding-top: 20px;
  padding-bottom: 5px;
  font-size: 18px;
`;

const MiniInputNonFormik = styled(InputNonFormik)`
  margin-top: 10px;
  margin-bottom: 10px;
  font-size: 1em;
  padding: 15px 12px;
`;

const CancelBtn = styled(A)`
  margin-left: 10px;
`;

const CredentialsManager = () => {
  const settings = useSelector(selectSettings);
  const isDemo = useSelector(selectIsDemo);
  const dispatch = useDispatch();

  const [name, setName] = useState('');
  const [editingName, setEditingName] = useState(false);
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [editingEmail, setEditingEmail] = useState(false);
  const [passwordResetSent, setPasswordResetSent] = useState(false);

  useEffect(() => {
    if (settings) {
      setName(settings.name);
      setEmail(settings.email);
    }
  }, [settings]);

  useEffect(() => {
    setTimeout(() => setEmailError(''), 5000);
  }, [emailError]);

  const startEditingName = () => {
    setEditingName(true);
  };

  const finishEditingName = () => {
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
  let schema = Yup.object().shape({
    email: Yup.string().email().required(),
  });
  const finishEditingEmail = () => {
    if (!settings) {
      return;
    }
    if (email !== settings.email) {
      schema
        .isValid({
          email,
        })
        .then((valid) => {
          if (valid) {
            let newSettings = { ...settings };
            newSettings.email = email;
            putData('/api/v1/settings/', newSettings)
              .then(() => {
                dispatch(loadSettings());
                setEditingEmail(false);
              })
              .catch((error) => {
                if (error.response.data.errors.email) {
                  setEmailError(error.response.data.errors.email.join(' '));
                }
              });
          } else {
            setEmailError('Must be a valid email.');
          }
        });
    } else {
      setEditingEmail(false);
    }
  };

  const cancelEditingEmail = () => {
    setEditingEmail(false);
    dispatch(loadSettings());
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

  return (
    <ShadowBox>
      <H2>Passiv Credentials</H2>
      {editingName ? (
        <InputContainer>
          <MiniInputNonFormik
            value={name === null ? '' : name}
            onChange={(e) => setName(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                finishEditingName();
              }
            }}
            placeholder={'Your name'}
          />
          <SmallButton onClick={finishEditingName}>Done</SmallButton>
        </InputContainer>
      ) : (
        <InputContainer>
          <OptionsTitle>Name:</OptionsTitle>{' '}
          {name === null ? '[no name set]' : name}
          <Edit onClick={() => !isDemo && startEditingName()} disabled={isDemo}>
            <FontAwesomeIcon icon={faPen} />
            Edit
          </Edit>
        </InputContainer>
      )}
      {editingEmail ? (
        <InputContainer>
          <MiniInputNonFormik
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                finishEditingEmail();
              }
            }}
            placeholder={'Your email'}
          />
          <P>{emailError}</P>
          <SmallButton onClick={finishEditingEmail}>Done</SmallButton>
          <CancelBtn onClick={() => cancelEditingEmail()}>Cancel</CancelBtn>
        </InputContainer>
      ) : (
        <InputContainer>
          <OptionsTitle>Email:</OptionsTitle> {email}
          <Edit
            onClick={() => !isDemo && setEditingEmail(true)}
            disabled={isDemo}
          >
            <FontAwesomeIcon icon={faPen} />
            Edit
          </Edit>
        </InputContainer>
      )}
      <PasswordContainer>
        {' '}
        {passwordResetSent ? (
          <React.Fragment>
            <Span>A password reset email has been sent to you.</Span>
            <Edit onClick={sendPasswordResetOkay}>Okay</Edit>
          </React.Fragment>
        ) : (
          <A onClick={() => !isDemo && sendPasswordReset()}>Change Password</A>
        )}
      </PasswordContainer>
      <BorderContainer>
        <TwoFAManager />
      </BorderContainer>
    </ShadowBox>
  );
};

export default CredentialsManager;
