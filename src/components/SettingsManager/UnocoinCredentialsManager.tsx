import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectSettings } from '../../selectors';
import styled from '@emotion/styled';
import { InputNonFormik } from '../../styled/Form';
import { H2, A, P } from '../../styled/GlobalElements';
import { Button } from '../../styled/Button';
import ShadowBox from '../../styled/ShadowBox';
import { postData } from '../../api';
import { reloadEverything } from '../../actions';
import { replace } from 'connected-react-router';
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
  const [APIKey, setAPIKey] = useState('');

  useEffect(() => {
    if (settings) {
      // setAPIKey(settings.APIKey);
    }
  }, [settings]);

  const generateTokenString = () => {
    let token_string = '';
    token_string = `${APIKey}`;
    return JSON.stringify(token_string);
  };

  const dispatch = useDispatch();
  const handleSubmit = () => {
    let token = generateTokenString();
    postData('/api/v1/brokerages/authComplete/', { token: token })
      .then(() => {
        dispatch(reloadEverything());
        setTimeout(() => {
          dispatch(replace('/app/setup-groups'));
        }, 1000);
      })
      .catch((error) => {
        //Error handling here if required
      });
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
