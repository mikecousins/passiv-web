import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch } from 'react-redux';
import {
  H1,
  A,
  P,
  BulletUL,
  Li,
  InputContainer,
  MiniInputNonFormik,
  Error,
  LogoContainer,
} from '../../styled/GlobalElements';
import { Button } from '../../styled/Button';
import ShadowBox from '../../styled/ShadowBox';
import { postData } from '../../api';
import { reloadEverything } from '../../actions';
import { replace } from 'connected-react-router';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import UnocoinAPIGenerator from '../../assets/images/unocoin-api-generation.png';

const UnocoinCredentialsManager = () => {
  const [APIKey, setAPIKey] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const generateTokenString = () => {
    let token_string = '';
    token_string = `${APIKey}`;
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
        setLoading(false);
        setError(true);
      });
  };

  return (
    <ShadowBox>
      <H1>Connect to Unocoin</H1>
      <P>
        To connect your Unocoin account to Passiv, you'll need to{' '}
        <A
          href="https://unocoin.com/settings"
          target="_blank"
          rel="noopener noreferrer"
        >
          generate a new Unocoin API key
        </A>{' '}
        under the Wallet Utilities section and paste it below.
      </P>

      <InputContainer>
        <MiniInputNonFormik
          value={APIKey === null ? '' : APIKey}
          onChange={(e) => {
            setAPIKey(e.target.value);
            error && setError(false);
          }}
          placeholder={'API Key'}
        />
        {error && (
          <Error>The provided API key is not valid. Please try again.</Error>
        )}
        {!error && loading ? (
          <FontAwesomeIcon icon={faSpinner} spin />
        ) : (
          <Button onClick={handleSubmit}>Done</Button>
        )}
      </InputContainer>
      <br />
      <P>
        If you're not sure how to generate a new API key for Unocoin, you can
        follow these steps:
      </P>
      <BulletUL>
        <Li>
          Navigate to your Unocoin settings page by clicking{' '}
          <A
            href="https://unocoin.com/settings"
            target="_blank"
            rel="noopener noreferrer"
          >
            here
          </A>{' '}
          (note - this requires login).
        </Li>
        <Li>Scroll down to your "Wallet Utilites" section.</Li>
        <Li>
          Under "API Access", click the button that says "Generate Token". The
          button looks like this:
        </Li>

        <LogoContainer>
          <img
            src={UnocoinAPIGenerator}
            alt="How to Generate an Unocoin API Token"
          ></img>
        </LogoContainer>

        <Li>
          You'll now be presented with an API token. Copy that API token to your
          clipboard and paste it into the form above to proceed!
        </Li>
      </BulletUL>
      <P>
        If you're stuck, read our{' '}
        <A
          href="https://passiv.com/help/tutorials/connect-unocoin-to-passiv/"
          target="_blank"
          rel="noopener noreferrer"
        >
          tutorial on how to connect your Unocoin account to Passiv.
        </A>
      </P>
    </ShadowBox>
  );
};

export default UnocoinCredentialsManager;
