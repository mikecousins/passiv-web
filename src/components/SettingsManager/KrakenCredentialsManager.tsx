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
  const [PrivateKey, setPrivateKey] = useState('');
  const [editingAPIKey, setEditingAPIKey] = useState(false);
  const [editingPrivateKey, setEditingPrivateKey] = useState(false);

  useEffect(() => {
    if (settings) {
      setAPIKey(settings.APIKey);
      setPrivateKey(settings.email);
    }
  }, [settings]);

  const startEditingAPIKey = () => {
    setEditingAPIKey(true);
  };

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
    setEditingAPIKey(false);
  };

  const finishEditingPrivateKey = () => {
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
            putData('/api/v1/settings/', newSettings).then(() => {
              dispatch(loadSettings());
              setEditingEmail(false);
            });
          }
        });
    } else {
      setEditingPrivateKey(false);
    }
  };

  const cancelEditingPrivateKey = () => {
    setEditingPrivateKey(false);
    dispatch(loadSettings());
  };

  const history = useHistory();

  return (
    <ShadowBox>
      <H2>Connect to Kraken</H2>
      <P>
        To connect your Kraken account to Passiv, you'll need to generate a new
        Kraken API key and enter your credentials below.
      </P>
      {editingAPIKey ? (
        <InputContainer>
          <MiniInputNonFormik
            value={APIKey === null ? '' : name}
            onChange={(e) => setAPIKey(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                finishEditingAPIKey();
              }
            }}
            placeholder={'API Key'}
          />
          <Button onClick={finishEditingAPIKey}>Done</Button>
        </InputContainer>
      ) : (
        <InputContainer>
          <OptionsTitle>API Key:</OptionsTitle>{' '}
          {APIKey === null ? '[no name set]' : APIKey}
          <Edit
            onClick={() => !isDemo && startEditingAPIKey()}
            disabled={isDemo}
          >
            <FontAwesomeIcon icon={faPen} />
            Edit
          </Edit>
        </InputContainer>
      )}
      {editingPrivateKey ? (
        <InputContainer>
          <MiniInputNonFormik
            value={PrivateKey}
            onChange={(e) => setPrivateKey(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                finishEditingPrivateKey();
              }
            }}
            placeholder={'Secret Key'}
          />
          <Button onClick={finishEditingPrivateKey}>Done</Button>
          <CancelBtn onClick={() => cancelEditingPrivateKey()}>
            Cancel
          </CancelBtn>
        </InputContainer>
      ) : (
        <InputContainer>
          <OptionsTitle>Private key:</OptionsTitle> {PrivateKey}
          <Edit
            onClick={() => !isDemo && setEditingPrivateKey(true)}
            disabled={isDemo}
          >
            <FontAwesomeIcon icon={faPen} />
            Edit
          </Edit>
        </InputContainer>
      )}
      <P>
        If you're stuck, read our{' '}
        <A href="#">
          tutorial on how to connect your Kraken account to Passiv.
        </A>
      </P>
      <Button onClick={() => history.push('/')}>Done</Button>
    </ShadowBox>
  );
};

export default KrakenCredentialsManager;
