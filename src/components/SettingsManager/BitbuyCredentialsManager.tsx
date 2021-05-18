import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  H2,
  A,
  P,
  BulletUL,
  Li,
  InputContainer,
  MiniInputNonFormik,
  LogoContainer,
} from '../../styled/GlobalElements';
import { Button } from '../../styled/Button';
import ShadowBox from '../../styled/ShadowBox';
import { postData } from '../../api';
import { reloadEverything } from '../../actions';
import { replace } from 'connected-react-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import BitbuyAPIGenerator from '../../assets/images/bitbuy-api-generator.png';

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
        If you're not sure how to generate a new API key for Bitbuy, you can
        follow these steps:
      </P>
      <BulletUL>
        <Li>
          Navigate to your Bitbuy settings page by clicking{' '}
          <A
            href="https://bitbuy.ca/en/settings/"
            target="_blank"
            rel="noopener noreferrer"
          >
            here
          </A>{' '}
          (note - this requires login).
        </Li>
        <Li>Scroll down to your "Partner API" section.</Li>
        <Li>
          Under "Generate new API key", click the button that says "Generate".
          The button looks like this:
        </Li>

        <LogoContainer>
          <img
            src={BitbuyAPIGenerator}
            alt="How to Generate an Bitbuy API Token"
          ></img>
        </LogoContainer>

        <Li>
          You'll now be presented with pubilc and private keys for the Bitbuy
          API.
        </Li>
        <Li>
          Copy and paste these fields one-by-one into the form above to finish
          connecting your Passiv account to Bitbuy!
        </Li>
      </BulletUL>
      <P>
        If you're stuck, read our{' '}
        <A
          href="https://passiv.com/help/tutorials/connect-bitbuy-to-passiv/"
          target="_blank"
          rel="noopener noreferrer"
        >
          tutorial on how to connect your Bitbuy account to Passiv.
        </A>
      </P>
    </ShadowBox>
  );
};

export default BitbuyCredentialsManager;
