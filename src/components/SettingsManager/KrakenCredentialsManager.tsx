import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { selectSettings, selectIsDemo } from '../../selectors';
import { loadSettings } from '../../actions';
import { postData, putData } from '../../api';
import { useHistory } from 'react-router-dom';
import styled from '@emotion/styled';
import { InputNonFormik } from '../../styled/Form';
import {
  H2,
  Edit,
  Span,
  A,
  OptionsTitle,
  P,
} from '../../styled/GlobalElements';
import { Button } from '../../styled/Button';
import ShadowBox from '../../styled/ShadowBox';
import * as Yup from 'yup';

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

const CancelBtn = styled(A)`
  margin-left: 10px;
`;

const KrakenCredentialsManager = () => {
  const settings = useSelector(selectSettings);
  const isDemo = useSelector(selectIsDemo);
  const dispatch = useDispatch();

  const [APIKey, setAPIKey] = useState('');
  const [editingAPIKey, setEditingAPIKey] = useState(false);
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [editingEmail, setEditingEmail] = useState(false);

  useEffect(() => {
    if (settings) {
      setAPIKey(settings.APIKey);
      setEmail(settings.email);
    }
  }, [settings]);

  useEffect(() => {
    setTimeout(() => setEmailError(''), 5000);
  }, [emailError]);

  const finishEditingAPIKey = () => {
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

  const cancelEditingEmail = () => {
    setEditingEmail(false);
    dispatch(loadSettings());
  };

  const history = useHistory();

  return (
    <ShadowBox>
      <H2>Connect to Kraken</H2>
      <P>To connect your Kraken account to Passiv, you'll need to </P>
      {editingAPIKey ? (
        <InputContainer>
          <MiniInputNonFormik
            value={APIKey === null ? '' : name}
            onChange={(e) => setAPIKey(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                finishEditingName();
              }
            }}
            placeholder={'API Key'}
          />
          <Button onClick={finishEditingAPIKey}>Done</Button>
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
          <Button onClick={finishEditingEmail}>Done</Button>
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
      <Button onClick={() => history.push('/')}>Done</Button>
    </ShadowBox>
  );
};

export default KrakenCredentialsManager;
