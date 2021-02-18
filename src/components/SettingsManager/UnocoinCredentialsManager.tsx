import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { selectSettings, selectIsDemo } from '../../selectors';
import styled from '@emotion/styled';
import { InputNonFormik } from '../../styled/Form';
import { H2, Edit, A, OptionsTitle, P } from '../../styled/GlobalElements';
import { Button } from '../../styled/Button';
import ShadowBox from '../../styled/ShadowBox';
import { postData } from '../../api';

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

const UnocoinCredentialsManager = () => {
  const settings = useSelector(selectSettings);
  const isDemo = useSelector(selectIsDemo);
  const [APIKey, setAPIKey] = useState('');
  const [editingAPIKey, setEditingAPIKey] = useState(false);

  useEffect(() => {
    if (settings) {
      console.log('Hello');
      // setAPIKey(settings.APIKey);
    }
  }, [settings]);

  const startEditingAPIKey = () => {
    setEditingAPIKey(true);
  };

  const finishEditingAPIKey = () => {
    setEditingAPIKey(false);
  };

  const generateTokenString = () => {
    let token_string = '';
    token_string = `${APIKey}`;
    return window.btoa(token_string);
  };

  const handleSubmit = () => {
    let token_string = generateTokenString();
    postData('/brokerages/authComplete/', { token: token_string });
  };

  return (
    <ShadowBox>
      <H2>Connect to Unocoin</H2>
      <P>
        To connect your Unocoin account to Passiv, you'll need to generate a new
        Unocoin API key and enter your credentials below.
      </P>

      <InputContainer>
        <MiniInputNonFormik
          value={APIKey === null ? '' : APIKey}
          onChange={(e) => setAPIKey(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              finishEditingAPIKey();
            }
          }}
          placeholder={'API Key'}
        />
        <Button onClick={handleSubmit}>Done</Button>
      </InputContainer>

      <P>
        If you're stuck, read our{' '}
        <A href="#">
          tutorial on how to connect your Unocoin account to Passiv.
        </A>
      </P>
    </ShadowBox>
  );
};

export default UnocoinCredentialsManager;
