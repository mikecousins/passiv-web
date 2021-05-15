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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

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

const BitbuyCredentialsManager = () => {
  const [APIKey, setAPIKey] = useState('');
  const [PrivateKey, setPrivateKey] = useState('');
  const [loading, setLoading] = useState(false);

  const generateTokenString = () => {
    let token_string = '';
    token_string = `${APIKey}:${PrivateKey}`;
    return JSON.stringify(token_string);
  };

  const dispatch = useDispatch();
  const handleSubmit = () => {
    setLoading(true);
    let token = generateTokenString();
    postData('/api/v1/brokerages/authComplete/', { token: token })
      .then(() => {
        dispatch(reloadEverything());
        setTimeout(() => {
          dispatch(replace('/setup-groups'));
        }, 1000);
      })
      .catch((error) => {
        //Error handling here if required
      });
  };

  return (
    <ShadowBox>
      <H2>Connect to Bitbuy</H2>
      <P>
        To connect your Bitbuy account to Passiv, you'll need to{' '}
        <a href="https://www.Bitbuy.com/u/security/api">
          generate a new Bitbuy API key
        </a>{' '}
        and enter your credentials below.
      </P>

      <P>An example of the API permission that Passiv needs are below:</P>
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
        {loading ? (
          <FontAwesomeIcon icon={faSpinner} spin />
        ) : (
          <Button onClick={handleSubmit}>Done</Button>
        )}
      </InputContainer>

      <P>
        If you're stuck, read our{' '}
        <A href="#">
          tutorial on how to connect your Bitbuy account to Passiv.
        </A>
      </P>
    </ShadowBox>
  );
};

export default BitbuyCredentialsManager;
