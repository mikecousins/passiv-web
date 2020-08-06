import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  faToggleOn,
  faToggleOff,
  faClipboard,
  faClipboardCheck,
  faRedoAlt,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { selectSettings, selectIsDemo } from '../../selectors';
import { selectCanUseAPI } from '../../selectors/subscription';
import { loadSettings } from '../../actions';
import { postData, deleteData } from '../../api';
import styled from '@emotion/styled';
import { ToggleButton, StateText } from '../../styled/ToggleButton';
import { A, OptionsTitle, DisabledBox } from '../../styled/GlobalElements';
import { InputTarget } from '../../styled/Form';
import { CopyToClipboard } from 'react-copy-to-clipboard';

const WarningBox = styled.div`
  background-color: #fafcd5;
  font-size: inherit;
  padding: 15px;
  margin-top: 20px;
  border-radius: 4px;
  line-height: 1.3em;
`;

const SecretBox = styled.div`
  padding-top: 20px;
  width: 100%;
  display: flex;
`;

const InputBox = styled.div`
  flex-grow: 1;
`;

const IconBox = styled.div`
  width: 20px;
  padding-top: 5px;
  margin-right: 20px;
  margin-left: 10px;
`;

const ReadOnlyInput = styled(InputTarget)`
  padding: 18px 15px 18px 15px;
  width: 100%;
  text-align: center;
  font-size: 12px;
`;

const IconButton = styled.button`
  font-size: 1.3em;
`;

const APIAccessSettings = () => {
  const settings = useSelector(selectSettings);
  const canUseAPI = useSelector(selectCanUseAPI);
  const isDemo = useSelector(selectIsDemo);
  const [token, setToken] = useState('');
  const [copied, setCopied] = useState(false);
  const dispatch = useDispatch();

  const deleteToken = () => {
    deleteData('/api/v1/auth/token')
      .then(() => {
        setToken('');
        dispatch(loadSettings());
      })
      .catch(() => {
        setToken('');
        dispatch(loadSettings());
      });
  };

  const newToken = () => {
    postData('/api/v1/auth/token', {})
      .then(response => {
        setToken(response.data.token);
        dispatch(loadSettings());
      })
      .catch(() => {
        setToken('');
        dispatch(loadSettings());
      });
  };

  const updateAccess = () => {
    if (settings) {
      if (settings.api_enabled === true) {
        deleteToken();
      } else {
        newToken();
      }
    }
  };

  if (!settings) {
    return null;
  }

  if (canUseAPI === undefined || canUseAPI === null) {
    return null;
  }

  const disabled = !(canUseAPI || settings.api_enabled) || isDemo;

  return (
    <>
      <OptionsTitle>Allow API Access:</OptionsTitle>
      <ToggleButton onClick={updateAccess} disabled={disabled}>
        {settings.api_enabled ? (
          <React.Fragment>
            <FontAwesomeIcon icon={faToggleOn} />
            <StateText>on</StateText>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <FontAwesomeIcon icon={faToggleOff} />
            <StateText>off</StateText>
          </React.Fragment>
        )}
      </ToggleButton>
      {!settings.api_enabled && (
        <DisabledBox>
          You can use Passiv's API to write your own applications. Activate here
          to get started and access documentation.
        </DisabledBox>
      )}
      {disabled && (
        <DisabledBox>
          Connecting to Passiv's API is an Elite feature. Subscribe to generate
          an auth token for your own apps.
        </DisabledBox>
      )}
      {settings.api_enabled && (
        <SecretBox>
          {token && token !== '' ? (
            <React.Fragment>
              <InputBox>
                <ReadOnlyInput value={token} readOnly={true} />
              </InputBox>
              <IconBox>
                <CopyToClipboard
                  text={token}
                  onCopy={() => {
                    setCopied(true);
                  }}
                >
                  {copied ? (
                    <IconButton>
                      <FontAwesomeIcon icon={faClipboardCheck} />
                    </IconButton>
                  ) : (
                    <IconButton>
                      <FontAwesomeIcon icon={faClipboard} />
                    </IconButton>
                  )}
                </CopyToClipboard>
              </IconBox>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <InputBox>
                <ReadOnlyInput
                  value="api key hidden"
                  readOnly={true}
                  disabled={true}
                />
              </InputBox>
              <IconBox>
                <IconButton onClick={() => newToken()}>
                  <FontAwesomeIcon icon={faRedoAlt} />
                </IconButton>
              </IconBox>
            </React.Fragment>
          )}
        </SecretBox>
      )}
      {settings.api_enabled && (
        <div>
          <A
            href="https://app.swaggerhub.com/apis-docs/passiv/PassivAPI/v1"
            target="_blank"
            rel="noopener noreferrer"
          >
            API Documentation
          </A>
        </div>
      )}
      {settings.api_enabled && token && token !== '' && (
        <WarningBox>
          This token will appear only once. If you lose it, you will need to
          generate a new one which will invalidate the old token.
        </WarningBox>
      )}
    </>
  );
};

export default APIAccessSettings;
