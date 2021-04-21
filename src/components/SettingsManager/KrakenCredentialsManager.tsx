import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from '@emotion/styled';
import { InputNonFormik } from '../../styled/Form';
import { H2, A, P } from '../../styled/GlobalElements';
import { Button } from '../../styled/Button';
import ShadowBox from '../../styled/ShadowBox';
import { postData } from '../../api';
import { reloadEverything } from '../../actions';
import { replace } from 'connected-react-router';
import KrakenAPIPermissions from '../../assets/images/kraken-api-permissions.png';

const LogoContainer = styled.div`
  padding: 6% 8%;
  img {
    max-width: 100%;
  }
`;

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
  const [APIKey, setAPIKey] = useState('');
  const [PrivateKey, setPrivateKey] = useState('');

  const generateTokenString = () => {
    let token_string = '';
    token_string = `${APIKey}:${PrivateKey}`;
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
      <H2>Connect to Kraken</H2>
      <P>
        To connect your Kraken account to Passiv, you'll need to{' '}
        <a href="https://www.kraken.com/u/security/api">
          generate a new Kraken API key
        </a>{' '}
        and enter your credentials below.
      </P>

      <P>An example of the API permission that Passiv needs are below:</P>
      <LogoContainer>
        <img src={KrakenAPIPermissions} alt="Kraken API Permissions"></img>
      </LogoContainer>
      <InputContainer>
        <MiniInputNonFormik
          value={APIKey === null ? '' : APIKey}
          onChange={(e) => setAPIKey(e.target.value)}
          placeholder={'API Key'}
        />
        <MiniInputNonFormik
          value={PrivateKey === null ? '' : PrivateKey}
          onChange={(e) => setPrivateKey(e.target.value)}
          placeholder={'Private Key'}
        />
        <Button onClick={handleSubmit}>Done</Button>
      </InputContainer>

      <P>
        If you're stuck, read our{' '}
        <A href="#">
          tutorial on how to connect your Kraken account to Passiv.
        </A>
      </P>
    </ShadowBox>
  );
};

export default UnocoinCredentialsManager;
